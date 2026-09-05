import PDFDocument from 'pdfkit';

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const createReportPdf = (report, user) => new Promise((resolve, reject) => {
  const document = new PDFDocument({ margin: 50 });
  const chunks = [];

  document.on('data', (chunk) => chunks.push(chunk));
  document.on('end', () => resolve(Buffer.concat(chunks)));
  document.on('error', reject);

  document.fontSize(20).text('Look Away Report');
  document.moveDown();
  document.fontSize(11).text(`Member: ${user?.name || 'Look Away member'}`);
  document.text(`Period: ${report.startDate} to ${report.endDate}`);
  document.text(`Created: ${report.createdAt}`);
  document.moveDown();
  document.fontSize(14).text('Comments');
  document.fontSize(11).text(report.generalComments || 'No general comments recorded.');
  document.moveDown();
  document.fontSize(14).text('Triggers');
  if (report.triggers?.length) {
    report.triggers.forEach((entry) => {
      document.fontSize(11).text(`- ${entry.trigger}${entry.comment ? `: ${entry.comment}` : ''}`);
    });
  } else {
    document.fontSize(11).text('No triggers logged.');
  }
  document.end();
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.REPORT_FROM_EMAIL;
  if (!apiKey || !from) {
    return json(503, { error: 'Email delivery is not configured.' });
  }

  try {
    const { recipients = [], report, user } = JSON.parse(event.body || '{}');
    const uniqueRecipients = [...new Set(recipients.filter((recipient) => typeof recipient === 'string' && recipient.trim()))];
    if (!uniqueRecipients.length || !report) return json(400, { error: 'Recipients and report are required.' });

    const triggerRows = (report.triggers || []).map((entry) => `
      <li><strong>${escapeHtml(entry.trigger)}</strong>${entry.comment ? `: ${escapeHtml(entry.comment)}` : ''}</li>
    `).join('');
    const userName = escapeHtml(user?.name || 'Look Away member');
    const subject = `Look Away report: ${report.startDate} to ${report.endDate}`;
    const html = `
      <h2>Look Away Report</h2>
      <p><strong>Member:</strong> ${userName}</p>
      <p><strong>Period:</strong> ${escapeHtml(report.startDate)} to ${escapeHtml(report.endDate)}</p>
      <p><strong>Created:</strong> ${escapeHtml(report.createdAt)}</p>
      <h3>Comments</h3>
      <p>${escapeHtml(report.generalComments || 'No general comments recorded.').replace(/\n/g, '<br>')}</p>
      <h3>Triggers</h3>
      <ul>${triggerRows || '<li>No triggers logged.</li>'}</ul>
    `;
    const pdf = await createReportPdf(report, user);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: uniqueRecipients,
        subject,
        html,
        attachments: [{
          filename: `look-away-report-${report.startDate}-to-${report.endDate}.pdf`,
          content: pdf.toString('base64'),
        }],
      }),
    });

    if (!response.ok) {
      const providerBody = await response.json().catch(() => null);
      const providerMessage = typeof providerBody?.message === 'string'
        ? providerBody.message
        : 'Email provider rejected the report.';
      console.error('Resend rejected report email', {
        status: response.status,
        message: providerMessage,
      });
      return json(502, { error: providerMessage });
    }

    return json(200, { sent: true, recipients: uniqueRecipients });
  } catch (error) {
    console.error('send-report failed', error);
    return json(400, { error: 'Invalid report request.' });
  }
};

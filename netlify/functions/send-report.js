const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const from = process.env.REPORT_FROM_EMAIL;
  const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
  const emailsSecret = process.env.NETLIFY_EMAILS_SECRET;
  if (!siteUrl || !emailsSecret || !from) {
    return json(503, { error: 'Email delivery is not configured.' });
  }

  let request;
  try {
    request = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid report request.' });
  }

  const { recipients = [], report, user } = request;
  if (!Array.isArray(recipients)) return json(400, { error: 'Recipients and report are required.' });
  const uniqueRecipients = [...new Set(recipients.filter((recipient) => typeof recipient === 'string' && recipient.trim()))];
  if (!uniqueRecipients.length || !report) return json(400, { error: 'Recipients and report are required.' });

  try {
    const triggerSummary = (report.triggers || []).length
      ? report.triggers.map((entry) => `- ${entry.trigger}${entry.comment ? `: ${entry.comment}` : ''}`).join('\n')
      : 'No triggers logged.';
    const response = await fetch(`${siteUrl}/.netlify/functions/emails/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'netlify-emails-secret': emailsSecret,
      },
      body: JSON.stringify({
        from,
        to: uniqueRecipients,
        subject: `Look Away report: ${report.startDate} to ${report.endDate}`,
        parameters: {
          memberName: user?.name || 'Look Away member',
          startDate: report.startDate,
          endDate: report.endDate,
          createdAt: report.createdAt,
          generalComments: report.generalComments || 'No general comments recorded.',
          triggerSummary,
        },
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Netlify Email Templates rejected report email', {
        status: response.status,
        result,
      });
      return json(response.status, { error: result.error || 'The report email could not be sent.' });
    }

    return json(200, { sent: true, recipients: uniqueRecipients });
  } catch (error) {
    console.error('Netlify Email Templates delivery failed', error);
    return json(502, { error: 'The report email could not be sent.' });
  }
};

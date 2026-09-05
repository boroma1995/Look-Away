import { useState } from 'react';
import { Download, Eye, LockKeyhole, LogOut, ShieldCheck, Users } from 'lucide-react';
import { AdminUserRecord, EngagementRecord, ReportRecord } from '../../types';

interface AdminScreenProps {
  users: AdminUserRecord[];
  engagements: EngagementRecord[];
  reports: ReportRecord[];
  onLogout: () => void;
}

const MENTOR_ID = 'mentor';
const MENTOR_PASSWORD = 'mentor123';

export function AdminScreen({ users, engagements, reports, onLogout }: AdminScreenProps) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);

  const exportRecords = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      users,
      engagements,
      reports,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lookaway-admin-export-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportSelectedUserPdf = () => {
    if (!selectedUser) return;
    window.print();
  };

  if (!isLoggedIn) {
    return (
      <section className="max-w-[460px] mx-auto gold-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#c9982c]/15 border border-[#8b681f]"><ShieldCheck className="w-6 h-6 text-[#f1ca63]" /></div>
          <div><p className="text-[10px] tracking-[0.2em] text-[#c9982c] font-bold">MENTOR AREA</p><h1 className="text-xl text-[#f1ca63]">Mentor sign in</h1></div>
        </div>
        <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); if (adminId.trim().toLowerCase() === MENTOR_ID && password === MENTOR_PASSWORD) { setIsLoggedIn(true); setError(''); } else setError('Invalid mentor ID or password.'); }}>
          <label className="block text-xs font-bold tracking-wider text-[#f0d68a]">MENTOR ID<input className="gold-input w-full mt-1.5" value={adminId} onChange={(event) => setAdminId(event.target.value)} autoComplete="username" /></label>
          <label className="block text-xs font-bold tracking-wider text-[#f0d68a]">PASSWORD<input type="password" className="gold-input w-full mt-1.5" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>
          {error && <p className="text-xs text-red-300">{error}</p>}
          <button className="btn-gold w-full rounded-lg py-3 text-xs" type="submit"><LockKeyhole className="inline w-4 h-4 mr-2" />ACCESS MENTOR DASHBOARD</button>
        </form>
        <p className="mt-5 text-[11px] leading-relaxed text-[#9d9b92]">Demo credentials: <strong className="text-[#f1ca63]">mentor</strong> / <strong className="text-[#f1ca63]">mentor123</strong>. This browser-only demo is not a production security boundary.</p>
      </section>
    );
  }

  const allEngagements = users.flatMap((user) => user.engagements);
  const reportEntries = users.flatMap((user) =>
    user.reports.map((report) => ({ report, user }))
  );
  const knownReportIds = new Set(reportEntries.map(({ report }) => report.id));
  const legacyReportEntries = reports
    .filter((report) => !knownReportIds.has(report.id))
    .map((report) => ({ report, user: null }));
  const allReports = [...reportEntries, ...legacyReportEntries];
  const visibleEngagements = allEngagements.length ? allEngagements : engagements;
  const visibleReports = allReports;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mentor-header-actions">
        <div><p className="text-[10px] tracking-[0.2em] text-[#c9982c] font-bold">MENTOR DASHBOARD</p><h1 className="text-2xl text-[#f1ca63]">Member records</h1><p className="text-xs text-[#b9b7ad] mt-1">Users, engagement logs, and generated reports stored on this device.</p></div>
        <div className="flex gap-2"><button className="btn-gold rounded-lg px-3 py-2 text-[11px]" onClick={exportRecords}><Download className="inline w-4 h-4 mr-1" />EXPORT JSON</button><button className="btn-dark rounded-lg px-3 py-2 text-[11px]" onClick={() => { setIsLoggedIn(false); onLogout(); }}><LogOut className="inline w-4 h-4 mr-1" />SIGN OUT</button></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mentor-summary-stats"><div className="stat-card"><Users className="w-4 h-4 text-[#f1ca63]" /><p className="text-2xl font-bold mt-2">{users.length}</p><p className="text-[10px] text-[#b9b7ad]">USERS</p></div><div className="stat-card"><Eye className="w-4 h-4 text-[#f1ca63]" /><p className="text-2xl font-bold mt-2">{visibleEngagements.length}</p><p className="text-[10px] text-[#b9b7ad]">ENGAGEMENT LOGS</p></div><div className="stat-card"><ShieldCheck className="w-4 h-4 text-[#f1ca63]" /><p className="text-2xl font-bold mt-2">{visibleReports.length}</p><p className="text-[10px] text-[#b9b7ad]">REPORTS</p></div></div>
      <div className="gold-card overflow-hidden mentor-user-list"><div className="px-4 py-3 border-b border-[#765b24] text-xs font-bold tracking-widest text-[#f1ca63]">USER DIRECTORY</div>{users.map((user) => <div key={user.email} className="px-4 py-3 border-b border-[#765b24]/40 hover:bg-[#091322]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <button type="button" className="w-full text-left" onClick={() => setSelectedUser(user)}>
            <span className="font-bold text-sm">{user.name}</span>
            <span className="block text-xs text-[#b9b7ad]">{user.email} • {user.engagements.length} logs • {user.reports.length} reports</span>
          </button>
          <button type="button" className="btn-dark px-2.5 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase cursor-pointer no-print" onClick={() => setSelectedUser(user)}>
            VIEW REPORTS
          </button>
        </div>
      </div>)}{!users.length && <p className="p-4 text-sm text-[#b9b7ad]">No registered users recorded yet.</p>}</div>
      {selectedUser && <div className="gold-card p-4 mentor-selected-user"><div className="flex justify-between gap-3 mentor-close-row"><div><h2 className="text-lg text-[#f1ca63]">{selectedUser.name}</h2><p className="text-xs text-[#b9b7ad]">{selectedUser.email} • joined {selectedUser.joinedDate}</p></div><div className="flex items-center gap-2 no-print"><button className="btn-gold rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase" onClick={exportSelectedUserPdf}>EXPORT PDF</button><button className="text-xs text-[#f1ca63]" onClick={() => setSelectedUser(null)}>CLOSE</button></div></div>
        <div className="mt-4 space-y-3">
          <div>
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#f1ca63] font-bold mb-2">Recent engagement logs</h3>
            <div className="space-y-2">{selectedUser.engagements.map((item) => <div className="p-3 border border-[#765b24]/60 rounded-lg text-xs" key={item.id}><strong>{item.dateStr} • {item.scoreLabel}</strong><p className="text-[#b9b7ad] mt-1">{item.comments}</p></div>)}{!selectedUser.engagements.length && <p className="text-xs text-[#b9b7ad]">No engagement logs for this user.</p>}</div>
          </div>
          <div className="pt-3 border-t border-[#765b24]/40">
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#f1ca63] font-bold mb-2">Reports</h3>
            {selectedUser.reports.length ? selectedUser.reports.map((report) => (
              <article className="rounded-lg border border-[#765b24]/60 p-3 text-xs text-[#eee] space-y-2 mb-2 last:mb-0" key={report.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#f1ca63]">Report {report.id}</p>
                    <p className="text-[#b9b7ad]">{report.startDate} to {report.endDate}</p>
                  </div>
                  <p className="text-[#b9b7ad]">Created {report.createdAt.slice(0, 10)}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p><span className="text-[#c9982c]">Primary email:</span> {report.emailToSend || 'Not specified'}</p>
                  <p><span className="text-[#c9982c]">Secondary email:</span> {report.secondaryEmailToSend || 'Not specified'}</p>
                  <p><span className="text-[#c9982c]">Phone:</span> {report.phoneToSend || 'Not specified'}</p>
                </div>
                {report.generalComments && <p className="whitespace-pre-wrap"><span className="text-[#c9982c]">Notes:</span> {report.generalComments}</p>}
                <div>
                  <p className="text-[#c9982c] font-bold">Triggers ({report.triggers.length})</p>
                  {report.triggers.length ? report.triggers.map((entry, index) => <div className="mt-1" key={`${report.id}-trigger-${index}`}><span className="font-bold">{entry.trigger}</span>{entry.comment && <span className="text-[#b9b7ad]">: {entry.comment}</span>}</div>) : <p className="text-[#b9b7ad]">No triggers logged.</p>}
                </div>
              </article>
            )) : <p className="text-xs text-[#b9b7ad]">No reports for this user yet.</p>}
          </div>
        </div>
      </div>}
      <div className="gold-card overflow-hidden mentor-all-reports">
        <div className="px-4 py-3 border-b border-[#765b24] text-xs font-bold tracking-widest text-[#f1ca63]">ALL MEMBER REPORTS</div>
        {visibleReports.map(({ report, user }) => (
          <article className="px-4 py-4 border-b border-[#765b24]/40 text-xs space-y-2" key={report.id}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-[#f1ca63]">{user?.name || 'Unassigned member'}</h2>
                <p className="text-[#b9b7ad]">{user?.email || 'Member details unavailable'}</p>
              </div>
              <div className="text-right text-[#b9b7ad]">
                <p>Created {report.createdAt.slice(0, 10)}</p>
                <p>{report.startDate} to {report.endDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#eee]">
              <p><span className="text-[#c9982c]">Report ID:</span> {report.id}</p>
              <p><span className="text-[#c9982c]">Joined:</span> {user?.joinedDate || 'Unavailable'}</p>
              <p><span className="text-[#c9982c]">Primary email:</span> {report.emailToSend || 'Not specified'}</p>
              <p><span className="text-[#c9982c]">Secondary email:</span> {report.secondaryEmailToSend || 'Not specified'}</p>
              <p><span className="text-[#c9982c]">Phone delivery:</span> {report.phoneToSend || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-[#c9982c] font-bold">General comments</p>
              <p className="text-[#eee] whitespace-pre-wrap">{report.generalComments || 'No general comments recorded.'}</p>
            </div>
            <div>
              <p className="text-[#c9982c] font-bold">Triggers ({report.triggers.length})</p>
              {report.triggers.length ? report.triggers.map((entry, index) => (
                <div className="mt-1 text-[#eee]" key={`${report.id}-trigger-${index}`}>
                  <span className="font-bold">{entry.trigger}</span>{entry.comment && <span className="text-[#b9b7ad]">: {entry.comment}</span>}
                </div>
              )) : <p className="text-[#b9b7ad]">No triggers logged.</p>}
            </div>
          </article>
        ))}
        {!visibleReports.length && <p className="p-4 text-sm text-[#b9b7ad]">No reports recorded yet.</p>}
      </div>
    </section>
  );
}

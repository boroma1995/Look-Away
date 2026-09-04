import { useState } from 'react';
import { Download, Eye, LockKeyhole, LogOut, ShieldCheck, Users } from 'lucide-react';
import { AdminUserRecord, EngagementRecord, ReportRecord } from '../../types';

interface AdminScreenProps {
  users: AdminUserRecord[];
  engagements: EngagementRecord[];
  reports: ReportRecord[];
  onLogout: () => void;
}

const ADMIN_ID = 'admin';
const ADMIN_PASSWORD = 'admin123';

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

  if (!isLoggedIn) {
    return (
      <section className="max-w-[460px] mx-auto gold-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#c9982c]/15 border border-[#8b681f]"><ShieldCheck className="w-6 h-6 text-[#f1ca63]" /></div>
          <div><p className="text-[10px] tracking-[0.2em] text-[#c9982c] font-bold">RESTRICTED AREA</p><h1 className="text-xl text-[#f1ca63]">Admin sign in</h1></div>
        </div>
        <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); if (adminId.trim() === ADMIN_ID && password === ADMIN_PASSWORD) { setIsLoggedIn(true); setError(''); } else setError('Invalid admin ID or password.'); }}>
          <label className="block text-xs font-bold tracking-wider text-[#f0d68a]">ADMIN ID<input className="gold-input w-full mt-1.5" value={adminId} onChange={(event) => setAdminId(event.target.value)} autoComplete="username" /></label>
          <label className="block text-xs font-bold tracking-wider text-[#f0d68a]">PASSWORD<input type="password" className="gold-input w-full mt-1.5" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>
          {error && <p className="text-xs text-red-300">{error}</p>}
          <button className="btn-gold w-full rounded-lg py-3 text-xs" type="submit"><LockKeyhole className="inline w-4 h-4 mr-2" />ACCESS ADMIN</button>
        </form>
        <p className="mt-5 text-[11px] leading-relaxed text-[#9d9b92]">Demo credentials: <strong className="text-[#f1ca63]">admin</strong> / <strong className="text-[#f1ca63]">admin123</strong>. This browser-only demo is not a production security boundary.</p>
      </section>
    );
  }

  const allEngagements = users.flatMap((user) => user.engagements);
  const allReports = users.flatMap((user) => user.reports);
  const visibleEngagements = allEngagements.length ? allEngagements : engagements;
  const visibleReports = allReports.length ? allReports : reports;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-[10px] tracking-[0.2em] text-[#c9982c] font-bold">CONTROL CENTER</p><h1 className="text-2xl text-[#f1ca63]">Admin records</h1><p className="text-xs text-[#b9b7ad] mt-1">Users, engagement logs, and generated reports stored on this device.</p></div>
        <div className="flex gap-2"><button className="btn-gold rounded-lg px-3 py-2 text-[11px]" onClick={exportRecords}><Download className="inline w-4 h-4 mr-1" />EXPORT JSON</button><button className="btn-dark rounded-lg px-3 py-2 text-[11px]" onClick={() => { setIsLoggedIn(false); onLogout(); }}><LogOut className="inline w-4 h-4 mr-1" />SIGN OUT</button></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3"><div className="stat-card"><Users className="w-4 h-4 text-[#f1ca63]" /><p className="text-2xl font-bold mt-2">{users.length}</p><p className="text-[10px] text-[#b9b7ad]">USERS</p></div><div className="stat-card"><Eye className="w-4 h-4 text-[#f1ca63]" /><p className="text-2xl font-bold mt-2">{visibleEngagements.length}</p><p className="text-[10px] text-[#b9b7ad]">ENGAGEMENT LOGS</p></div><div className="stat-card"><ShieldCheck className="w-4 h-4 text-[#f1ca63]" /><p className="text-2xl font-bold mt-2">{visibleReports.length}</p><p className="text-[10px] text-[#b9b7ad]">REPORTS</p></div></div>
      <div className="gold-card overflow-hidden"><div className="px-4 py-3 border-b border-[#765b24] text-xs font-bold tracking-widest text-[#f1ca63]">USER DIRECTORY</div>{users.map((user) => <button key={user.email} className="w-full text-left px-4 py-3 border-b border-[#765b24]/40 hover:bg-[#091322]" onClick={() => setSelectedUser(user)}><span className="font-bold text-sm">{user.name}</span><span className="block text-xs text-[#b9b7ad]">{user.email} • {user.engagements.length} logs • {user.reports.length} reports</span></button>)}{!users.length && <p className="p-4 text-sm text-[#b9b7ad]">No registered users recorded yet.</p>}</div>
      {selectedUser && <div className="gold-card p-4"><div className="flex justify-between gap-3"><div><h2 className="text-lg text-[#f1ca63]">{selectedUser.name}</h2><p className="text-xs text-[#b9b7ad]">{selectedUser.email} • joined {selectedUser.joinedDate}</p></div><button className="text-xs text-[#f1ca63]" onClick={() => setSelectedUser(null)}>CLOSE</button></div><div className="mt-4 space-y-2">{selectedUser.engagements.map((item) => <div className="p-3 border border-[#765b24]/60 rounded-lg text-xs" key={item.id}><strong>{item.dateStr} • {item.scoreLabel}</strong><p className="text-[#b9b7ad] mt-1">{item.comments}</p></div>)}{!selectedUser.engagements.length && <p className="text-xs text-[#b9b7ad]">No engagement logs for this user.</p>}</div></div>}
      <div className="gold-card overflow-hidden"><div className="px-4 py-3 border-b border-[#765b24] text-xs font-bold tracking-widest text-[#f1ca63]">ALL REPORTS</div>{visibleReports.map((report) => <div className="px-4 py-3 border-b border-[#765b24]/40 text-xs" key={report.id}><strong>{report.createdAt.slice(0, 10)} • {report.startDate} to {report.endDate}</strong><p className="text-[#b9b7ad] mt-1">{report.generalComments || 'No general comments recorded.'}</p><p className="text-[#c9982c] mt-1">{report.triggers.length} trigger entries • email: {report.emailToSend || 'not specified'} • phone: {report.phoneToSend || 'not specified'}</p></div>)}{!visibleReports.length && <p className="p-4 text-sm text-[#b9b7ad]">No reports recorded yet.</p>}</div>
    </section>
  );
}

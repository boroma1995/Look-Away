import React, { useState } from 'react';
import { UserProfile, EngagementRecord } from '../../types';
import { LionCrest } from '../LionCrest';
import { GoldDivider } from '../GoldDivider';
import {
  User,
  Shield,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  CheckCircle2,
  LogOut,
  UserCheck,
} from 'lucide-react';

interface SettingsScreenProps {
  user: UserProfile;
  engagements: EngagementRecord[];
  onSaveProfile: (profile: UserProfile) => void;
  onResetSampleData: () => void;
  onClearAllData: () => void;
  onImportData: (engagements: EngagementRecord[]) => void;
  onLogout?: () => void;
}

export function SettingsScreen({
  user,
  engagements,
  onSaveProfile,
  onResetSampleData,
  onClearAllData,
  onImportData,
  onLogout,
}: SettingsScreenProps) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [accountabilityEmail, setAccountabilityEmail] = useState(user.accountabilityEmail);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...user,
      name,
      phone,
      email,
      accountabilityEmail,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleExportJSON = () => {
    const data = {
      user,
      engagements,
      exportDate: new Date().toISOString(),
      appVersion: '1.0.0',
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `look-away-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed.engagements)) {
            onImportData(parsed.engagements);
            if (parsed.user) onSaveProfile(parsed.user);
            alert('Data imported successfully!');
          }
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  return (
    <div className="w-full max-w-[680px] mx-auto p-3 sm:p-5">
      {savedToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#f1ca63] text-[#020b12] px-5 py-3 rounded-lg font-bold text-xs shadow-2xl flex items-center gap-2 border border-[#fff]">
          <CheckCircle2 className="w-4 h-4 text-[#020b12]" strokeWidth={1.5} />
          <span>Profile & Accountability settings saved!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 pb-2 mb-2">
        <LionCrest size={40} glow={false} />
        <div>
          <h2 className="font-serif-gold text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0 leading-tight">
            APP SETTINGS
          </h2>
          <span className="text-xs text-[#b9b7ad]">
            Manage user identity, accountability partners, and data backups
          </span>
        </div>
      </div>

      <GoldDivider compact={true} />

      {/* Profile Form */}
      <form onSubmit={handleSave} className="gold-card p-5 space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-gold text-sm sm:text-base font-bold text-[#f1ca63] uppercase m-0 flex items-center gap-2">
            <User className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />
            USER & ACCOUNTABILITY PROFILE
          </h3>
          {onLogout && (
            <button
              type="button"
              id="settings-logout-btn"
              onClick={onLogout}
              className="text-xs font-bold text-[#f1ca63] hover:underline flex items-center gap-1 cursor-pointer bg-[#02050c] px-2.5 py-1 rounded border border-[#765b24]/60"
            >
              <LogOut className="w-3 h-3" />
              Switch Account / Log Out
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full gold-input text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full gold-input text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1">
              Your Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full gold-input text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1">
              Accountability Partner Email
            </label>
            <input
              type="email"
              value={accountabilityEmail}
              onChange={(e) => setAccountabilityEmail(e.target.value)}
              className="w-full gold-input text-xs"
              placeholder="mentor@example.com"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="btn-gold py-2 px-5 rounded text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
          >
            Save Changes
          </button>
          <div className="flex items-center gap-1.5 text-xs text-[#b9b7ad]">
            <UserCheck className="w-3.5 h-3.5 text-[#f1ca63]" />
            <span>Active: <strong className="text-[#f1ca63]">{user.name}</strong></span>
          </div>
        </div>
      </form>

      {/* Data Management Card */}
      <div className="gold-card p-5 space-y-4">
        <h3 className="font-serif-gold text-sm sm:text-base font-bold text-[#f1ca63] uppercase m-0 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />
          DATA BACKUP & RESTORATION
        </h3>

        <div className="text-xs text-[#b9b7ad] leading-relaxed">
          Your visual engagements are stored locally and encrypted within your browser storage. You can export a JSON backup at any time or restore demo data.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportJSON}
            className="btn-dark py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
            Export Full JSON Backup
          </button>

          <label className="btn-dark py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
            Import JSON Backup
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={onResetSampleData}
            className="btn-dark py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:border-[#eab308]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
            Reset Poster Sample Data
          </button>

          <button
            type="button"
            onClick={onClearAllData}
            className="bg-[#351714] border border-[#8f3f31] text-[#f87171] py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:bg-[#4d1f1b]"
          >
            <Trash2 className="w-3.5 h-3.5 text-[#f87171]" strokeWidth={1.5} />
            Clear All History
          </button>
        </div>
      </div>
    </div>
  );
}

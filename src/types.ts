export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  accountabilityEmail: string;
  isRegistered: boolean;
  pin?: string;
  joinedDate: string;
}

export type ScoreLevel = 1 | 2 | 3 | 4;

export interface ScoreOption {
  level: ScoreLevel;
  code: string;
  title: string;
  description: string;
  icon: string;
}

export interface EngagementRecord {
  id: string;
  timestamp: string;
  dateStr: string;
  timeStr: string;
  score: ScoreLevel;
  scoreLabel: string;
  feelings: string[];
  locations: string[];
  attire: string[];
  eyesWentTo: string[];
  herBuild: string[];
  hairColor: string;
  comments: string;
  triggers: TriggerEntry[];
}

export interface TriggerEntry {
  trigger: string;
  comment: string;
}

export interface ReportRecord {
  id: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  emailToSend: string;
  generalComments: string;
  triggers: TriggerEntry[];
}

export interface NewEngagementDraft {
  score: ScoreLevel | null;
  feelings: string[];
  feelingsOther: string;
  locations: string[];
  locationsOther: string;
  attire: string[];
  attireOther: string;
  eyesWentTo: string[];
  eyesOther: string;
  herBuild: string[];
  herBuildOther: string;
  hairColor: string;
  hairColorOther: string;
  comments: string;
  triggers: TriggerEntry[];
}

export type FlowStep =
  | 'splash'
  | 'register'
  | 'home'
  | 'score'
  | 'feeling'
  | 'location'
  | 'attire'
  | 'eyes'
  | 'build'
  | 'hair'
  | 'comments'
  | 'triggers'
  | 'review'
  | 'create_report'
  | 'report_summary'
  | 'engagements_list'
  | 'engagement_detail'
  | 'confirmation'
  | 'settings';

export type MainNavTab = 'home' | 'log' | 'reports' | 'settings';

export type ViewMode = 'mobile' | 'web' | 'showcase';

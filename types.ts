export enum AccountStatus {
  Active = "Active",
  Inactive = "Inactive",
  SelfExclusion = "Self Exclusion",
  AdminExclusion = "Admin Exclusion",
  FamilyExclusion = "Family Exclusion",
  Gov = "Gov",
  Licensee = "Licensee",
  GelHolders = "Gel Holders",
  Locked = "Locked",
  UnderReview = "Under Review",
  Frozen = "Frozen",
  PendingSelfExclusion = "Pending Self Exclusion",
  Idle = "Idle"
}

export enum KYCStatus {
  NotSet = "Not set",
  Pending = "Pending",
  Verifying = "Verifying",
  Expired = "Expired",
  Approved = "Approved",
  Disapproved = "Disapproved"
}

export interface Player {
  id: string;
  shortId: string;
  fullName: string;
  phone: string;
  email: string;
  status: AccountStatus;
  isPaid: boolean;
  kycStatus: KYCStatus;
  walletBalance: number;
  lastLogin: string;
  lastDeposit: string;
  registrationTime: string;
  banReason?: string;
  nickname?: string;
  dob?: string;
  gender?: string;
  ip?: string;
  
  // Dashboard additional fields
  registrationIp?: string;
  registrationDeviceId?: string;
  lastLoginIp?: string;
  lastLoginDeviceId?: string;
  
  firstDepositTime?: string;
  lastBetTime?: string;
  
  accountPassword?: string;
  linkedProviders?: string;
  
  bettingLimitLastUpdate?: string;
}

export interface AccountLog {
  id: string;
  time: string;
  updatedBy: string;
  action: string;
  beforeValue?: string; // New field
  afterValue?: string;  // New field
  remarks: string;
  ip: string;
  hasDetails: boolean;
}

export interface LogDetailItem {
  field: string;
  before: string;
  after: string;
}

export interface LogDetailData {
  logId: string;
  items: LogDetailItem[];
}
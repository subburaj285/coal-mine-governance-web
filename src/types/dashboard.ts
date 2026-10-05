/**
 * Coal India Limited - AI-Based Smart Governance and Compliance Monitoring System
 * Problem Statement ID: 26024
 * Types Definition
 */

export type SubsidiaryId = 'ALL' | 'MCL' | 'SECL' | 'NCL' | 'WCL' | 'CCL' | 'BCCL' | 'ECL' | 'NEC' | 'CMPDIL';

export type UserRole = 
  | 'Mine Manager'
  | 'Safety Officer'
  | 'Environment Officer'
  | 'Production Manager'
  | 'Maintenance Engineer'
  | 'Contractor Supervisor'
  | 'DGMS Inspector'
  | 'Corporate Leadership'
  | 'Control Room Operator';

export type ShiftType = 'A' | 'B' | 'C' | 'ALL';
export type DateRangeType = 'Today' | 'Shift' | 'Week' | 'Month' | 'Custom';
export type Language = 'EN' | 'HI';

export interface MineZone {
  id: string;
  name: string;
  subsidiary: SubsidiaryId;
  type: 'Opencast' | 'Underground';
  riskScore: number; // 0 - 100
  workersCount: number;
  equipmentCount: number;
  ch4Level: number; // %
  coLevel: number; // ppm
  o2Level: number; // %
  h2sLevel: number; // ppm
  airflow: number; // m3/min
  temperature: number; // °C
  humidity: number; // %
  lat: number;
  lng: number;
}

export interface KpiMetric {
  id: string;
  title: string;
  titleHi: string;
  value: string;
  unit: string;
  target?: string;
  delta: string;
  isPositive: boolean;
  severity: 'normal' | 'warning' | 'critical' | 'info';
  sparkline: number[];
  drilldownKey: string;
}

export interface GasReading {
  id: string;
  zone: string;
  subsidiary: SubsidiaryId;
  ch4: number; // %
  co: number; // ppm
  o2: number; // %
  h2s: number; // ppm
  airVelocity: number; // m/s
  status: 'Nominal' | 'Warning' | 'Hazardous';
  timestamp: string;
}

export interface SafetyIncident {
  id: string;
  time: string;
  subsidiary: SubsidiaryId;
  mine: string;
  zone: string;
  type: 'Fall of Ground' | 'Strata Movement' | 'Gas Inundation' | 'HEMM Near Miss' | 'Haul Road Slip' | 'Electrical Flash' | 'Machinery Pinch';
  severity: 'Fatal' | 'Serious' | 'Minor' | 'Near Miss';
  status: 'Investigating' | 'Under Enquiry' | 'Closed' | 'DGMS Escalated';
  investigator: string;
}

export interface ViolationRecord {
  id: string;
  ruleCode: string; // e.g. CMR 2017 Reg 153
  statute: 'CMR 2017' | 'Mines Act 1952' | 'EP Act 1986' | 'Water Act 1974' | 'Air Act 1981';
  description: string;
  mine: string;
  subsidiary: SubsidiaryId;
  contractor?: string;
  severity: 'Critical' | 'Major' | 'Minor';
  daysOverdue: number;
  assignedOfficer: string;
  status: 'Open' | 'Action Plan Submitted' | 'Rectified' | 'Closed';
}

export interface EquipmentTelemetry {
  id: string;
  tag: string;
  type: 'Dumper' | 'Shovel' | 'Dragline' | 'Dozer' | 'Surface Miner' | 'In-Pit Crusher';
  subsidiary: SubsidiaryId;
  mine: string;
  operator: string;
  status: 'Operating' | 'Idle' | 'Maintenance' | 'Emergency Stop';
  fuelLevel: number; // %
  hydraulicTemp: number; // °C
  engineOilPress: number; // psi
  tyreTemp: number; // °C
  lat: number;
  lng: number;
  cycleTimeMinutes: number;
  payloadTonnes: number;
  rulHours: number; // Remaining Useful Life
}

export interface AirQualitySensor {
  id: string;
  location: string;
  subsidiary: SubsidiaryId;
  pm25: number; // ug/m3 (CPCB limit 60)
  pm10: number; // ug/m3 (CPCB limit 100)
  so2: number; // ug/m3 (limit 80)
  nox: number; // ug/m3 (limit 80)
  aqi: number;
  status: 'Good' | 'Moderate' | 'Poor' | 'Severe';
}

export interface ActiveAlert {
  id: string;
  title: string;
  category: 'Gas' | 'Strata' | 'Fleet' | 'Environment' | 'Workforce' | 'Weather';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  subsidiary: SubsidiaryId;
  location: string;
  timestamp: string;
  escalationLevel: 1 | 2 | 3;
  escalatedTo: string;
  acknowledged: boolean;
}

export interface ContractorCompliance {
  id: string;
  name: string;
  subsidiary: SubsidiaryId;
  workersCount: number;
  licenseValidTill: string;
  insuranceValid: boolean;
  trainingComplianceRate: number; // %
  ppeComplianceRate: number; // %
  openViolationsCount: number;
  riskRating: 'Low' | 'Medium' | 'High';
}

export interface StatutoryReport {
  id: string;
  code: string;
  title: string;
  regulator: 'DGMS' | 'IBM' | 'MoEFCC / SPCB' | 'Ministry of Coal';
  period: string;
  dueDate: string;
  status: 'Submitted & Verified' | 'Pending Review' | 'Draft' | 'Overdue';
  digitalSignatureSha: string;
}

// Governance Lifecycle Workflow Types

export type InspectionStatus = 'Scheduled' | 'In Progress' | 'Review' | 'Verified' | 'Closed';

export interface EvidenceItem {
  id: string;
  type: 'Photo' | 'Video' | 'Document' | 'Sensor Log';
  caption: string;
  url: string;
  timestamp: string;
  location: string;
  uploader: string;
}

export interface FindingItem {
  id: string;
  inspectionId: string;
  title: string;
  description: string;
  severity: 'Critical' | 'Major' | 'Minor';
  aiSuggestion?: string;
  aiConfidence?: number; // e.g. 87%
  complianceRef: string; // e.g. CMR 2017 Reg 153
  owner: string;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Pending Verification' | 'Resolved' | 'Closed';
  evidence: EvidenceItem[];
}

export interface InspectionRecord {
  id: string;
  mine: string;
  subsidiary: SubsidiaryId;
  area: string;
  type: 'Safety Audit' | 'DGMS Statutory' | 'Environmental Inspection' | 'Ventilation Audit' | 'Structural Integrity';
  officer: string;
  date: string;
  findingsCount: number;
  riskLevel: 'Critical' | 'Major' | 'Minor' | 'Low';
  status: InspectionStatus;
  findings: FindingItem[];
  verificationNotes?: string;
  verifiedBy?: string;
}

export type ActionStatus = 'OPEN' | 'ASSIGNED' | 'IN PROGRESS' | 'PENDING VERIFICATION' | 'VERIFIED' | 'CLOSED';

export interface CorrectiveActionItem {
  id: string;
  source: string; // Inspection ID or Finding ID
  issueTitle: string;
  mine: string;
  subsidiary: SubsidiaryId;
  owner: string;
  ownerDepartment: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  dueDate: string;
  ageDays: number;
  status: ActionStatus;
  correctiveEvidence?: EvidenceItem[];
  verificationDate?: string;
  verifiedBy?: string;
}

export interface AuditTrailItem {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  entity: string;
  previousState: string;
  newState: string;
  hash: string;
}


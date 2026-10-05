import {
  SubsidiaryId,
  MineZone,
  KpiMetric,
  GasReading,
  SafetyIncident,
  ViolationRecord,
  EquipmentTelemetry,
  AirQualitySensor,
  ActiveAlert,
  ContractorCompliance,
  StatutoryReport,
  InspectionRecord,
  CorrectiveActionItem,
  AuditTrailItem
} from '../types/dashboard';

export const SUBSIDIARIES: { id: SubsidiaryId; name: string; hq: string; minesCount: number; annualCapacityMT: number }[] = [
  { id: 'ALL', name: 'All Coal India Limited (Pan-India)', hq: 'Kolkata, WB', minesCount: 318, annualCapacityMT: 780 },
  { id: 'MCL', name: 'Mahanadi Coalfields Limited', hq: 'Sambalpur, Odisha', minesCount: 42, annualCapacityMT: 195 },
  { id: 'SECL', name: 'South Eastern Coalfields Limited', hq: 'Bilaspur, Chhattisgarh', minesCount: 68, annualCapacityMT: 182 },
  { id: 'NCL', name: 'Northern Coalfields Limited', hq: 'Singrauli, MP', minesCount: 10, annualCapacityMT: 133 },
  { id: 'WCL', name: 'Western Coalfields Limited', hq: 'Nagpur, Maharashtra', minesCount: 52, annualCapacityMT: 65 },
  { id: 'CCL', name: 'Central Coalfields Limited', hq: 'Ranchi, Jharkhand', minesCount: 41, annualCapacityMT: 84 },
  { id: 'BCCL', name: 'Bharat Coking Coal Limited', hq: 'Dhanbad, Jharkhand', minesCount: 36, annualCapacityMT: 41 },
  { id: 'ECL', name: 'Eastern Coalfields Limited', hq: 'Sanctoria, WB', minesCount: 62, annualCapacityMT: 49 },
  { id: 'NEC', name: 'North Eastern Coalfields', hq: 'Margherita, Assam', minesCount: 4, annualCapacityMT: 3 },
  { id: 'CMPDIL', name: 'Central Mine Planning & Design Inst.', hq: 'Ranchi, Jharkhand', minesCount: 3, annualCapacityMT: 0 }
];

export const MINE_ZONES: MineZone[] = [
  {
    id: 'MCL-Z1',
    name: 'Gevra Deep Open Pit East',
    subsidiary: 'SECL',
    type: 'Opencast',
    riskScore: 24,
    workersCount: 240,
    equipmentCount: 34,
    ch4Level: 0.12,
    coLevel: 4.2,
    o2Level: 20.8,
    h2sLevel: 0.05,
    airflow: 3400,
    temperature: 28.5,
    humidity: 58,
    lat: 22.3486,
    lng: 82.5922
  },
  {
    id: 'MCL-Z2',
    name: 'Talcher Seam IX Underground Face',
    subsidiary: 'MCL',
    type: 'Underground',
    riskScore: 78,
    workersCount: 115,
    equipmentCount: 12,
    ch4Level: 0.65,
    coLevel: 14.8,
    o2Level: 19.4,
    h2sLevel: 1.8,
    airflow: 1450,
    temperature: 31.2,
    humidity: 84,
    lat: 20.9509,
    lng: 85.2166
  },
  {
    id: 'NCL-Z1',
    name: 'Jayant Main Quarry Bench 4',
    subsidiary: 'NCL',
    type: 'Opencast',
    riskScore: 18,
    workersCount: 180,
    equipmentCount: 28,
    ch4Level: 0.05,
    coLevel: 3.1,
    o2Level: 20.9,
    h2sLevel: 0.0,
    airflow: 4200,
    temperature: 29.1,
    humidity: 49,
    lat: 24.1162,
    lng: 82.6582
  },
  {
    id: 'BCCL-Z1',
    name: 'Moonidih Powered Support Longwall',
    subsidiary: 'BCCL',
    type: 'Underground',
    riskScore: 82,
    workersCount: 94,
    equipmentCount: 16,
    ch4Level: 0.88,
    coLevel: 18.2,
    o2Level: 19.1,
    h2sLevel: 2.1,
    airflow: 1280,
    temperature: 33.4,
    humidity: 89,
    lat: 23.7381,
    lng: 86.3456
  },
  {
    id: 'WCL-Z1',
    name: 'Umrer Dragline Cutting Face',
    subsidiary: 'WCL',
    type: 'Opencast',
    riskScore: 32,
    workersCount: 142,
    equipmentCount: 22,
    ch4Level: 0.08,
    coLevel: 5.6,
    o2Level: 20.7,
    h2sLevel: 0.1,
    airflow: 3800,
    temperature: 30.0,
    humidity: 52,
    lat: 20.8542,
    lng: 79.3244
  },
  {
    id: 'CCL-Z1',
    name: 'Piparwar Surface Coal Handling Area',
    subsidiary: 'CCL',
    type: 'Opencast',
    riskScore: 29,
    workersCount: 165,
    equipmentCount: 20,
    ch4Level: 0.06,
    coLevel: 4.8,
    o2Level: 20.8,
    h2sLevel: 0.0,
    airflow: 3950,
    temperature: 27.8,
    humidity: 61,
    lat: 23.7028,
    lng: 85.0319
  },
  {
    id: 'ECL-Z1',
    name: 'Jhanjra Continuous Miner District',
    subsidiary: 'ECL',
    type: 'Underground',
    riskScore: 64,
    workersCount: 108,
    equipmentCount: 14,
    ch4Level: 0.54,
    coLevel: 11.2,
    o2Level: 19.8,
    h2sLevel: 1.1,
    airflow: 1620,
    temperature: 30.5,
    humidity: 81,
    lat: 23.6521,
    lng: 87.2841
  },
  {
    id: 'SECL-Z2',
    name: 'Kusmunda Overburden Highwall Face',
    subsidiary: 'SECL',
    type: 'Opencast',
    riskScore: 41,
    workersCount: 210,
    equipmentCount: 30,
    ch4Level: 0.04,
    coLevel: 3.8,
    o2Level: 20.9,
    h2sLevel: 0.0,
    airflow: 4100,
    temperature: 29.8,
    humidity: 54,
    lat: 22.3211,
    lng: 82.6844
  },
  {
    id: 'MCL-Z3',
    name: 'Lakhanpur Coal Face West',
    subsidiary: 'MCL',
    type: 'Opencast',
    riskScore: 22,
    workersCount: 155,
    equipmentCount: 25,
    ch4Level: 0.05,
    coLevel: 4.1,
    o2Level: 20.8,
    h2sLevel: 0.0,
    airflow: 4300,
    temperature: 28.2,
    humidity: 57,
    lat: 21.7583,
    lng: 83.8541
  },
  {
    id: 'BCCL-Z2',
    name: 'Jharia Open Cast Fire Zone Seam IV',
    subsidiary: 'BCCL',
    type: 'Opencast',
    riskScore: 88,
    workersCount: 88,
    equipmentCount: 18,
    ch4Level: 0.35,
    coLevel: 26.4,
    o2Level: 20.1,
    h2sLevel: 3.4,
    airflow: 3100,
    temperature: 41.2,
    humidity: 43,
    lat: 23.7544,
    lng: 86.4182
  }
];

export const INITIAL_KPIS: KpiMetric[] = [
  {
    id: 'prod',
    title: 'Production (Tonnes)',
    titleHi: 'कोयला उत्पादन (टन)',
    value: '2,481,200',
    unit: 'T',
    target: '2,400,000 T',
    delta: '+3.4%',
    isPositive: true,
    severity: 'normal',
    sparkline: [210, 225, 230, 218, 240, 244, 248],
    drilldownKey: 'production'
  },
  {
    id: 'dispatch',
    title: 'Dispatch / Offtake',
    titleHi: 'कोयला प्रेषण / उठाव',
    value: '2,514,800',
    unit: 'T',
    target: '2,450,000 T',
    delta: '+2.6%',
    isPositive: true,
    severity: 'normal',
    sparkline: [230, 235, 242, 238, 245, 249, 251],
    drilldownKey: 'dispatch'
  },
  {
    id: 'safety',
    title: 'Safety Incidents',
    titleHi: 'सुरक्षा घटनाएं',
    value: '0',
    unit: 'Today (MTD: 2, YTD: 9)',
    delta: '-66.7% vs PM',
    isPositive: true,
    severity: 'normal',
    sparkline: [3, 2, 1, 2, 0, 1, 0],
    drilldownKey: 'safety'
  },
  {
    id: 'violations',
    title: 'Open Violations',
    titleHi: 'सक्रिय उल्लंघन',
    value: '14',
    unit: 'Total (3 Overdue, 1 Critical)',
    delta: '-4 this week',
    isPositive: true,
    severity: 'warning',
    sparkline: [22, 20, 19, 18, 16, 15, 14],
    drilldownKey: 'violations'
  },
  {
    id: 'compliance',
    title: 'Compliance Score',
    titleHi: 'अनुपालन स्कोर',
    value: '96.8%',
    unit: 'Statutory Aggregate',
    delta: '+1.2%',
    isPositive: true,
    severity: 'normal',
    sparkline: [94.2, 94.8, 95.1, 95.5, 96.0, 96.4, 96.8],
    drilldownKey: 'compliance'
  },
  {
    id: 'alerts',
    title: 'Active Alerts',
    titleHi: 'सक्रिय चेतावनी',
    value: '6',
    unit: 'Gas: 2 · Strata: 1 · Fleet: 3',
    delta: '+1 in last 2h',
    isPositive: false,
    severity: 'critical',
    sparkline: [4, 5, 4, 3, 5, 5, 6],
    drilldownKey: 'alerts'
  },
  {
    id: 'workforce',
    title: 'Workforce Present',
    titleHi: 'उपस्थित कार्यबल',
    value: '14,892',
    unit: 'UG: 4,120 · Surface: 10,772',
    delta: '94.2% Attendance',
    isPositive: true,
    severity: 'normal',
    sparkline: [14100, 14300, 14500, 14600, 14750, 14820, 14892],
    drilldownKey: 'workforce'
  },
  {
    id: 'equipment',
    title: 'Equipment Availability',
    titleHi: 'उपकरण उपलब्धता',
    value: '88.4%',
    unit: 'Utilization: 82.1%',
    delta: '+2.8%',
    isPositive: true,
    severity: 'normal',
    sparkline: [83, 84, 85, 86, 86.5, 87.8, 88.4],
    drilldownKey: 'fleet'
  }
];

export const GAS_TELEMETRY: GasReading[] = [
  { id: 'GS-101', zone: 'Moonidih Longwall Face', subsidiary: 'BCCL', ch4: 0.88, co: 18.2, o2: 19.1, h2s: 2.1, airVelocity: 1.2, status: 'Hazardous', timestamp: '10:04:12' },
  { id: 'GS-102', zone: 'Talcher Seam IX Gate Road', subsidiary: 'MCL', ch4: 0.65, co: 14.8, o2: 19.4, h2s: 1.8, airVelocity: 1.8, status: 'Warning', timestamp: '10:04:09' },
  { id: 'GS-103', zone: 'Jhanjra Main Return Airway', subsidiary: 'ECL', ch4: 0.54, co: 11.2, o2: 19.8, h2s: 1.1, airVelocity: 2.6, status: 'Warning', timestamp: '10:03:55' },
  { id: 'GS-104', zone: 'Gevra Pit East In-Pit Belt', subsidiary: 'SECL', ch4: 0.12, co: 4.2, o2: 20.8, h2s: 0.05, airVelocity: 3.4, status: 'Nominal', timestamp: '10:04:00' },
  { id: 'GS-105', zone: 'Jayant Haul Road South', subsidiary: 'NCL', ch4: 0.05, co: 3.1, o2: 20.9, h2s: 0.0, airVelocity: 4.1, status: 'Nominal', timestamp: '10:03:42' },
  { id: 'GS-106', zone: 'Umrer Overburden Bench 3', subsidiary: 'WCL', ch4: 0.08, co: 5.6, o2: 20.7, h2s: 0.1, airVelocity: 3.8, status: 'Nominal', timestamp: '10:03:31' },
  { id: 'GS-107', zone: 'Jharia Coal Fire Seam IV Vent', subsidiary: 'BCCL', ch4: 0.35, co: 26.4, o2: 20.1, h2s: 3.4, airVelocity: 2.0, status: 'Hazardous', timestamp: '10:04:15' }
];

export const SAFETY_INCIDENTS: SafetyIncident[] = [
  { id: 'INC-2026-081', time: 'Yesterday 18:40', subsidiary: 'BCCL', mine: 'Moonidih Colliery', zone: 'Tailgate Gate Road', type: 'Strata Movement', severity: 'Near Miss', status: 'Investigating', investigator: 'Er. A. K. Banerjee (DGMS)' },
  { id: 'INC-2026-079', time: '26 Sep 14:15', subsidiary: 'SECL', mine: 'Gevra Mega Pit', zone: 'Bench 5 Haul Road', type: 'HEMM Near Miss', severity: 'Minor', status: 'Closed', investigator: 'S. N. Mishra (Safety Officer)' },
  { id: 'INC-2026-072', time: '19 Sep 09:20', subsidiary: 'WCL', mine: 'Umrer Opencast', zone: 'Workshop Bay 2', type: 'Machinery Pinch', severity: 'Minor', status: 'Closed', investigator: 'P. K. Verma (Colliery Eng.)' },
  { id: 'INC-2026-064', time: '08 Sep 22:50', subsidiary: 'ECL', mine: 'Jhanjra Project', zone: 'Inbye Substation', type: 'Electrical Flash', severity: 'Near Miss', status: 'Closed', investigator: 'R. K. Roy (Electrical Insp.)' }
];

export const VIOLATIONS_DATA: ViolationRecord[] = [
  { id: 'VIO-2026-104', ruleCode: 'CMR 2017 Reg 153', statute: 'CMR 2017', description: 'Underground air velocity in return airway below statutory minimum (1.1 m/s vs 1.5 m/s standard)', mine: 'Moonidih UG', subsidiary: 'BCCL', severity: 'Critical', daysOverdue: 2, assignedOfficer: 'Chief Mining Engineer S. Sharma', status: 'Open' },
  { id: 'VIO-2026-098', ruleCode: 'EP Act 1986 Sch VI', statute: 'EP Act 1986', description: 'Overburden dump water discharge TSS exceeds 100 mg/L limit during sudden cloudburst', mine: 'Kusmunda OCP', subsidiary: 'SECL', contractor: 'Adhunik Earthmovers Ltd', severity: 'Major', daysOverdue: 0, assignedOfficer: 'Env. Officer Neha Tiwari', status: 'Action Plan Submitted' },
  { id: 'VIO-2026-095', ruleCode: 'Mines Act 1952 Sec 22', statute: 'Mines Act 1952', description: 'Non-submission of quarterly occupational dust exposure audiometric records', mine: 'Jayant OCP', subsidiary: 'NCL', severity: 'Minor', daysOverdue: 0, assignedOfficer: 'Dr. V. K. Singh (PME)', status: 'Rectified' },
  { id: 'VIO-2026-089', ruleCode: 'CMR 2017 Reg 106', statute: 'CMR 2017', description: 'Haul road berm height less than 3/4th tyre diameter on curved downhill descent', mine: 'Lakhanpur OCP', subsidiary: 'MCL', contractor: 'Eastern Logistics Infra', severity: 'Major', daysOverdue: 4, assignedOfficer: 'Mine Manager B. Pattnaik', status: 'Open' },
  { id: 'VIO-2026-082', ruleCode: 'Water Act 1974 Sec 25', statute: 'Water Act 1974', description: 'Settling tank silt removal delayed by 6 days at effluent treatment discharge point', mine: 'Umrer OCP', subsidiary: 'WCL', severity: 'Minor', daysOverdue: 1, assignedOfficer: 'Env. Inspector M. Joshi', status: 'Open' }
];

export const FLEET_TELEMETRY: EquipmentTelemetry[] = [
  { id: 'EQ-01', tag: 'DMP-777D-104', type: 'Dumper', subsidiary: 'SECL', mine: 'Gevra OCP', operator: 'Rajesh Oraon', status: 'Operating', fuelLevel: 74, hydraulicTemp: 76, engineOilPress: 58, tyreTemp: 68, lat: 22.3490, lng: 82.5935, cycleTimeMinutes: 24.2, payloadTonnes: 98.4, rulHours: 1420 },
  { id: 'EQ-02', tag: 'SHV-P&H-202', type: 'Shovel', subsidiary: 'SECL', mine: 'Gevra OCP', operator: 'Suraj Kumar', status: 'Operating', fuelLevel: 88, hydraulicTemp: 82, engineOilPress: 62, tyreTemp: 55, lat: 22.3482, lng: 82.5910, cycleTimeMinutes: 2.1, payloadTonnes: 28.5, rulHours: 2150 },
  { id: 'EQ-03', tag: 'DMP-KOM-85', type: 'Dumper', subsidiary: 'NCL', mine: 'Jayant OCP', operator: 'D. P. Gupta', status: 'Operating', fuelLevel: 62, hydraulicTemp: 78, engineOilPress: 56, tyreTemp: 71, lat: 24.1170, lng: 82.6590, cycleTimeMinutes: 21.8, payloadTonnes: 94.0, rulHours: 980 },
  { id: 'EQ-04', tag: 'DZR-CAT-D11', type: 'Dozer', subsidiary: 'WCL', mine: 'Umrer OCP', operator: 'Anil Yadav', status: 'Operating', fuelLevel: 45, hydraulicTemp: 84, engineOilPress: 54, tyreTemp: 60, lat: 20.8550, lng: 79.3250, cycleTimeMinutes: 0.0, payloadTonnes: 0, rulHours: 720 },
  { id: 'EQ-05', tag: 'SHV-BE-195B', type: 'Shovel', subsidiary: 'BCCL', mine: 'Jharia East', operator: 'M. Ansari', status: 'Maintenance', fuelLevel: 30, hydraulicTemp: 92, engineOilPress: 42, tyreTemp: 58, lat: 23.7550, lng: 86.4190, cycleTimeMinutes: 0.0, payloadTonnes: 0, rulHours: 120 },
  { id: 'EQ-06', tag: 'DMP-BEML-55', type: 'Dumper', subsidiary: 'MCL', mine: 'Talcher West', operator: 'G. Behera', status: 'Operating', fuelLevel: 81, hydraulicTemp: 72, engineOilPress: 59, tyreTemp: 64, lat: 20.9515, lng: 85.2172, cycleTimeMinutes: 26.5, payloadTonnes: 54.2, rulHours: 1850 },
  { id: 'EQ-07', tag: 'SM-WIRTGEN-2', type: 'Surface Miner', subsidiary: 'MCL', mine: 'Lakhanpur OCP', operator: 'K. Sahu', status: 'Operating', fuelLevel: 68, hydraulicTemp: 79, engineOilPress: 60, tyreTemp: 62, lat: 21.7590, lng: 83.8550, cycleTimeMinutes: 18.0, payloadTonnes: 85.0, rulHours: 1600 }
];

export const AIR_QUALITY_SENSORS: AirQualitySensor[] = [
  { id: 'AQ-SECL-01', location: 'Gevra Core Boundary North', subsidiary: 'SECL', pm25: 48, pm10: 86, so2: 24, nox: 32, aqi: 86, status: 'Moderate' },
  { id: 'AQ-MCL-02', location: 'Talcher Buffer Zone Village', subsidiary: 'MCL', pm25: 54, pm10: 94, so2: 28, nox: 36, aqi: 94, status: 'Moderate' },
  { id: 'AQ-NCL-01', location: 'Jayant Colony Residential', subsidiary: 'NCL', pm25: 38, pm10: 72, so2: 18, nox: 22, aqi: 72, status: 'Good' },
  { id: 'AQ-BCCL-03', location: 'Jharia Coal Fire Downwind', subsidiary: 'BCCL', pm25: 112, pm10: 210, so2: 72, nox: 68, aqi: 210, status: 'Severe' },
  { id: 'AQ-WCL-01', location: 'Umrer Haul Road Dispersion Gate', subsidiary: 'WCL', pm25: 52, pm10: 98, so2: 22, nox: 30, aqi: 98, status: 'Moderate' }
];

export const ACTIVE_ALERTS: ActiveAlert[] = [
  {
    id: 'ALT-991',
    title: 'Methane (CH4) Level Surge: 0.88% (Threshold 0.80%)',
    category: 'Gas',
    severity: 'Critical',
    subsidiary: 'BCCL',
    location: 'Moonidih Longwall Face #3',
    timestamp: '10:04 AM',
    escalationLevel: 2,
    escalatedTo: 'Director Tech (BCCL) & Deputy DGMS',
    acknowledged: false
  },
  {
    id: 'ALT-988',
    title: 'Subsurface Fire Thermal Hotspot Expansion Detected via Satellite MSS',
    category: 'Strata',
    severity: 'High',
    subsidiary: 'BCCL',
    location: 'Jharia Seam IV Overburden Ridge',
    timestamp: '09:42 AM',
    escalationLevel: 2,
    escalatedTo: 'General Manager (Safety) BCCL',
    acknowledged: true
  },
  {
    id: 'ALT-984',
    title: 'HEMM Hydraulic Overheat Warning (92°C) on Shovel BE-195B',
    category: 'Fleet',
    severity: 'Medium',
    subsidiary: 'BCCL',
    location: 'Jharia East Pit',
    timestamp: '09:15 AM',
    escalationLevel: 1,
    escalatedTo: 'Pit Maintenance Supervisor',
    acknowledged: true
  },
  {
    id: 'ALT-981',
    title: 'Particulate Dust PM10 Exceedance (210 µg/m³ vs 100 limit)',
    category: 'Environment',
    severity: 'High',
    subsidiary: 'BCCL',
    location: 'Jharia Downwind Monitoring Stn',
    timestamp: '08:50 AM',
    escalationLevel: 2,
    escalatedTo: 'Regional Environment Officer',
    acknowledged: false
  },
  {
    id: 'ALT-977',
    title: 'SmartCap Operator Fatigue Alert: Micro-sleep indicators on DMP-777D-104',
    category: 'Workforce',
    severity: 'Medium',
    subsidiary: 'SECL',
    location: 'Gevra Bench 4 Ramp',
    timestamp: '08:22 AM',
    escalationLevel: 1,
    escalatedTo: 'Shift Incharge Gevra',
    acknowledged: true
  },
  {
    id: 'ALT-972',
    title: 'IMD Early Warning: Lightning & Heavy Thunderstorm (40-60 km/h gusts)',
    category: 'Weather',
    severity: 'Medium',
    subsidiary: 'MCL',
    location: 'Ib Valley / Talcher Coalfields',
    timestamp: '07:45 AM',
    escalationLevel: 1,
    escalatedTo: 'All Pit Control Rooms MCL',
    acknowledged: true
  }
];

export const CONTRACTORS_DATA: ContractorCompliance[] = [
  { id: 'CON-01', name: 'Adhunik Earthmovers Infrastructure Ltd', subsidiary: 'SECL', workersCount: 420, licenseValidTill: '2027-03-31', insuranceValid: true, trainingComplianceRate: 97.4, ppeComplianceRate: 98.8, openViolationsCount: 1, riskRating: 'Low' },
  { id: 'CON-02', name: 'Kalinga Mining Logistics & Transport', subsidiary: 'MCL', workersCount: 380, licenseValidTill: '2026-11-30', insuranceValid: true, trainingComplianceRate: 92.1, ppeComplianceRate: 94.5, openViolationsCount: 2, riskRating: 'Medium' },
  { id: 'CON-03', name: 'Singrauli Haulage Services JV', subsidiary: 'NCL', workersCount: 290, licenseValidTill: '2027-08-15', insuranceValid: true, trainingComplianceRate: 98.6, ppeComplianceRate: 99.2, openViolationsCount: 0, riskRating: 'Low' },
  { id: 'CON-04', name: 'Dhanbad Heavy Excavation Works', subsidiary: 'BCCL', workersCount: 310, licenseValidTill: '2026-10-15', insuranceValid: true, trainingComplianceRate: 84.2, ppeComplianceRate: 88.0, openViolationsCount: 4, riskRating: 'High' },
  { id: 'CON-05', name: 'Vidarbha Mining & Earth Solutions', subsidiary: 'WCL', workersCount: 245, licenseValidTill: '2027-01-20', insuranceValid: true, trainingComplianceRate: 94.0, ppeComplianceRate: 96.1, openViolationsCount: 1, riskRating: 'Low' }
];

export const STATUTORY_REPORTS: StatutoryReport[] = [
  { id: 'REP-01', code: 'DGMS Form IV', title: 'Annual Return of Accidents & Dangerous Occurrences', regulator: 'DGMS', period: 'CY 2025-26', dueDate: '15 Feb 2026', status: 'Submitted & Verified', digitalSignatureSha: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
  { id: 'REP-02', code: 'IBM Form H', title: 'Monthly Return on Production, Despatch & Stocks', regulator: 'IBM', period: 'August 2026', dueDate: '10 Sep 2026', status: 'Submitted & Verified', digitalSignatureSha: 'sha256-4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a' },
  { id: 'REP-03', code: 'SPCB Form V', title: 'Environmental Audit Statement for Mining Lease', regulator: 'MoEFCC / SPCB', period: 'FY 2025-26', dueDate: '30 Sep 2026', status: 'Pending Review', digitalSignatureSha: 'sha256-ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d' },
  { id: 'REP-04', code: 'MoC Star Rating', title: 'Star Rating Assessment Report for Coal Mines', regulator: 'Ministry of Coal', period: 'FY 2025-26', dueDate: '31 Oct 2026', status: 'Draft', digitalSignatureSha: 'sha256-pending-dg-signature-c0491' }
];

// Governance Lifecycle Mock Data

export const GOVERNANCE_KPIS = [
  {
    id: 'gov-compliance',
    title: 'Compliance Score',
    value: '96.8%',
    subtext: '↑ 1.2% vs previous period',
    trend: '+1.2%',
    isPositive: true,
    severity: 'normal' as const
  },
  {
    id: 'gov-risks',
    title: 'High-Risk Issues',
    value: '14',
    subtext: '3 Critical · 5 Major',
    trend: '-4 this week',
    isPositive: true,
    severity: 'warning' as const
  },
  {
    id: 'gov-overdue',
    title: 'Overdue Corrective Actions',
    value: '6',
    subtext: '2 Critical · 4 High Priority',
    trend: 'Requires Action',
    isPositive: false,
    severity: 'critical' as const
  },
  {
    id: 'gov-inspections',
    title: 'Active Inspections',
    value: '18',
    subtext: '12 Completed · 6 In Progress',
    trend: 'On Track',
    isPositive: true,
    severity: 'info' as const
  }
];

export const INSPECTIONS_DATA: InspectionRecord[] = [
  {
    id: 'INSP-2026-401',
    mine: 'Moonidih Colliery',
    subsidiary: 'BCCL',
    area: 'Tailgate Airway Seam IX',
    type: 'DGMS Statutory',
    officer: 'Er. A. K. Banerjee (DGMS Sirdar)',
    date: '2026-10-04',
    findingsCount: 3,
    riskLevel: 'Critical',
    status: 'In Progress',
    findings: [
      {
        id: 'FND-101',
        inspectionId: 'INSP-2026-401',
        title: 'Underground air velocity below requirement',
        description: 'Air velocity in return airway measured at 1.1 m/s against CMR Regulation 153 minimum standard of 1.5 m/s.',
        severity: 'Critical',
        aiSuggestion: 'Adjust main ventilation fan blade pitch at Fan House #2 and check intake booster door seals.',
        aiConfidence: 91,
        complianceRef: 'CMR 2017 Regulation 153(2)',
        owner: 'Safety Officer (Moonidih)',
        dueDate: '2026-10-07',
        status: 'Open',
        evidence: [
          {
            id: 'EVD-01',
            type: 'Photo',
            caption: 'Anemometer reading 1.1 m/s at station 4B',
            url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
            timestamp: '2026-10-04 10:15 AM',
            location: 'Moonidih Underground Station 4B (Lat: 23.7381, Lng: 86.3456)',
            uploader: 'Er. A. K. Banerjee'
          }
        ]
      },
      {
        id: 'FND-102',
        inspectionId: 'INSP-2026-401',
        title: 'CH4 sensor calibration log overdue by 5 days',
        description: 'Stationary CH4 detector at Longwall Face #3 calibration record expired.',
        severity: 'Major',
        aiSuggestion: 'Recalibrate infrared gas sensor with certified 1.0% CH4 calibration gas cylinder.',
        aiConfidence: 85,
        complianceRef: 'CMR 2017 Regulation 154',
        owner: 'Instrumentation Incharge',
        dueDate: '2026-10-06',
        status: 'In Progress',
        evidence: []
      }
    ]
  },
  {
    id: 'INSP-2026-398',
    mine: 'Gevra Mega Pit',
    subsidiary: 'SECL',
    area: 'Bench 5 Haul Road Ramp',
    type: 'Safety Audit',
    officer: 'S. N. Mishra (Safety Officer)',
    date: '2026-10-03',
    findingsCount: 2,
    riskLevel: 'Major',
    status: 'Review',
    findings: [
      {
        id: 'FND-103',
        inspectionId: 'INSP-2026-398',
        title: 'Safety berm height below 3/4th tyre diameter',
        description: 'Berm height on outer curve measures 1.2m against required 1.8m for 240T dumpers.',
        severity: 'Major',
        aiSuggestion: 'Deploy D11 Dozer to build up embankment to minimum 1.8m height.',
        aiConfidence: 94,
        complianceRef: 'DGMS Circular No. 2 of 2020',
        owner: 'Civil Maintenance Dept',
        dueDate: '2026-10-05',
        status: 'Pending Verification',
        evidence: [
          {
            id: 'EVD-02',
            type: 'Photo',
            caption: 'Deficient haul road berm on Bench 5 curve',
            url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80',
            timestamp: '2026-10-03 14:20 PM',
            location: 'Gevra Open Pit Bench 5',
            uploader: 'S. N. Mishra'
          }
        ]
      }
    ]
  },
  {
    id: 'INSP-2026-392',
    mine: 'Talcher Seam IX',
    subsidiary: 'MCL',
    area: 'Surface Coal Handling Plant',
    type: 'Environmental Inspection',
    officer: 'Neha Tiwari (Environment Officer)',
    date: '2026-10-02',
    findingsCount: 1,
    riskLevel: 'Minor',
    status: 'Verified',
    findings: [
      {
        id: 'FND-104',
        inspectionId: 'INSP-2026-392',
        title: 'Dry fog dust suppression nozzle blockage',
        description: '3 nozzles clogged at Transfer Point 2 causing ambient PM10 rise.',
        severity: 'Minor',
        aiSuggestion: 'Replace nozzle tips and flush water filter housing.',
        aiConfidence: 89,
        complianceRef: 'EP Act 1986 Schedule VI',
        owner: 'Plant Mechanical Engineer',
        dueDate: '2026-10-04',
        status: 'Closed',
        evidence: []
      }
    ]
  },
  {
    id: 'INSP-2026-385',
    mine: 'Jayant OCP',
    subsidiary: 'NCL',
    area: 'Quarry Bench 4 Highwall',
    type: 'Structural Integrity',
    officer: 'Dr. V. K. Singh (Geotechnical Specialist)',
    date: '2026-09-30',
    findingsCount: 0,
    riskLevel: 'Low',
    status: 'Closed',
    findings: []
  }
];

export const CORRECTIVE_ACTIONS_DATA: CorrectiveActionItem[] = [
  {
    id: 'ACT-2026-801',
    source: 'INSP-2026-401',
    issueTitle: 'Underground air velocity below statutory minimum standard',
    mine: 'Moonidih UG',
    subsidiary: 'BCCL',
    owner: 'Safety Officer (Moonidih)',
    ownerDepartment: 'Mine Safety & Ventilation',
    priority: 'Critical',
    dueDate: '2026-10-07',
    ageDays: 2,
    status: 'IN PROGRESS',
    correctiveEvidence: []
  },
  {
    id: 'ACT-2026-795',
    source: 'INSP-2026-398',
    issueTitle: 'Haul road berm height less than 3/4th tyre diameter',
    mine: 'Gevra OCP',
    subsidiary: 'SECL',
    owner: 'Civil Maintenance Dept',
    ownerDepartment: 'Mining Operations',
    priority: 'High',
    dueDate: '2026-10-05',
    ageDays: 4,
    status: 'PENDING VERIFICATION',
    correctiveEvidence: [
      {
        id: 'EVD-ACT-01',
        type: 'Photo',
        caption: 'Rectified berm built up to 1.95m using dozer push',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80',
        timestamp: '2026-10-05 09:30 AM',
        location: 'Gevra Bench 5 Curve',
        uploader: 'Civil Maintenance Supr.'
      }
    ]
  },
  {
    id: 'ACT-2026-788',
    source: 'VIO-2026-098',
    issueTitle: 'Overburden dump water discharge TSS exceeds 100 mg/L limit',
    mine: 'Kusmunda OCP',
    subsidiary: 'SECL',
    owner: 'Env. Officer Neha Tiwari',
    ownerDepartment: 'Environment & ESG',
    priority: 'High',
    dueDate: '2026-10-04',
    ageDays: 5,
    status: 'VERIFIED',
    verificationDate: '2026-10-05 11:00 AM',
    verifiedBy: 'State Pollution Control Board Inspector'
  },
  {
    id: 'ACT-2026-774',
    source: 'VIO-2026-082',
    issueTitle: 'Settling tank silt removal delayed at effluent discharge point',
    mine: 'Umrer OCP',
    subsidiary: 'WCL',
    owner: 'Env. Inspector M. Joshi',
    ownerDepartment: 'Civil & Environment',
    priority: 'Medium',
    dueDate: '2026-10-03',
    ageDays: 6,
    status: 'OPEN',
    correctiveEvidence: []
  },
  {
    id: 'ACT-2026-760',
    source: 'INSP-2026-392',
    issueTitle: 'Dry fog dust suppression nozzle blockage at Transfer Point 2',
    mine: 'Talcher Seam IX',
    subsidiary: 'MCL',
    owner: 'Plant Mechanical Engineer',
    ownerDepartment: 'Mechanical Engineering',
    priority: 'Low',
    dueDate: '2026-10-04',
    ageDays: 3,
    status: 'CLOSED',
    verificationDate: '2026-10-04 16:30 PM',
    verifiedBy: 'Colliery Engineer (MCL)'
  }
];

export const AUDIT_TRAIL_DATA: AuditTrailItem[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-10-05 14:15:22',
    user: 'Er. A. K. Banerjee',
    role: 'DGMS Inspector',
    action: 'Inspection Finding Created',
    entity: 'INSP-2026-401 / FND-101',
    previousState: 'Draft',
    newState: 'Critical Finding Logged (CMR 153 Air Velocity)',
    hash: 'sha256-b7f8a49c011e42a98f12c8e4d2'
  },
  {
    id: 'AUD-895',
    timestamp: '2026-10-05 11:30:10',
    user: 'Neha Tiwari',
    role: 'Environment Officer',
    action: 'Corrective Action Verified',
    entity: 'ACT-2026-788',
    previousState: 'PENDING VERIFICATION',
    newState: 'VERIFIED (SPCB TSS Clearance)',
    hash: 'sha256-4a21d98e3b5210faef908121c9'
  },
  {
    id: 'AUD-882',
    timestamp: '2026-10-05 09:45:00',
    user: 'S. N. Mishra',
    role: 'Safety Officer',
    action: 'Evidence Uploaded',
    entity: 'ACT-2026-795 / EVD-ACT-01',
    previousState: 'IN PROGRESS',
    newState: 'PENDING VERIFICATION',
    hash: 'sha256-89ec41d66a2b531a7c0019283d'
  },
  {
    id: 'AUD-870',
    timestamp: '2026-10-04 16:30:15',
    user: 'B. Pattnaik',
    role: 'Mine Manager',
    action: 'Corrective Action Closed',
    entity: 'ACT-2026-760',
    previousState: 'VERIFIED',
    newState: 'CLOSED',
    hash: 'sha256-c4d9e0114a51187bf2904128a1'
  }
];

export const TRANSLATIONS: Record<string, { en: string; hi: string }> = {
  appName: { en: 'Coal India Smart Governance & Compliance System', hi: 'कोल इंडिया स्मार्ट गवर्नेंस एवं अनुपालन निगरानी प्रणाली' },
  orgTag: { en: 'Ministry of Coal · Coal India Limited · Problem Statement ID: 26024', hi: 'कोयला मंत्रालय · कोल इंडिया लिमिटेड · समस्या विवरण आईडी: 26024' },
  filterMine: { en: 'Select Subsidiary / Mine', hi: 'सहायक कंपनी / खदान चुनें' },
  filterDate: { en: 'Date Range', hi: 'दिनांक सीमा' },
  filterShift: { en: 'Shift', hi: 'शिफ्ट' },
  searchPlaceholder: { en: 'Search inspections, violations, rules (CMR 153)...', hi: 'निरीक्षण, उल्लंघन, नियम खोजें...' },
  exportReport: { en: 'Export Report', hi: 'रिपोर्ट निर्यात' },
  role: { en: 'Role', hi: 'भूमिका' },
  tabOverview: { en: 'Governance Overview', hi: 'गवर्नेंस अवलोकन' },
  tabInspections: { en: 'Inspections', hi: 'निरीक्षण प्रबंधन' },
  tabCompliance: { en: 'Statutory Compliance', hi: 'वैधानिक अनुपालन' },
  tabActions: { en: 'Corrective Actions', hi: 'सुधारात्मक कार्रवाई' },
  tabSafety: { en: 'Safety Management', hi: 'सुरक्षा प्रबंधन' },
  tabEnvironment: { en: 'Environment & ESG', hi: 'पर्यावरण एवं ईएसजी' },
  tabOperations: { en: 'Operations', hi: 'संचालन प्रबंधन' },
  tabGis: { en: 'GIS & Mine Map', hi: 'जीआईएस एवं खदान मानचित्र' },
  tabAi: { en: 'AI-Assisted Insights', hi: 'एआई सहायक अंतर्दृष्टि' },
  tabReports: { en: 'Reports & Audit', hi: 'रिपोर्ट एवं ऑडिट लॉकर' },
  tabNotifications: { en: 'Notifications', hi: 'अधिसूचना केंद्र' },
  tabAdmin: { en: 'Administration', hi: 'प्रशासन एवं अनुमतियां' }
};


export type AccessLevel = "none" | "read" | "write" | "full";

export type Role =
  | "Receptionist"
  | "Nurse"
  | "Biomedical"
  | "Radiologist"
  | "HeadDoctor"
  | "Master";

export type Module = "Patient" | "Exam";

export type ExamStatus =
  | "Planned"
  | "Waiting"
  | "Started"
  | "Completed"
  | "Reported";

export interface ExamStageAccess {
  stage: ExamStatus;
  access: AccessLevel;
}

export interface Permission {
  module: Module;
  access: AccessLevel;
}

export interface RolePermissions {
  id: string;
  role: Role;
  isActive: boolean;
  permissions: Permission[];
  examStages: ExamStageAccess[];
}

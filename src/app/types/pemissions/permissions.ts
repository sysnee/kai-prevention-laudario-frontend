export type PermissionLevel = "none" | "read" | "write" | "full";

export interface Role {
  id: string;
  name: string;
  description: string;
  type: string;
  modules: {
    patient: PermissionLevel;
    exam: {
      planned: PermissionLevel;
      waiting: PermissionLevel;
      started: PermissionLevel;
      completed: PermissionLevel;
      reported: PermissionLevel;
    };
  };
  status: "active" | "inactive";
}
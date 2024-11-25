export interface WorkflowNote {
  id: string;
  text: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  mentions: string[];
}

export interface WorkflowStage {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface WorkflowTransition {
  from: string;
  to: string;
  timestamp: string;
  userId: string;
  reason?: string
}
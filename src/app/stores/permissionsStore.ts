import { getExamAccessDescription } from "../dashboard/permissions/utils/permissionUtils";
import { RolePermissions } from "../types/pemissions/permissions";

export const mockRolePermissions: RolePermissions[] = [
  {
    id: "1",
    name: "Recepcionista",
    isActive: true,
    permissions: [
      { module: "client", access: "write" },
      { module: "exam", access: "read" },
    ],
    examStages: [
      {
        stage: "planned",
        access: "write",
        description: getExamAccessDescription(
          "planned",
          "write",
          "Recepcionista"
        ),
      },
      {
        stage: "waiting",
        access: "write",
        description: getExamAccessDescription(
          "waiting",
          "write",
          "Recepcionista"
        ),
      },
      {
        stage: "started",
        access: "read",
        description: getExamAccessDescription(
          "started",
          "read",
          "Recepcionista"
        ),
      },
      {
        stage: "onhold",
        access: "read",
        description: getExamAccessDescription(
          "onhold",
          "read",
          "Recepcionista"
        ),
      },
      {
        stage: "completed",
        access: "read",
        description: getExamAccessDescription(
          "completed",
          "read",
          "Recepcionista"
        ),
      },
      {
        stage: "transcription",
        access: "none",
        description: getExamAccessDescription(
          "transcription",
          "none",
          "Recepcionista"
        ),
      },
      {
        stage: "revision",
        access: "none",
        description: getExamAccessDescription(
          "revision",
          "none",
          "Recepcionista"
        ),
      },
      {
        stage: "signed",
        access: "none",
        description: getExamAccessDescription(
          "signed",
          "none",
          "Recepcionista"
        ),
      },
    ],
  },
  {
    id: "2",
    name: "Enfermeiro",
    isActive: true,
    permissions: [
      { module: "client", access: "write" },
      { module: "exam", access: "write" },
    ],
    examStages: [
      {
        stage: "planned",
        access: "write",
        description: getExamAccessDescription("planned", "write", "Enfermeiro"),
      },
      {
        stage: "waiting",
        access: "write",
        description: getExamAccessDescription("waiting", "write", "Enfermeiro"),
      },
      {
        stage: "started",
        access: "read",
        description: getExamAccessDescription("started", "read", "Enfermeiro"),
      },
      {
        stage: "onhold",
        access: "read",
        description: getExamAccessDescription("onhold", "read", "Enfermeiro"),
      },
      {
        stage: "completed",
        access: "read",
        description: getExamAccessDescription(
          "completed",
          "read",
          "Enfermeiro"
        ),
      },
      {
        stage: "transcription",
        access: "write",
        description: getExamAccessDescription(
          "transcription",
          "write",
          "Enfermeiro"
        ),
      },
      {
        stage: "revision",
        access: "write",
        description: getExamAccessDescription(
          "revision",
          "write",
          "Enfermeiro"
        ),
      },
      {
        stage: "signed",
        access: "none",
        description: getExamAccessDescription("signed", "none", "Enfermeiro"),
      },
    ],
  },
  {
    id: "3",
    name: "Biomedico",
    isActive: true,
    permissions: [
      { module: "client", access: "read" },
      { module: "exam", access: "write" },
    ],
    examStages: [
      {
        stage: "planned",
        access: "write",
        description: getExamAccessDescription("planned", "write", "Biomedico"),
      },
      {
        stage: "waiting",
        access: "write",
        description: getExamAccessDescription("waiting", "write", "Biomedico"),
      },
      {
        stage: "started",
        access: "read",
        description: getExamAccessDescription("started", "read", "Biomedico"),
      },
      {
        stage: "onhold",
        access: "read",
        description: getExamAccessDescription("onhold", "read", "Biomedico"),
      },
      {
        stage: "completed",
        access: "read",
        description: getExamAccessDescription("completed", "read", "Biomedico"),
      },
      {
        stage: "transcription",
        access: "write",
        description: getExamAccessDescription(
          "transcription",
          "write",
          "Biomedico"
        ),
      },
      {
        stage: "revision",
        access: "write",
        description: getExamAccessDescription("revision", "write", "Biomedico"),
      },
      {
        stage: "signed",
        access: "none",
        description: getExamAccessDescription("signed", "none", "Biomedico"),
      },
    ],
  },
  {
    id: "4",
    name: "Radiologista",
    isActive: true,
    permissions: [
      { module: "client", access: "read" },
      { module: "exam", access: "write" },
    ],
    examStages: [
      {
        stage: "planned",
        access: "write",
        description: getExamAccessDescription(
          "planned",
          "write",
          "Radiologista"
        ),
      },
      {
        stage: "waiting",
        access: "write",
        description: getExamAccessDescription(
          "waiting",
          "write",
          "Radiologista"
        ),
      },
      {
        stage: "started",
        access: "read",
        description: getExamAccessDescription(
          "started",
          "read",
          "Radiologista"
        ),
      },
      {
        stage: "onhold",
        access: "read",
        description: getExamAccessDescription("onhold", "read", "Radiologista"),
      },
      {
        stage: "completed",
        access: "read",
        description: getExamAccessDescription(
          "completed",
          "read",
          "Radiologista"
        ),
      },
      {
        stage: "transcription",
        access: "write",
        description: getExamAccessDescription(
          "transcription",
          "write",
          "Radiologista"
        ),
      },
      {
        stage: "revision",
        access: "write",
        description: getExamAccessDescription(
          "revision",
          "write",
          "Radiologista"
        ),
      },
      {
        stage: "signed",
        access: "none",
        description: getExamAccessDescription("signed", "none", "Radiologista"),
      },
    ],
  },
  {
    id: "5",
    name: "HeadDoctor",
    isActive: true,
    permissions: [
      { module: "client", access: "write" },
      { module: "exam", access: "write" },
    ],
    examStages: [
      {
        stage: "planned",
        access: "write",
        description: getExamAccessDescription("planned", "write", "HeadDoctor"),
      },
      {
        stage: "waiting",
        access: "write",
        description: getExamAccessDescription("waiting", "write", "HeadDoctor"),
      },
      {
        stage: "started",
        access: "read",
        description: getExamAccessDescription("started", "read", "HeadDoctor"),
      },
      {
        stage: "onhold",
        access: "read",
        description: getExamAccessDescription("onhold", "read", "HeadDoctor"),
      },
      {
        stage: "completed",
        access: "read",
        description: getExamAccessDescription(
          "completed",
          "read",
          "HeadDoctor"
        ),
      },
      {
        stage: "transcription",
        access: "write",
        description: getExamAccessDescription(
          "transcription",
          "write",
          "HeadDoctor"
        ),
      },
      {
        stage: "revision",
        access: "write",
        description: getExamAccessDescription(
          "revision",
          "write",
          "HeadDoctor"
        ),
      },
      {
        stage: "signed",
        access: "none",
        description: getExamAccessDescription("signed", "none", "HeadDoctor"),
      },
    ],
  },
  {
    id: "6",
    name: "Master",
    isActive: true,
    permissions: [
      { module: "client", access: "full" },
      { module: "exam", access: "full" },
    ],
    examStages: [
      {
        stage: "planned",
        access: "write",
        description: getExamAccessDescription("planned", "write", "Master"),
      },
      {
        stage: "waiting",
        access: "write",
        description: getExamAccessDescription("waiting", "write", "Master"),
      },
      {
        stage: "started",
        access: "read",
        description: getExamAccessDescription("started", "read", "Master"),
      },
      {
        stage: "onhold",
        access: "read",
        description: getExamAccessDescription("onhold", "read", "Master"),
      },
      {
        stage: "completed",
        access: "read",
        description: getExamAccessDescription("completed", "read", "Master"),
      },
      {
        stage: "transcription",
        access: "write",
        description: getExamAccessDescription(
          "transcription",
          "write",
          "Master"
        ),
      },
      {
        stage: "revision",
        access: "write",
        description: getExamAccessDescription("revision", "write", "Master"),
      },
      {
        stage: "signed",
        access: "none",
        description: getExamAccessDescription("signed", "none", "Master"),
      },
    ],
  },
];

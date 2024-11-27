"use client";

import React from "react";
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";
import { Eye, PenLine, Trash2 } from "lucide-react";
import {
  AccessLevel,
  RolePermissions,
} from "../../../types/pemissions/permissions";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

interface AccessCardProps {
  role: RolePermissions;
  onView: (role: RolePermissions) => void;
  onEdit: (role: RolePermissions) => void;
  onDelete: (role: RolePermissions) => void;
}

const TRANSLATIONS = {
  stages: {
    Planned: "Planejado",
    Waiting: "Aguardando",
    Started: "Iniciado",
    Completed: "Concluído",
    Reported: "Laudado",
  },
  roles: {
    Receptionist: "Recepcionista",
    Nurse: "Enfermeiro",
    Biomedical: "Biomédico",
    Radiologist: "Radiologista",
    HeadDoctor: "Head Doctor",
    Master: "Mestre",
  },
} as const;

type StageKey = keyof typeof TRANSLATIONS.stages;

const translateStage = (stage: StageKey): string =>
  TRANSLATIONS.stages[stage] || stage;

const translateRole = (role: string): string =>
  TRANSLATIONS.roles[role as keyof typeof TRANSLATIONS.roles] || role;

const AccessChip = ({ access }: { access: AccessLevel }) => {
  const colors: Record<AccessLevel, string> = {
    none: "default",
    read: "info",
    write: "success",
    full: "error",
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Chip label={access} color={colors[access] as any} size="small" />
    </Box>
  );
};

export default function AccessCard({
  role,
  onView,
  onEdit,
  onDelete,
}: AccessCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: "white",
        border: `1px solid ${theme.palette.divider}`,
        padding: 2,
      }}
    >
      {/* Cabeçalho */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing(2),
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          {translateRole(role.name!)}
        </Typography>
        <Chip
          label={role.isActive ? "Ativo" : "Inativo"}
          size="small"
          sx={{
            backgroundColor: role.isActive
              ? theme.palette.success.light
              : theme.palette.grey[300],
            color: role.isActive
              ? theme.palette.success.dark
              : theme.palette.text.secondary,
          }}
        />
      </div>

      {/* Divisória */}
      <Divider sx={{ marginBottom: theme.spacing(2) }} />

      {/* Conteúdo Principal */}
      <CardContent sx={{ padding: 0 }}>
        <div style={{ marginBottom: theme.spacing(2) }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              marginBottom: theme.spacing(1),
            }}
          >
            Módulo de Pacientes
          </Typography>
          <AccessChip
            access={
              role.permissions.find((p) => p.module === "Patient")?.access ||
              "none"
            }
          />
        </div>

        <div>
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              marginBottom: theme.spacing(1),
            }}
          >
            Etapas do Exame
          </Typography>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: theme.spacing(1),
            }}
          >
            {role.examStages.map((stage) => (
              <Tooltip
                key={stage.stage}
                title={`${translateStage(stage.stage)}: ${stage.access}`}
                arrow
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: theme.spacing(1),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {translateStage(stage.stage)}
                  </Typography>
                  <AccessChip access={stage.access} />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Divisória */}
      <Divider
        sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
      />

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: theme.spacing(1),
        }}
      >
        <Tooltip title="Visualizar" arrow>
          <IconButton
            onClick={() => onView(role)}
            sx={{
              color: theme.palette.action.active,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            <Eye />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar" arrow>
          <IconButton
            onClick={() => onEdit(role)}
            sx={{
              color: theme.palette.action.active,
              "&:hover": { color: theme.palette.success.main },
            }}
          >
            <PenLine />
          </IconButton>
        </Tooltip>
        <Tooltip title="Excluir" arrow>
          <IconButton
            onClick={() => onDelete(role)}
            sx={{
              color: theme.palette.action.active,
              "&:hover": { color: theme.palette.error.main },
            }}
          >
            <Trash2 />
          </IconButton>
        </Tooltip>
      </div>
    </Card>
  );
}

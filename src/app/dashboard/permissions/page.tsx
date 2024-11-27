"use client";

import React, { useState } from "react";
import {
  Users,
  Settings,
  DollarSign,
  FileText,
  SearchIcon,
  ListIcon,
  GridIcon,
  PlusIcon,
  Search,
} from "lucide-react";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { Role, RolePermissions } from "../../types/pemissions/permissions";
// import { RoleModal } from "./components/RoleModal";
import AccessCard from "./components/AccessCard";
import {
  Button,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const FEATURE_ICONS = {
  patientData: Users,
  technicalData: Settings,
  financialData: DollarSign,
  audit: FileText,
  settings: Settings,
};

const initialRoles: RolePermissions[] = [
  {
    id: "1",
    role: "Receptionist",
    isActive: true,
    permissions: [
      { module: "Patient", access: "write" },
      { module: "Exam", access: "read" },
    ],
    examStages: [
      { stage: "Planned", access: "write" },
      { stage: "Waiting", access: "read" },
      { stage: "Started", access: "none" },
      { stage: "Completed", access: "none" },
      { stage: "Reported", access: "read" },
    ],
  },
  {
    id: "2",
    role: "Nurse",
    isActive: true,
    permissions: [
      { module: "Patient", access: "write" },
      { module: "Exam", access: "write" },
    ],
    examStages: [
      { stage: "Planned", access: "read" },
      { stage: "Waiting", access: "write" },
      { stage: "Started", access: "write" },
      { stage: "Completed", access: "read" },
      { stage: "Reported", access: "read" },
    ],
  },
  {
    id: "3",
    role: "Biomedical",
    isActive: true,
    permissions: [
      { module: "Patient", access: "read" },
      { module: "Exam", access: "write" },
    ],
    examStages: [
      { stage: "Planned", access: "read" },
      { stage: "Waiting", access: "read" },
      { stage: "Started", access: "write" },
      { stage: "Completed", access: "write" },
      { stage: "Reported", access: "read" },
    ],
  },
  {
    id: "4",
    role: "Radiologist",
    isActive: true,
    permissions: [
      { module: "Patient", access: "read" },
      { module: "Exam", access: "write" },
    ],
    examStages: [
      { stage: "Planned", access: "read" },
      { stage: "Waiting", access: "read" },
      { stage: "Started", access: "read" },
      { stage: "Completed", access: "write" },
      { stage: "Reported", access: "write" },
    ],
  },
  {
    id: "5",
    role: "HeadDoctor",
    isActive: true,
    permissions: [
      { module: "Patient", access: "write" },
      { module: "Exam", access: "write" },
    ],
    examStages: [
      { stage: "Planned", access: "write" },
      { stage: "Waiting", access: "write" },
      { stage: "Started", access: "write" },
      { stage: "Completed", access: "write" },
      { stage: "Reported", access: "write" },
    ],
  },
  {
    id: "6",
    role: "Master",
    isActive: true,
    permissions: [
      { module: "Patient", access: "full" },
      { module: "Exam", access: "full" },
    ],
    examStages: [
      { stage: "Planned", access: "full" },
      { stage: "Waiting", access: "full" },
      { stage: "Started", access: "full" },
      { stage: "Completed", access: "full" },
      { stage: "Reported", access: "full" },
    ],
  },
];

export default function PermissionsManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = initialRoles.filter((role) =>
    role.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    mode: "grid" | "list"
  ) => {
    if (mode) setViewMode(mode);
  };

  return (
    <Box sx={{ padding: 3, width: "100%", boxSizing: "border-box" }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", marginBottom: 3 }}
      >
        Gerenciamento de Permissões
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          marginBottom: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Campo de Busca */}
        <TextField
          variant="outlined"
          placeholder="Buscar perfis..."
          size="medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: <Search size={18} style={{ marginRight: 8 }} />,
            },
          }}
        />
        {/* Botão Novo Perfil */}
        <Button variant="contained" color="primary" startIcon={<PlusIcon />}>
          Novo Perfil
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          width: "100%",
        }}
      >
        {filteredRoles.map((role) => (
          <AccessCard
            key={role.id}
            role={role}
            onView={() => console.log("Ver perfil")}
            onEdit={() => console.log("Editar perfil")}
            onDelete={() => console.log("Excluir perfil")}
          />
        ))}
      </Box>
    </Box>
  );
}

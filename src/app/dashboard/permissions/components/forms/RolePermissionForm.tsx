"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  Button,
  Box,
  Typography,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ExamStagePermissions from "./ExamStagePermissions";
import {
  AccessLevel,
  Role,
  RolePermissions,
} from "@/src/app/types/pemissions/permissions";

interface RolePermissionFormProps {
  open: boolean;
  onClose: () => void;
  rolePermissions: RolePermissions | null;
  mode: "create" | "edit" | "view";
  onSave?: (role: RolePermissions) => void;
}

export default function RolePermissionForm({
  open,
  onClose,
  rolePermissions,
  mode,
  onSave,
}: RolePermissionFormProps) {
  const [formData, setFormData] = useState<RolePermissions>(() => {
    return (
      rolePermissions || {
        id: crypto.randomUUID(),
        name: undefined,
        isActive: true,
        permissions: [
          { module: "client", access: "none" },
          { module: "exam", access: "none" },
        ],
        examStages: [

        ]
      }
    );
  });

  useEffect(() => {
    if (rolePermissions) {
      setFormData(rolePermissions);
    }
  }, [rolePermissions]);

  const isViewMode = mode === "view";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
    onClose();
  };

  // Atualiza o valor de acesso para o módulo de pacientes
  const handlePatientAccessChange = (access: AccessLevel) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.map((permission) =>
        permission.module === "client" ? { ...permission, access } : permission
      ),
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box className="flex justify-between items-center">
            <Typography variant="h6">
              {mode === "create"
                ? "Criar nova permissão"
                : mode === "edit"
                  ? "Editar permissão"
                  : "Visualizar permissão"}
            </Typography>
            <Box className="flex items-center gap-2">
              <Chip
                label={formData.isActive ? "Ativo" : "Inativo"}
                color={formData.isActive ? "success" : "default"}
                size="small"
              />
              <Switch
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                disabled={isViewMode}
                size="small"
              />
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box className="space-y-6 py-4">
            <Box className="space-y-4">
              <TextField
                label="Nome do perfil"
                fullWidth
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value as Role,
                  }))
                }
                disabled={isViewMode}
              />
            </Box>

            <Divider />

            <Box className="space-y-4">
              <Typography variant="subtitle1" className="font-semibold">
                Módulo de Clientes
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Nível de acesso</InputLabel>
                <Select
                  value={
                    formData.permissions.find((p) => p.module === "client")
                      ?.access || "none"
                  }
                  label="Nível de Acesso"
                  onChange={(e) =>
                    handlePatientAccessChange(e.target.value as AccessLevel)
                  }
                  disabled={isViewMode}
                >
                  <MenuItem value="none">Nenhum</MenuItem>
                  <MenuItem value="read">Visualizar</MenuItem>
                  <MenuItem value="write">Modificar</MenuItem>
                  <MenuItem value="full">Completo</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Divider />

            <Box className="space-y-4">
              <Typography variant="subtitle1" className="font-semibold">
                Módulo de Exames
              </Typography>
              <ExamStagePermissions
                stages={formData.examStages}
                onChange={(newStages) =>
                  setFormData((prev) => ({ ...prev, examStages: newStages }))
                }
                disabled={isViewMode}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            {isViewMode ? "Fechar" : "Cancelar"}
          </Button>
          {!isViewMode && (
            <Button type="submit" variant="contained" color="primary">
              {mode === "create" ? "Criar" : "Salvar"}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

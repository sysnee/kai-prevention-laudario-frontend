"use client";

import React, { useState } from "react";
import { ListIcon, PlusIcon, Search, Grid } from "lucide-react";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { RolePermissions } from "../../types/pemissions/permissions";
import AccessCard from "./components/AccessCard";
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PermissionsList from "./components/PermissionsList";
import { mockRolePermissions } from "../../stores/permissionsStore";
import RolePermissionForm from "./components/forms/RolePermissionForm";

export default function PermissionsManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [rolesPermissions, setRolesPermissions] =
    useState<RolePermissions[]>(mockRolePermissions);
  const [selectedRolePermissions, setSelectedRolePermissions] =
    useState<RolePermissions | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view" | null>(
    null
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rolePermissionToDelete, setRoleToDelete] =
    useState<RolePermissions | null>(null);

  const filteredRolesPermissions = rolesPermissions.filter((role) =>
    role.name!.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (updatedRolePermission: RolePermissions) => {
    if (modalMode === "create") {
      setRolesPermissions((prev) => [
        ...prev,
        { ...updatedRolePermission, id: crypto.randomUUID() },
      ]);
    } else {
      setRolesPermissions((prev) =>
        prev.map((rolePermission) =>
          rolePermission.id === updatedRolePermission.id
            ? updatedRolePermission
            : rolePermission
        )
      );
    }
    setModalMode(null);
    setSelectedRolePermissions(null);
  };

  const handleDeleteConfirm = () => {
    if (rolePermissionToDelete) {
      setRolesPermissions(
        rolesPermissions.filter(
          (rolesPermissions) =>
            rolesPermissions.id !== rolePermissionToDelete.id
        )
      );
      setDeleteModalOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    mode: "grid" | "list"
  ) => {
    if (mode) setViewMode(mode);
  };

  const handleView = (role: RolePermissions) => {
    setSelectedRolePermissions(role);
    setModalMode("view");
  };

  const handleEdit = (role: RolePermissions) => {
    setSelectedRolePermissions(role);
    setModalMode("edit");
  };

  const handleDeleteClick = (rolePermission: RolePermissions) => {
    setRoleToDelete(rolePermission);
    setDeleteModalOpen(true);
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            size="small"
          >
            <ToggleButton value="list">
              <ListIcon size={20} />
            </ToggleButton>
            <ToggleButton value="grid">
              <Grid size={20} />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedRolePermissions(null);
              setModalMode("create");
            }}
            startIcon={<PlusIcon />}
          >
            Novo Perfil
          </Button>
        </Box>
      </Box>

      {viewMode == "list" ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <PermissionsList
            rolesPermissions={filteredRolesPermissions}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            width: "100%",
          }}
        >
          {filteredRolesPermissions.map((role) => (
            <AccessCard
              key={role.id}
              rolePermission={role}
              onEdit={() => {
                handleEdit(role);
              }}
              onView={() => {
                handleView(role);
              }}
              onDelete={() => handleDeleteClick(role)}
            />
          ))}
        </Box>
      )}

      {modalMode && (
        <RolePermissionForm
          open={!!modalMode}
          onClose={() => {
            setModalMode(null);
            setSelectedRolePermissions(null);
          }}
          rolePermissions={selectedRolePermissions}
          mode={modalMode}
          onSave={handleSave}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setRoleToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        roleName={rolePermissionToDelete?.name || ""}
      />
    </Box>
  );
}

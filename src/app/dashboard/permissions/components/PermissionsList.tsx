"use client";

import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { RolePermissions } from "../../../types/pemissions/permissions";
import AccessChip from "./AccessChip";
import StagePermissions from "./StagePermissions";
import ActionButtons from "./ActionButtons";
import StatusChip from "./StatusChip";
import { useTheme } from "@mui/system";

interface PermissionsListProps {
  rolesPermissions: RolePermissions[];
  onView: (role: RolePermissions) => void;
  onEdit: (role: RolePermissions) => void;
  onDelete: (role: RolePermissions) => void;
}

export default function PermissionsList({
  rolesPermissions,
  onView,
  onEdit,
  onDelete,
}: PermissionsListProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const theme = useTheme();

  const handleToggle = (role: string) => {
    setExpandedItems((prev) =>
      prev.includes(role)
        ? prev.filter((item) => item !== role)
        : [...prev, role]
    );
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {rolesPermissions.map((role, index) => (
        <div key={role.name}>
          <ListItem
            className="hover:bg-gray-50"
            secondaryAction={
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <ActionButtons
                  onView={() => onView(role)}
                  onEdit={() => onEdit(role)}
                  onDelete={() => onDelete(role)}
                />
                <IconButton
                  edge="end"
                  onClick={() => handleToggle(role.name!)}
                  size="small"
                >
                  {expandedItems.includes(role.name!) ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography component="span" sx={{ fontWeight: "bold" }}>
                    {role.name!}
                  </Typography>
                  <StatusChip isActive={role.isActive} />
                </Box>
              }
              secondary={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    marginTop: 1,
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "0.875rem",
                      color: "rgba(0,0,0,0.6)",
                      fontWeight: 500,
                    }}
                  >
                    Patient Access:
                  </Typography>
                  <Box>
                    <AccessChip
                      access={
                        role.permissions.find((p) => p.module === "Patient")
                          ?.access || "none"
                      }
                    />
                  </Box>
                </Box>
              }
            />
          </ListItem>
          <Collapse
            in={expandedItems.includes(role.name!)}
            timeout="auto"
            unmountOnExit
          >
            <Box
              sx={{
                padding: "16px",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "8px",
                margin: "8px 16px",
              }}
            >
              <StagePermissions stages={role.examStages} />
            </Box>
          </Collapse>
          {index < rolesPermissions.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
}

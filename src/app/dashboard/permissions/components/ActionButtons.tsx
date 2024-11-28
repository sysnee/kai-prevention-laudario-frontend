"use client";

import { IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/system";
import { Eye, PenLine, Trash2 } from "lucide-react";

interface ActionButtonsProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
  size = "small",
}: ActionButtonsProps & { size?: "small" | "medium" | "large" }) {
  const theme = useTheme();
  return (
    <div className="flex gap-1">
      <Tooltip title="View">
        <IconButton
          sx={{
            color: theme.palette.action.active,
            "&:hover": { color: theme.palette.primary.main },
          }}
          size={size}
          onClick={onView}
        >
          <Eye size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton
          sx={{
            color: theme.palette.action.active,
            "&:hover": { color: theme.palette.success.main },
          }}
          size={size}
          onClick={onEdit}
        >
          <PenLine size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          sx={{
            color: theme.palette.action.active,
            "&:hover": { color: theme.palette.error.main },
          }}
          size={size}
          color="error"
          onClick={onDelete}
        >
          <Trash2 size={18} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

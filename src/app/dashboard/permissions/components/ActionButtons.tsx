"use client";

import { IconButton, Tooltip } from "@mui/material";
import { Eye, PenLine, Trash2 } from "lucide-react";
import { useTheme } from "@mui/system";

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
          className="bg-kai-primary hover:bg-kai-primary/70"
          size={size}
          onClick={onView}
        >
          <Eye size={18} style={{
            color: theme.palette.mode === 'light' ? '#fff' : '#000'
          }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton
          className="bg-kai-primary hover:bg-kai-primary/70"
          size={size}
          onClick={onEdit}
        >
          <PenLine size={18} style={{
            color: theme.palette.mode === 'light' ? '#fff' : '#000'
          }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          className="bg-kai-primary hover:bg-kai-primary/70"
          size={size}
          onClick={onDelete}
        >
          <Trash2 size={18} style={{
            color: theme.palette.mode === 'light' ? '#fff' : '#000'
          }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

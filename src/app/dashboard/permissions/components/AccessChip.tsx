"use client";

import { Chip } from "@mui/material";
import { AccessLevel } from "../../../types/pemissions/permissions";
import { Box } from "@mui/system";

interface AccessChipProps {
  access: AccessLevel;
  description?: string;
}

export default function AccessChip({ access, description }: AccessChipProps) {
  const colors: Record<AccessLevel, string> = {
    none: "default",
    read: "info",
    write: "success",
    full: "error",
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Chip label={description ? description : access} color={colors[access] as any} size="small" />
    </Box>
  );
}

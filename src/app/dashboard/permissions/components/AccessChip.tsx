"use client";

import { Chip } from "@mui/material";
import { AccessLevel } from "../../../types/pemissions/permissions";
import { Box } from "@mui/system";

interface AccessChipProps {
  access: AccessLevel;
}

export default function AccessChip({ access }: AccessChipProps) {
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
}

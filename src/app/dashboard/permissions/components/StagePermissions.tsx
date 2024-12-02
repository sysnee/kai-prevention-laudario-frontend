"use client";

import { Box, Typography, useTheme } from "@mui/material";
import {
  ExamStageAccess,
  ExamStatusEnum,
} from "../../../types/pemissions/permissions";
import AccessChip from "./AccessChip";

interface StagePermissionsProps {
  stages: ExamStageAccess[];
}

export default function StagePermissions({ stages }: StagePermissionsProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "bold",
          color: theme.palette.text.primary,
          marginBottom: 2,
        }}
      >
        Permissões por fase do exame
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1.5,
        }}
      >
        {stages.map((stage) => (
          <Box
            key={stage.stage}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              backgroundColor: isDarkMode
                ? theme.palette.background.paper
                : "white",
              borderRadius: "8px",
              boxShadow: isDarkMode
                ? "0 1px 3px rgba(255, 255, 255, 0.1)"
                : "0 1px 3px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"
              }`,
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "0.875rem",
                color: isDarkMode
                  ? theme.palette.text.secondary
                  : "rgba(0, 0, 0, 0.87)",
                textTransform: "capitalize",
              }}
            >
              {
                ExamStatusEnum[
                  stage.stage.toUpperCase() as keyof typeof ExamStatusEnum
                ]
              }
            </Typography>
            <AccessChip access={stage.access} description={stage.description} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

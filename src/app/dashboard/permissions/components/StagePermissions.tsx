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

  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "bold",
          color: theme.palette.mode === "dark"
            ? theme.palette.text.primary
            : "rgba(0, 0, 0, 0.87)",
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
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "0.875rem",
                color: "rgba(0, 0, 0, 0.87)",
                textTransform: "capitalize",
              }}
            >
              {
                ExamStatusEnum[
                  stage.stage.toUpperCase() as keyof typeof ExamStatusEnum
                ]
              }
            </Typography>
            <AccessChip
              access={stage.access}
              description={stage.description}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

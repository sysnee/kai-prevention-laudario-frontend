"use client";

import { Box, Typography } from "@mui/material";
import { ExamStageAccess } from "../../../types/pemissions/permissions";
import AccessChip from "./AccessChip";

interface StagePermissionsProps {
  stages: ExamStageAccess[];
}

export default function StagePermissions({ stages }: StagePermissionsProps) {
  return (
    <Box>
      <Typography variant="subtitle2" className="text-gray-900 mb-2">
        Exam Stage Permissions
      </Typography>
      <Box className="grid grid-cols-2 gap-3">
        {stages.map((stage) => (
          <Box
            key={stage.stage}
            className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm"
          >
            <Typography component="span" className="text-sm text-gray-600">
              {stage.stage}
            </Typography>
            <AccessChip access={stage.access} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

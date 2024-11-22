"use client";

import * as React from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { columns, generateRows } from "../internals/data/estudoGridData";
import db from "../../../db.json";

export default function LaudarioGrid() {
  const [rows, setRows] = React.useState<GridRowsProp>([]);

  React.useEffect(() => {
    const estudos = generateRows(db.estudos);
    setRows(estudos);
  }, []);

  const labelDisplayedRows = ({ from, to, count }: any) => {
    return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`;
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        disableRowSelectionOnClick
        slotProps={{
          cell: {
            style: {
              padding: 0,
            },
          },
        }}
        localeText={{
          MuiTablePagination: {
            labelDisplayedRows, 
            labelRowsPerPage: "Linhas por página",
          },
        }}
      />
    </Box>
  );
}

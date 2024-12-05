"use client";

import * as React from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { generateRows } from "../../internals/data/clientsGridData";
import { colum } from "../../internals/data/clientsGridData";

interface ClientsGridProps {
    clientes: any[];
    searchQuery: string;
    onView: (cliente: any) => void;
    onEdit: (cliente: any) => void;
    onDelete: (cliente: any) => void;
}

export default function ClientsGrid({ clientes, searchQuery, onView, onEdit, onDelete }: ClientsGridProps) {
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [filteredRows, setFilteredRows] = React.useState<GridRowsProp>([]);

    React.useEffect(() => {
        function fetchData() {
            const clientesRows = generateRows(clientes);
            setRows(clientesRows);
            setFilteredRows(clientesRows);
        };

        fetchData();
    }, []);

    React.useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = rows.filter(
            (row) =>
                row.name.toLowerCase().includes(lowerCaseQuery) ||
                row.cpf.toLowerCase().includes(lowerCaseQuery) ||
                row.email.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredRows(filtered);
    }, [searchQuery, rows]);


    const labelDisplayedRows = ({ from, to, count }: any) => {
        return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`;
    };

    return (
        <Box sx={{ height: "100%", width: "100%", paddingBottom: "2em" }}>
            <DataGrid
                rows={filteredRows}
                columns={colum(onView, onEdit, onDelete)} 
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
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

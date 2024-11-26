'use client'

import { Box } from "@mui/system";
import CustomizedDataGrid from "../components/CustomizedDataGrid";
import { Button, Typography } from "@mui/material";

export default function UsuariosPage() {
    return (
        <Box
            sx={{
                padding: "1.8em",
                height: "100vh",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1em",
                    backgroundColor: "background.paper",
                }}
            >
                <Typography variant="h5">Usuários</Typography>
                <Button variant="contained" color="primary">
                    Novo Usuário
                </Button>
            </Box>
            <Box sx={{ padding: "1em" }}>
                <CustomizedDataGrid />
            </Box>
        </Box>
    );
}

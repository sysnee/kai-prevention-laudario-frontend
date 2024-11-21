"use client";

import { useEffect, useState } from "react";
import EstudoComponent from "../../components/Estudo";
import { Pagination, Box, Skeleton } from "@mui/material";
import db from '../../../../db.json'
import { Estudo } from "../../types/types";

export default function Laudario() {
    const [estudos, setEstudos] = useState<Estudo[]>([]);
    const [loading, setLoading] = useState(true);

    async function getEstudos() {
        try {
            // const estudosData = await axios.get("http://localhost:5000/dashboard/estudos");
            const estudosData = db.estudos
            setEstudos(estudosData);
        } catch (error) {
            console.error("Erro ao buscar os estudos:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getEstudos();
    }, []);

    return (
        <>
            <Box
                sx={{
                    padding: "1.8em",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                    }}
                >
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                sx={{ height: 100, borderRadius: "8px" }}
                            />
                        ))
                    ) : (
                        estudos.length > 0 ? (
                            estudos.map(estudo => (
                                <EstudoComponent key={estudo.id} estudo={estudo} />
                            ))
                        ) : (
                            <h2 className="text-black text-lg">Nenhum estudo encontrado.</h2>
                        )
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2em",
                    }}
                >
                    {estudos.length > 0 && (
                        <Pagination
                            count={10}
                            color="primary"
                            // variant="outlined"
                            size="small"
                        />
                    )}
                </Box>
            </Box>
        </>
    );
}

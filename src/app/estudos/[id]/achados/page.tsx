"use client";

import { useState } from "react"
import db from "../../../../../db.json"
import { Box, Button, Checkbox, FormControlLabel, Grid2 as Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Check, KeyboardArrowLeft } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import AchadoCard from "@/src/app/components/AchadoCard";
import AchadoForm from "@/src/app/components/AchadoForm";
import { Achado } from "@/src/app/types/types";


export default function AchadosPage() {

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isExamNormalChecked, setIsExamNormalChecked] = useState(false)
    const [achados, setAchados] = useState<Achado[]>([]);

    function handleAddAchado(achado: Omit<Achado, "id" | "titulo" | "laudoId" | "imageId">) {
        const novoAchado = {
            ...achado,
            id: "1",
            titulo: "Achado 1",
            laudoId: "1",
            imageId: "1",
        }

        setAchados([...achados, novoAchado]);
        setIsFormVisible(false);
    };

    return (
        <Box
            sx={{
                padding: "1.8em",
                height: "100vh",
                width: "100%"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5em"
                }}
            >
                <Link href={`/`}>
                    <Button
                        sx={(theme) => ({
                            backgroundColor: theme.palette.mode === 'light' ? "#f9fafb" : "#0b0e14",
                            border: theme.palette.mode === 'light' ? "1px solid #dadee7" : "1px solid #333b4d",
                        })}
                    >
                        <KeyboardArrowLeft
                            sx={(theme) => ({
                                color: theme.palette.mode === 'light' ? "#0b0e14" : "#fff"
                            })}
                        />
                    </Button>
                </Link>

                <Box
                    component="h2"
                    sx={(theme) => ({
                        color: theme.palette.text.primary,
                        fontSize: "22px"
                    })}
                >
                    Img {db.achados[0].imagemId}
                </Box>
            </Box>

            <Box
                sx={{
                    marginTop: "1em"
                }}
            >
                <Grid
                    container
                    spacing={2}
                    marginTop={1}
                    wrap="wrap"
                    alignItems="flex-start"
                >
                    <Grid
                        size={{ xs: 12, md: 5 }}
                    >
                        <Box>
                            <Box
                                component="img"
                                src={db.estudos[0].imagens[0].link}
                                alt="raio-x"
                                sx={{
                                    width: "100%",
                                    height: "auto"
                                }}
                                className="rounded-lg cursor-pointer border"
                            />
                        </Box>
                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 7 }}
                        padding={2}
                        sx={(theme) => ({
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: theme.palette.mode === 'light' ? "#f5f6fa" : "transparent",
                            borderRadius: "5px",
                            border: theme.palette.mode === 'light' ? "none" : "1px solid grey"
                        })}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <FormControlLabel
                                sx={(theme) => ({
                                    color: theme.palette.mode === 'light' ? "#0b0e14" : "#fff",
                                    display: "flex",
                                    justifyContent: "start"
                                })}
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={isExamNormalChecked}
                                        onChange={() => {
                                            setIsExamNormalChecked(!isExamNormalChecked)
                                            if (!isExamNormalChecked) {
                                                setAchados([])
                                                setIsFormVisible(false)
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <Box
                                        sx={(theme) => ({
                                            color: theme.palette.text.primary,
                                            fontSize: "12px"
                                        })}
                                    >
                                        Exame normal
                                    </Box>
                                }
                            />


                            {isExamNormalChecked ? (
                                <Button
                                    sx={(theme) => ({
                                        color: theme.palette.text.primary,
                                        fontSize: "12px",
                                        border: "1px solid #333b4d"
                                    })}
                                >
                                    <Check sx={{ fontSize: "17px", marginRight: ".2em" }} />
                                    Concluir
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsFormVisible(true)}
                                    sx={(theme) => ({
                                        color: theme.palette.text.primary,
                                        fontSize: "12px",
                                        border: "1px solid #333b4d"
                                    })}
                                >
                                    <AddIcon sx={{ fontSize: "18px" }} />
                                    Adicionar achado
                                </Button>
                            )}
                        </Box>

                        <Box
                            sx={{
                                width: "100%"
                            }}
                        >
                            <Stack
                                spacing={2}
                                marginTop={2}
                            >
                                {achados.length > 0 ? (achados.map(achado => (
                                    <AchadoCard achado={achado} />
                                ))) : (
                                    <Typography
                                        sx={{
                                            fontSize: "13px"
                                        }}
                                    >
                                        Não foram encontrados achados.
                                    </Typography>
                                )}
                            </Stack>
                        </Box>

                        {isFormVisible && (
                            <Box
                                sx={{
                                    width: "100%",
                                    marginTop: "2em"
                                }}
                            >
                                <AchadoForm
                                    onCancel={() => setIsFormVisible(false)}
                                    onSubmit={handleAddAchado}
                                />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
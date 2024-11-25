"use client";

import { Box, Button, Grid2 as Grid } from "@mui/material"
import { KeyboardArrowLeft } from "@mui/icons-material"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import ImageEstudo from "../../../components/ImageEstudo";
import Link from "next/link";
import db from '../../../../../db.json'
import { Estudo, Imagem } from "../../../types/types";

export default function EstudoDetailPage() {
    const { id } = useParams()

    const [estudo, setEstudo] = useState<Estudo | null>(null)
    const [selectedImages, setSelectedImages] = useState<Imagem[]>([])

    async function getEstudo() {
        try {
            const estudoData = db.estudos.find(estudo => Number(estudo.id) === parseInt(String(id)))

            if (!estudoData) {
                throw new Error("Estudo não encontrado");
            }

            // Filtrando imagens do estudo
            // const images = db.imagens.filter(imagem => imagem.estudoId === estudoData.id)
            setEstudo(estudoData)
        } catch (error) {
            console.log("Erro ao buscar estudo: ", error)
        }
    }


    function handleImageSelection(imagem: Imagem, isSelected: boolean) {
        if (isSelected) {
            setSelectedImages(prev => [...prev, imagem])
        } else {
            setSelectedImages(prev => prev.filter(img => img.id !== imagem.id));
        }
    }

    useEffect(() => {
        getEstudo();
    }, [])

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
                        fontSize: '26px',
                        color: theme.palette.text.primary,
                    })}
                >
                    Estudo: ID: {id}
                </Box>
            </Box>

            <Box
                sx={{
                    marginTop: "3em"
                }}
            >
                {estudo && (
                    estudo.imagens.length > 0 ? (
                        <Box
                            component="h2"
                            sx={(theme) => ({
                                fontSize: "16px",
                                color: theme.palette.text.primary
                            })}
                        >
                            Escolha as imagens para adicionar seus achados
                        </Box>
                    ) : (
                        <Box
                            component="h2"
                            sx={(theme) => ({
                                fontSize: "16px",
                                color: theme.palette.text.primary
                            })}
                        >
                            Nenhuma imagem encontrada.
                        </Box>
                    )
                )}
                <Grid
                    container
                    spacing={1.5}
                    justifyContent="start"
                    marginTop={1}
                    wrap="wrap"
                >
                    {estudo && (
                        estudo.imagens.length > 0 && (
                            estudo?.imagens.map(imagem => (
                                <Grid
                                    key={imagem.id}
                                    size={{ xs: 3, sm: 2, md: 1.5, lg: 1 }}
                                // xs={3}
                                // sm={2}
                                // md={1.5}
                                // lg={1}
                                >
                                    <ImageEstudo
                                        imagem={imagem}
                                        onSelect={handleImageSelection}
                                        width={400}
                                        height={450}
                                    />
                                </Grid>
                            ))
                        )
                    )}
                </Grid>
            </Box>

            {selectedImages.length > 0 && (
                <Box
                    sx={(theme) => ({
                        marginTop: "3em",
                        backgroundColor: theme.palette.mode === 'light' ? "#f5f6fa" : "#0c1017",
                        padding: "2em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        gap: "1em",
                        borderRadius: "10px",
                        boxShadow: "2px 2px 4px rgb(0, 0, 0, 0.1)"
                    })}
                >
                    <Button
                        sx={(theme) => ({
                            backgroundColor: "transparent",
                            border: theme.palette.mode === 'light' ? "1px solid grey" : "1px solid #333b4d",
                            color: theme.palette.mode === 'light' ? "#0b0e14" : "#fff"
                        })}
                    >
                        Cancelar
                    </Button>

                    <Button
                        sx={(theme) => ({
                            backgroundColor: "transparent",
                            border: theme.palette.mode === 'light' ? "1px solid grey" : "1px solid #333b4d",
                            color: theme.palette.mode === 'light' ? "#0b0e14" : "#fff"
                        })}
                    >
                        Salvar e avançar
                    </Button>
                </Box>
            )}
        </Box>
    )
}
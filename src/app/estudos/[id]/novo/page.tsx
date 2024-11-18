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
                        sx={{
                            backgroundColor: "#584e46", 
                            "&:hover": {
                                backgroundColor: "#3e3228", 
                            },
                        }}
                    >
                        <KeyboardArrowLeft
                            sx={{
                                color: "#ff8046"
                            }}
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
                    sx={{
                        marginTop: "3em",
                        backgroundColor: "#f0f0f0",
                        padding: "2em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        gap: "1em",
                        borderRadius: "10px",
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: "transparent",
                            border: "1px solid #584e46",
                            color: "#584e46 !important",
                            "&:hover": {
                                backgroundColor: "#d3d3d3",
                            },
                        }}
                        >
                        Cancelar
                    </Button>
                    
                    <Button
                        sx={{
                            backgroundColor: "#584e46",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#3e3228",
                            },
                        }}
                    >
                        Salvar e avançar
                    </Button>
                </Box>
            )}
        </Box>
    )
}
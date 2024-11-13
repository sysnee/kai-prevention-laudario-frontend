"use client";

import { Box, Button, Grid } from "@mui/joy"
import BaseLayout from "../../components/BaseLayout"
import { Height, KeyboardArrowLeft } from "@mui/icons-material"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import axios from "axios";
import ImageEstudo from "../../components/ImageEstudo";
import Link from "next/link";
import db from '../../../../db.json'

export default function EstudoDetailPage(){
    const { id } = useParams()

    const [estudo, setEstudo] = useState<Estudo | null>(null)
    const [selectedImages, setSelectedImages] = useState<Imagem[]>([])

    async function getEstudo() {
        try {
            const estudoData = db.estudos.find(estudo => Number(estudo.id) === parseInt(String(id)))

            if(!estudoData) {
                throw new Error("Estudo não encontrado");
            }

            // Filtrando imagens do estudo
            // const images = db.imagens.filter(imagem => imagem.estudoId === estudoData.id)
            setEstudo(estudoData)
        } catch(error) {
            console.log("Erro ao buscar estudo: ", error)
        }
    }


    function handleImageSelection(imagem: Imagem, isSelected: boolean){
        if(isSelected){
            setSelectedImages(prev => [...prev, imagem])
        }else{
            setSelectedImages(prev => prev.filter(img => img.id !== imagem.id)); 
        }
    }

    useEffect(() => {
        getEstudo();
    }, [])

    return(
        <BaseLayout>
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
                    <Link
                        href={`/`}
                    >
                        <Button
                            size="sm"
                            sx={{
                                backgroundColor: "#584e46",
                                "&:hover": {
                                    backgroundColor: "#4b4037"
                                }
                            }}
                        >
                            <KeyboardArrowLeft
                                sx={{
                                    color: "#ff8046",
                                }}
                            />
                        </Button>
                    </Link>

                    <h2 className="text-2xl text-black">Estudo: ID: {id}</h2>
                </Box>
                
                <Box
                    sx={{
                        marginTop: "3em"
                    }}
                >
                    {estudo && (
                        estudo.imagens.length > 0 ? (
                            <h2 className="text-black">Escolha as imagens para adcionar seus achados</h2>
                        ): (
                            <h2 className="text-black">Nenhuma imagem encontrada.</h2>
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
                                        xs={3}
                                        sm={2}
                                        md={1.5}
                                        lg={1}
                                    >
                                        <ImageEstudo 
                                            imagem={imagem}
                                            onSelect={handleImageSelection}
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
                            backgroundColor: "#fff",
                            padding: "2em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            gap: "1em",
                            borderRadius: "10px",
                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <Button
                            sx={{
                                backgroundColor: "#fff",
                                color: "#584e46",
                                border: "1px solid #584e46",
                                fontSize: "13px",
                                "&:hover": {
                                    backgroundColor: "#f2f2f2"
                                } 
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: "#584e46",
                                "&:hover": {
                                    backgroundColor: "#4b4037"
                                },
                                fontSize: "13px" 
                            }}
                        >
                            Salvar e avançar
                            </Button>
                    </Box>
                )}
            </Box>
        </BaseLayout>
    )
}
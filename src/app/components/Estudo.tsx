"use client";

import { Avatar, Box, Button, Grid } from "@mui/joy";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Estudo({estudo}: {estudo: Estudo}){
    const [laudo, setlaudo] = useState<Laudo | null>(null)

    async function getLaudo(){
        try{
            const laudoData = await axios.get(`http://localhost:5000/laudos/${estudo.laudoId}`)
            setlaudo(laudoData.data)
        } catch(error){
            console.log("Erro ao buscar laudo: ", error)
        }
    }

    useEffect(() => {
        getLaudo();
    }, [])

    return(
        <Grid
            container
            alignItems="center"
            wrap="nowrap"
            sx={{
                backgroundColor: "white",
                borderRadius: ".5em",
                padding: ".3em",
                fontSize: {
                    xs: '10px', 
                    sm: '12px', 
                    md: '15px',     
                    lg: '18px',  
                },
                overflowX: "auto"
            }}
        >
            <Grid 
                xs={2}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: ".2em",
                    minWidth: "100px"
                }}
            >
                <p className="font-bold text-black">{estudo.nome}</p>
            </Grid>

            <Grid 
                xs={6}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: ".2em",
                    padding: "1.3em",
                    borderLeft: "1px solid #ff8046",
                    minWidth: "260px"
                }}
            >
                {estudo.imagens.slice(0, 4).map((imagem, index) => (
                    index < 3 ? (
                        <Image
                            key={index}
                            src={imagem}
                            alt="raio-x"
                            width={50}
                            height={50}
                            className="rounded-md"
                        />
                    ) : (
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Image
                                key={index}
                                src={imagem}
                                alt="raio-x"
                                width={50}
                                height={50}
                                className="rounded-md"
                            />

                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: 50,
                                    height: 46,
                                    backgroundColor: "rgb(0, 0, 0, 0.5)",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: "16px"
                                }}
                            >
                                +{estudo.imagens.length - 3}
                            </Box>
                        </Box>
                    )
                ))}    
            
            </Grid>

            <Grid 
                xs={2}
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    minWidth: "150px",
                }}
            >
                <Box 
                    sx={{
                        textWrap: "nowrap",
                        fontSize: {
                            xs: '7px', 
                            sm: '9px', 
                            md: '11px',     
                            lg: '13px',  
                        },
           
                        display: "flex",
                        alignItems: "center",
                        gap: "1em",
                    }}
                >   

                    <Avatar 
                        src={laudo?.medico.avatar}
                        size="sm" 
                    />
                        <Box
                            sx={{
                                color: "black",
                                fontSize: "11px"
                            }}
                        >   
                            {laudo ? (
                                <>
                                    <span className="font-bold">Laudado por</span>
                                    <p>{laudo?.medico.nome}</p>
                                </>
                            ): (
                                <>
                                    <span className="font-bold">Status</span>
                                    <p>Pendente</p>
                                </>
                            )}
                        </Box> 

                </Box>
            </Grid>

            <Grid 
                xs={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "140px",
                    padding: "0 1.2em"
                }}
            >
                {laudo ? (
                    <Button
                        sx={{
                            width: "100%",
                            fontSize: "12px",
                            backgroundColor: "#00b875",
                            "&:hover": {
                            backgroundColor: "#008e62"
                        }
                        }}
                    >
                        Editar laudo
                    </Button>
                ): (
                    <Button
                    sx={{
                        width: "100%",
                        fontSize: "12px",
                        backgroundColor: "#584e46",
                        "&:hover": {
                            backgroundColor: "#4b4037"
                        }
                    }}
                    >
                        Laudar
                    </Button>
                )}
            </Grid>
        </Grid>
    )
}
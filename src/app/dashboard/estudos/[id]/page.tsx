"use client";

import { Avatar, Box, Button, Grid2 as Grid, Stack } from "@mui/material"
import { KeyboardArrowLeft } from "@mui/icons-material"
import Link from "next/link";
import Image from "next/image";

export default function EstudoResumoPage() {
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
                        fontSize: '24px',
                        color: theme.palette.text.primary,
                    })}
                >
                    Resumo
                </Box>
            </Box>

            <Box
                sx={{
                    marginTop: "3em"
                }}
            >
                <Grid
                    container
                    spacing={1.5}
                    justifyContent="start"
                    marginTop={1}
                    wrap="wrap"
                >
                    <Grid size={8}>
                        <Stack spacing={5}>
                            <Stack spacing={3} direction={'row'}>
                                <Box>
                                    <Image
                                        src={'https://clinicatemplum.com.br/wp-content/uploads/2021/09/raio-x-templum.jpg'}
                                        alt="raio-x"
                                        width={250}
                                        height={250}
                                        className="rounded-lg cursor-pointer border"
                                    />
                                </Box>
                                <Box width={'80%'}>
                                    <Box
                                        sx={(theme) => ({
                                            backgroundColor: "transparent",
                                            border: theme.palette.mode === 'light' ? "none" : "1px solid #333b4d",
                                            padding: "2em",
                                            display: "flex",
                                            justifyContent: "start",
                                            gap: "1em",
                                            borderRadius: "10px",
                                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                                            height: '225px',
                                        })}
                                    >
                                        <Stack width={'100%'}>
                                            <Box
                                                component="h1"
                                                sx={(theme) => ({
                                                    color: theme.palette.text.primary,
                                                    fontWeight: "bold",
                                                    fontSize: "22px"
                                                })}
                                            >
                                                Achado 1
                                            </Box>
                                            <Grid container marginY={1} spacing={4}>
                                                <Grid size={3}>
                                                    <Stack>
                                                        <Box
                                                            component="h1"
                                                            sx={(theme) => ({
                                                                color: theme.palette.text.primary,
                                                                fontWeight: "bold",
                                                                fontSize: "14px"
                                                            })}
                                                        >
                                                            Sistema
                                                        </Box>
                                                        <Box
                                                            component="h1"
                                                            sx={(theme) => ({
                                                                color: theme.palette.text.primary,
                                                                fontSize: "14px"
                                                            })}
                                                        >
                                                            Sistema Cardiovascular
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                                <Grid size={3}>
                                                    <Stack>
                                                        <Box
                                                            component="h1"
                                                            sx={(theme) => ({
                                                                color: theme.palette.text.primary,
                                                                fontWeight: "bold",
                                                                fontSize: "14px"
                                                            })}
                                                        >
                                                            Orgão
                                                        </Box>
                                                        <Box
                                                            component="h1"
                                                            sx={(theme) => ({
                                                                color: theme.palette.text.primary,
                                                                fontSize: "14px"
                                                            })}
                                                        >
                                                            Coração
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                                <Grid size={5}>
                                                    <Stack>
                                                        <Box
                                                            component="h1"
                                                            sx={(theme) => ({
                                                                color: theme.palette.text.primary,
                                                                fontWeight: "bold",
                                                                fontSize: "14px"
                                                            })}
                                                        >
                                                            Patologias
                                                        </Box>
                                                        <Box
                                                            component="h1"
                                                            sx={(theme) => ({
                                                                color: theme.palette.text.primary,
                                                                fontSize: "14px"
                                                            })}
                                                        >
                                                            Miocardiopatia Dilatada, valvopatia
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                            <Stack direction={'row'} justifyContent={'space-between'}>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Avatar></Avatar>
                                                    <Stack>
                                                        <Box
                                                            component="h1"
                                                            sx={(theme) => ({
                                                                color: theme.palette.text.primary,
                                                                fontWeight: "bold",
                                                                fontSize: "14px"
                                                            })}
                                                        >
                                                            Laudado por
                                                        </Box>
                                                        <Box
                                                            component="h1"
                                                            sx={(theme) => ({
                                                                color: theme.palette.text.primary,
                                                                fontSize: "14px"
                                                            })}
                                                        >
                                                            Nome
                                                        </Box>
                                                    </Stack>
                                                </Stack>

                                                <Link href="/dashboard/estudos/1/achados">
                                                    <Button
                                                        sx={(theme) => ({
                                                            backgroundColor: theme.palette.mode === 'light' ? "#f9fafb" : "#0b0e14",
                                                            border: theme.palette.mode === 'light' ? "1px solid grey" : "1px solid #333b4d",
                                                            fontWeight: "lighter",
                                                            fontSize: "14px",
                                                            width: '150px',
                                                            alignSelf: 'end',
                                                        })}
                                                    >

                                                        Ver detalhes
                                                    </Button>
                                                </Link>
                                            </Stack>

                                        </Stack>
                                    </Box>
                                </Box>
                            </Stack>


                        </Stack>
                    </Grid>
                    <Grid size={4}>
                        <Box sx={(theme) => ({
                            width: '100%',
                            backgroundColor: 'transparent',
                            border: theme.palette.mode === 'light' ? "1px solid #dadee7" : "1px solid #333b4d",
                            borderRadius: '20px',
                            padding: 3
                        })}>
                            <Box
                                component="h2"
                                sx={(theme) => ({
                                    color: theme.palette.text.primary,
                                    fontWeight: "bold",
                                    fontSize: "24px"
                                })}
                            >
                                Resumo do laudo
                            </Box>
                            <Box
                                sx={(theme) => ({
                                    backgroundColor: theme.palette.mode === 'light' ? "#f5f6fa" : "#0c1017",
                                    borderRadius: '5px',
                                    padding: 1,
                                    marginY: 2
                                })}
                            >
                                <Box
                                    component="p"
                                    sx={(theme) => ({
                                        color: theme.palette.text.primary
                                    })}
                                >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                                    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                                    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
                                    quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
                                    fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
                                    consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                                    doloremque. Quaerat provident commodi consectetur veniam similique ad
                                    earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
                                    fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
                                    suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                                    modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
                                    totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
                                    quasi aliquam eligendi, placeat qui corporis. lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                                    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                                    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
                                    quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
                                    fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
                                    consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                                    doloremque. Quaerat provident commodi consectetur veniam similique ad
                                    earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
                                    fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
                                    suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                                    modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
                                    totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
                                    quasi aliquam eligendi, placeat qui corporis!
                                </Box>
                            </Box>
                            <Button
                                sx={(theme) => ({
                                    width: "100%",
                                    fontSize: "12px",
                                    backgroundColor: "transparent",
                                    border: theme.palette.mode === 'light' ? "1px solid grey" : "1px solid #333b4d",
                                    color: theme.palette.mode === 'light' ? "#0b0e14" : "#fff"
                                })}
                            >
                                Assinar e salvar laudo
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}
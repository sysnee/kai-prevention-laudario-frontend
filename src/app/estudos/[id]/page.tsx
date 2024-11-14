"use client";

import { Avatar, Box, Button, Grid, Stack } from "@mui/joy"
import BaseLayout from "../../components/BaseLayout"
import { KeyboardArrowLeft, RemoveRedEyeSharp } from "@mui/icons-material"
import Link from "next/link";
import Image from "next/image";

export default function EstudoResumoPage() {
    return (
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

                    <h2 className="text-2xl text-black">Resumo</h2>
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
                        <Grid xs={8}>
                            <Stack spacing={5}>
                            <Stack spacing={3} direction={'row'}>
                                <Box>
                                    <Image
                                        src={'https://clinicatemplum.com.br/wp-content/uploads/2021/09/raio-x-templum.jpg'}
                                        alt="raio-x"
                                        width={250}
                                        height={250}
                                        className="rounded-lg cursor-pointer border-2"
                                    />
                                </Box>
                                <Box width={'80%'}>
                                    <Box
                                        sx={{
                                            backgroundColor: "#fff",
                                            padding: "2em",
                                            display: "flex",
                                            justifyContent: "start",
                                            gap: "1em",
                                            borderRadius: "10px",
                                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                                            height: '225px',
                                        }}
                                    >
                                        <Stack width={'100%'}>
                                            <h1 className="text-2xl font-bold text-black">Achado 1</h1>
                                            <Grid container marginY={1} spacing={4}>
                                                <Grid xs={3}>
                                                    <Stack>
                                                        <h1 className="text-md font-bold text-black">Sistema</h1>
                                                        <h1 className="text-md text-black">Sistema Cardiovascular</h1>
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={3}>
                                                    <Stack>
                                                        <h1 className="text-md font-bold text-black">Orgão</h1>
                                                        <h1 className="text-md text-black">Coração</h1>
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={5}>
                                                    <Stack>
                                                        <h1 className="text-md font-bold text-black">Patologias</h1>
                                                        <h1 className="text-md text-black">Miocardiopatia Dilatada, valvopatia</h1>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                            <Stack direction={'row'} justifyContent={'space-between'}>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Avatar></Avatar>
                                                    <Stack>
                                                        <p className="text-sm font-bold text-black">Laudado por</p>
                                                        <p className="text-sm text-black">Nome</p>
                                                    </Stack>
                                                </Stack>
                                                <Button
                                                    sx={{
                                                        backgroundColor: "#584e46",
                                                        color: "#ffb492",
                                                        fontWeight: "lighter",
                                                        fontSize: "14px",
                                                        "&:hover": {
                                                            backgroundColor: "#4b4037"
                                                        },
                                                        width: '150px',
                                                        alignSelf: 'end',
                                                    }}
                                                    endDecorator={<RemoveRedEyeSharp sx={{ fontSize: "20px" }} />}
                                                >

                                                    Ver detalhes
                                                </Button>
                                            </Stack>

                                        </Stack>
                                    </Box>
                                </Box>
                            </Stack>

                            <Stack spacing={3} direction={'row'}>
                                <Box>
                                    <Image
                                        src={'https://clinicatemplum.com.br/wp-content/uploads/2021/09/raio-x-templum.jpg'}
                                        alt="raio-x"
                                        width={250}
                                        height={250}
                                        className="rounded-lg cursor-pointer border-2"
                                    />
                                </Box>
                                <Box width={'80%'}>
                                    <Box
                                        sx={{
                                            backgroundColor: "#fff",
                                            padding: "2em",
                                            display: "flex",
                                            justifyContent: "start",
                                            gap: "1em",
                                            borderRadius: "10px",
                                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                                            height: '225px',
                                        }}
                                    >
                                        <Stack width={'100%'}>
                                            <h1 className="text-2xl font-bold text-black">Achado 2</h1>
                                            <Grid container marginY={1} spacing={4}>
                                                <Grid xs={3}>
                                                    <Stack>
                                                        <h1 className="text-md font-bold text-black">Sistema</h1>
                                                        <h1 className="text-md text-black">Sistema Cardiovascular</h1>
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={3}>
                                                    <Stack>
                                                        <h1 className="text-md font-bold text-black">Orgão</h1>
                                                        <h1 className="text-md text-black">Coração</h1>
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={5}>
                                                    <Stack>
                                                        <h1 className="text-md font-bold text-black">Patologias</h1>
                                                        <h1 className="text-md text-black">Miocardiopatia Dilatada, valvopatia</h1>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                            <Stack direction={'row'} justifyContent={'space-between'}>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Avatar></Avatar>
                                                    <Stack>
                                                        <p className="text-sm font-bold text-black">Laudado por</p>
                                                        <p className="text-sm text-black">Nome</p>
                                                    </Stack>
                                                </Stack>
                                                <Button
                                                    sx={{
                                                        backgroundColor: "#584e46",
                                                        color: "#ffb492",
                                                        fontWeight: "lighter",
                                                        fontSize: "14px",
                                                        "&:hover": {
                                                            backgroundColor: "#4b4037"
                                                        },
                                                        width: '150px',
                                                        alignSelf: 'end',
                                                    }}
                                                    endDecorator={<RemoveRedEyeSharp sx={{ fontSize: "20px" }} />}
                                                >

                                                    Ver detalhes
                                                </Button>
                                            </Stack>

                                        </Stack>
                                    </Box>
                                </Box>
                            </Stack>
                            </Stack>
                        </Grid>
                        <Grid xs={4}>
                            <Box sx={{
                                width: '100%',
                                backgroundColor: '#B8B1AB',
                                borderRadius: '20px',
                                padding: 3
                            }}>
                                <h2 className="text-3xl font-extralight text-black">Resumo do laudo</h2>
                                <Box
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: '5px',
                                        padding: 1,
                                        marginY: 2
                                    }}
                                >
                                    <p className="text-sm text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
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
                                        quasi aliquam eligendi, placeat qui corporis!</p>
                                </Box>
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
                                    Assinar e salvar laudo
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </BaseLayout>
    )
}
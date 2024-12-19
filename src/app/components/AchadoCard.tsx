import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Achado } from "../types/types";

export default function AchadoCard({ achado, onEdit }: { achado: Achado, onEdit: () => void }) {
    return (
        <Card
            sx={(theme) => ({
                width: "100%",
                backgroundColor: "#fff",
                border: theme.palette.mode === 'light' ? "none" : "1px solid #333b4d",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                overflow: "auto"
            })}
        >
            <CardContent>
                <Typography
                    variant="h4"
                >
                    {achado.titulo}
                </Typography>
            </CardContent>

            <Stack
                direction="row"
                alignItems="start"
                justifyContent="space-between"
                spacing={2}
                marginTop={2}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: "16px",
                        }}
                        variant="h6"
                    >
                        Sistema
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: "lighter"
                        }}
                        variant="h6"
                    >
                        {achado.sistema}
                    </Typography>
                </Box>

                <Box>
                    <Typography
                        sx={{
                            fontSize: "16px",
                        }}
                        variant="h6"
                    >
                        Orgão
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: "lighter"
                        }}
                        variant="h6"
                    >
                        {achado.orgao}
                    </Typography>
                </Box>

                <Box>
                    <Typography
                        sx={{
                            fontSize: "16px",
                        }}
                        variant="h6"
                    >
                        Patologias
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: "lighter"
                        }}
                        variant="h6"
                    >
                        {achado.patologias.map((patologia, index) => (
                            <p key={index}>{patologia}</p>
                        ))}
                    </Typography>
                </Box>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                marginTop={3}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5em"
                    }}
                >
                    <Avatar sx={{ width: 35, height: 35 }}></Avatar>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "11px",
                                fontWeight: "bold"
                            }}
                        >
                            Laudado por
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "10px"
                            }}
                        >
                            Carlos Maciel
                        </Typography>
                    </Box>
                </Box>

                <Button
                    onClick={onEdit}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.mode === 'light' ? "#fff" : "#0b0e14",
                        border: "1px solid #e5e7eb"
                    })}
                    className="text-kai-primary transition-colors hover:bg-kai-primary/10"
                >
                    <EditIcon sx={{ fontSize: "16px", marginRight: ".2em" }} />
                    Editar achado
                </Button>
            </Stack>
        </Card>
    )
}
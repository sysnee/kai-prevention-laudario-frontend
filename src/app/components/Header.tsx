import { Autocomplete, Box, Button, Grid } from "@mui/joy";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Header({estudos}: {estudos: Estudo[]}){
    return(
        <Box
            sx={{
                backgroundColor: "#b8b1ab",
                padding: "1.8em",
                borderBottomLeftRadius: "1em",
                borderBottomRightRadius: "1em"
            }}
        >
            <h4 className="text-2xl text-white">Estudos</h4>
            <Grid 
                container 
                spacing={2} 
                alignItems="center"
                marginTop={.2}
            >
                <Grid xs={3}>
                    <Autocomplete
                        sx={{color: "black", fontSize: "14px"}}
                        placeholder="Buscar"
                        options={estudos}
                        getOptionLabel={(option) => option.nome}
                    />
                </Grid>
                <Grid xs={2}>
                    <Autocomplete
                        sx={{color: "black", fontSize: "14px"}}
                        placeholder="Filtrar"
                        options={estudos}
                        getOptionLabel={(option) => option.nome}
                    />
                </Grid>
                <Grid xs={2}>
                    <Autocomplete
                        sx={{color: "black", fontSize: "14px"}}
                        placeholder="Mais recentes"
                        options={estudos}
                        getOptionLabel={(option) => option.nome}
                    />
                </Grid>
                <Grid xs={1}>
                    <Button
                        sx={{
                            backgroundColor: "#584e46",
                            color: "#ffb492",
                            fontWeight: "lighter",
                            fontSize: "14px",
                            "&:hover": {
                                backgroundColor: "#4b4037"
                            }
                        }}
                        endDecorator={<RefreshIcon sx={{fontSize: "20px"}} />}
                    >
                        Refresh
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
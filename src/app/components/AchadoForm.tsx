import { Check, Close } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextareaAutosize,
  Typography,
  useTheme
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export default function AchadoForm({
  onCancel,
  onSubmit,
  achadoToEdit
}: {
  onCancel: () => void,
  onSubmit: (formData: any) => void,
  achadoToEdit?: any
}) {

  const theme = useTheme();
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    laudoId: "",
    imageId: "",
    sistema: "",
    orgao: "",
    patologias: [],
    severidade: "",
    observacoes: "",
  });

  useEffect(() => {
    if (achadoToEdit) {
      setFormData({
        id: achadoToEdit.id,
        titulo: achadoToEdit.titulo,
        laudoId: achadoToEdit.laudoId,
        imageId: achadoToEdit.imageId,
        sistema: achadoToEdit.sistema || "",
        orgao: achadoToEdit.orgao || "",
        patologias: achadoToEdit.patologias || [],
        severidade: achadoToEdit.severidade || "",
        observacoes: achadoToEdit.observacoes || "",
      });
    }
  }, [achadoToEdit]);

  //Validações

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | string[]>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: "1.2em",
        border: theme.palette.mode === 'light' ? "none" : "1px solid hsla(220, 20%, 25%, 0.6)",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : "transparent",
      })}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        {achadoToEdit ? achadoToEdit.titulo : "Novo achado"}
      </Typography>

      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel id="inputSistema">Sistema</InputLabel>
          <Select
            labelId="inputSistema"
            name="sistema"
            value={formData.sistema}
            onChange={(e) => handleChange(e)}
            sx={{
              backgroundColor: "transparent"
            }}
          >
            <MenuItem value="Sistema Nervoso">Sistema Nervoso</MenuItem>
            <MenuItem value="Sistema Cardiovascular">Sistema Cardiovascular</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="inputOrgao">Órgão</InputLabel>
          <Select
            labelId="inputOrgao"
            name="orgao"
            value={formData.orgao}
            onChange={(e) => handleChange(e)}
            sx={{
              backgroundColor: "transparent"
            }}
          >
            <MenuItem value="Coração">Coração</MenuItem>
            <MenuItem value="Fígado">Fígado</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="inputPatologias">Patologias</InputLabel>
          <Select
            labelId="inputPatologias"
            name="patologias"
            value={formData.patologias}
            onChange={(e) => handleChange(e)}
            multiple
            sx={{
              backgroundColor: "transparent"
            }}
          >
            <MenuItem value="Valvopatia">Valvopatia</MenuItem>
            <MenuItem value="Aneurisma">Aneurisma</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <Typography
            sx={{
              fontSize: "18px"
            }}
          >
            Severidade
          </Typography>
          <RadioGroup
            row
            name="severidade"
            value={formData.severidade}
            onChange={handleChange}
          >
            <FormControlLabel value="leve" control={<Radio size="small" />} label="Leve" />
            <FormControlLabel value="grave" control={<Radio size="small" />} label="Grave" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="body1" gutterBottom>
            Observações gerais
          </Typography>
          <TextareaAutosize
            name="observacoes"
            value={formData.observacoes}
            onChange={(e) => handleChange(e)}
            minRows={4}
            placeholder="Descreva as observações aqui..."
            style={{
              width: "100%",
              padding: ".5em",
              borderRadius: "10px",
              fontSize: "14px",
              border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
              backgroundColor: theme.palette.background.default
            }}
          />
        </FormControl>

        <Stack direction="row" spacing={2} justifyContent="flex-start">
          <Button
            onClick={onCancel}
            sx={(theme) => ({
              backgroundColor: theme.palette.mode === 'light' ? "#fff" : "#0b0e14",
              border: "1px solid #e5e7eb"
            })}
            className="text-kai-primary transition-colors hover:bg-kai-primary/10"
          >
            <Close sx={{ fontSize: "17px", marginRight: ".2em" }} />
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-kai-primary hover:bg-kai-primary/70 flex items-center"
            sx={(theme) => ({
              color: theme.palette.mode === 'light' ? '#fff' : '#000'
            })}
          >
            <Check sx={(theme) => ({
              color: theme.palette.mode === 'light' ? '#fff' : '#000',
              fontSize: "17px",
              marginRight: ".2em"
            })} />
            <Typography sx={(theme) => ({
              color: theme.palette.mode === 'light' ? '#fff' : '#000'
            })}>
              {achadoToEdit ? "Salvar alterações" : "Salvar achado"}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import ActionButtons from "../../dashboard/permissions/components/ActionButtons";

export const colum = (
  onView: (cliente: any) => void,
  onEdit: (cliente: any) => void,
  onDelete: (cliente: any) => void
): GridColDef[] => [
  {
    field: "name",
    headerName: "Nome",
    flex: 0.4,
    minWidth: 250,
    renderCell: (params) => (
      <Box
        sx={(theme) => ({
          padding: "0 .8em",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          height: "100%",
          width: "100%",
          borderRight: `1px solid ${theme.palette.divider}`,
          boxSizing: "border-box",
        })}
      >
        {params.row.name}
      </Box>
    ),
  },
  {
    field: "cpf",
    headerName: "CPF",
    flex: 0.4,
    minWidth: 150,
    renderCell: (params) => (
      <Box
        sx={(theme) => ({
          padding: "0 .8em",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          height: "100%",
          width: "100%",
          borderRight: `1px solid ${theme.palette.divider}`,
          boxSizing: "border-box",
        })}
      >
        {params.row.cpf}
      </Box>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.4,
    minWidth: 250,
    renderCell: (params) => (
      <Box
        sx={(theme) => ({
          padding: "0 .8em",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          height: "100%",
          width: "100%",
          borderRight: `1px solid ${theme.palette.divider}`,
          boxSizing: "border-box",
        })}
      >
        {params.row.email}
      </Box>
    ),
  },
  {
    field: "actions",
    headerName: "Ações",
    flex: 0.4,
    minWidth: 200,
    renderCell: (params) => (
      <Box
        sx={(theme) => ({
          padding: "0 .8em",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          height: "100%",
          width: "100%",
          borderRight: `1px solid ${theme.palette.divider}`,
          boxSizing: "border-box",
        })}
      >
        <ActionButtons
          onView={() => onView(params.row)} 
          onEdit={() => onEdit(params.row)} 
          onDelete={() => onDelete(params.row)} 
        />
      </Box>
    ),
  },
];

export const generateRows = (clientes: any[]): GridRowsProp => {
  return clientes.map((cliente: any) => ({
      id: cliente.id,
      name: cliente.name,
      cpf: cliente.cpf,
      email: cliente.email,
      gender: cliente.gender,
      phone: cliente.phone,
      birthdate: cliente.birthdate,
      street: cliente.street,
      number: cliente.number,
      complement: cliente.complement,
      neighborhood: cliente.neighborhood,
      city: cliente.city,
      state: cliente.state,
      zipcode: cliente.zipcode,
  }));
};

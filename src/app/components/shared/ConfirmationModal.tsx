import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box } from '@mui/material'
import { AlertTriangle } from 'lucide-react'
import { useTheme } from '@mui/material/styles'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  itemName: string
  itemType: string
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar Exclusão',
  itemName,
  itemType
}: ConfirmationModalProps) {
  const theme = useTheme()

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 2
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.palette.error.light,
              borderRadius: '50%',
              padding: 2
            }}>
            <AlertTriangle size={28} color='white' style={{ display: 'block' }} />
          </Box>
        </Box>
        <Typography variant='h6' align='center' sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body2' align='center' sx={{ color: theme.palette.text.secondary }}>
          Tem certeza que deseja excluir o {itemType}{' '}
          <span
            style={{
              fontWeight: 'bold',
              color: theme.palette.text.primary
            }}>
            {itemName}
          </span>
          ? Esta ação não poderá ser desfeita.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: 1,
            gap: 1
          }}>
          <Button
            variant='outlined'
            color='inherit'
            onClick={onClose}
            sx={{
              textTransform: 'none',
              fontWeight: 'medium'
            }}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={onConfirm}
            sx={{
              textTransform: 'none',
              fontWeight: 'medium'
            }}>
            Excluir
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

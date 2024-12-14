'use client'

import * as React from 'react'
import { Drawer, Box, Divider, Stack, Typography, Avatar, useMediaQuery, Theme } from '@mui/material'
import MenuContent from '../dashboard/components/MenuContent'
import OptionsMenu from '../dashboard/components/OptionsMenu'
import { useSession } from 'next-auth/react'

interface SideMenuProps {
  drawerWidth: number
}

function SideMenu({ drawerWidth }: SideMenuProps) {
  const { data } = useSession()
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  return (
    <Drawer
      variant={isLargeScreen ? 'permanent' : 'temporary'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: theme => `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper'
        }
      }}>
      <Box
        sx={{
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
          flexShrink: 0
        }}>
        <Typography variant='h5'>RI System</Typography>
        <Typography variant='subtitle2' color='text.secondary'>
          KAI Prevention Center
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <MenuContent />
      </Box>

      <Divider />

      <Stack
        direction='row'
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center'
        }}>
        <Avatar alt={data?.user?.name ?? ''} src='/static/images/avatar/7.jpg' sx={{ width: 36, height: 36 }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant='body2' noWrap sx={{ fontWeight: 500 }}>
            {data?.user?.name ?? ''}
          </Typography>
          <Typography variant='caption' noWrap color='text.secondary'>
            {data?.user?.email ?? ''}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  )
}

export default SideMenu

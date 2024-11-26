import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from '../dashboard/components/MenuContent';
import CardAlert from '../dashboard/components/CardAlert';
import OptionsMenu from '../dashboard/components/OptionsMenu';
import { useSession } from 'next-auth/react';

// const Drawer = styled(MuiDrawer)({
//   width: drawerWidth,
//   flexShrink: 0,
//   boxSizing: 'border-box',
//   mt: 10,
//   [`& .${drawerClasses.paper}`]: {
//     width: drawerWidth,
//     boxSizing: 'border-box',
//   },
// });

export default function SideMenu() {
  const { data } = useSession()
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', lg: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
          position: 'fixed'
        },
      }}
    >
      <Box
        sx={{
          // display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        {/* <h1>KAI PREVENTION CERTER</h1> */}
        <h1 className='text-2xl'>RI System</h1>
        <h2 className='text-sm opacity-75'>KAI Prevention Center</h2>
        {/* <SelectContent /> */}
      </Box>
      <Divider />
      <MenuContent />
      <CardAlert />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt={data?.user?.name as string}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {data?.user?.name as string}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {data?.user?.email as string}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}

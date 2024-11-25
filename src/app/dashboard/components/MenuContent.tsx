import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DocumentScannerRounded from '@mui/icons-material/DocumentScannerRounded';
import { CalendarIcon } from '@mui/x-date-pickers';
import { MonitorHeart, SecurityOutlined } from '@mui/icons-material';
import { Divider } from '@mui/material';
import Link from 'next/link';

const mainListItems = [
  {
    text: 'Início',
    icon: <HomeRoundedIcon />,
    path: '/'
  },
  {
    text: 'Agendamento',
    icon: <CalendarIcon />,
    subItems: [
      { text: 'Consultar todos', path: '/agenda' },
      { text: 'Criar novo', path: '/agenda/novo' },
    ],
  },
  {
    text: 'Laudário',
    icon: <DocumentScannerRounded />,
    path: '/estudos'
  },
  {
    text: 'Fluxo de trabalho',
    icon: <MonitorHeart />
  },
  {
    text: 'Pacientes',
    icon: <PeopleRoundedIcon />,
  },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const [open, setOpen] = React.useState<any>({});

  const handleClick = (index: number) => {
    setOpen((prevOpen: any) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }));
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              {
                item.subItems
                  ? <>
                    <ListItemButton onClick={() => handleClick(index)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                      {item.subItems ? (open[index] ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItemButton>
                  </>
                  : <>
                    <Link href={item.path || '/'}>
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </Link>
                  </>
              }
            </ListItem>

            {item.subItems && (
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ mb: 1 }}>
                  {item.subItems.map((subItem, subIndex) => (
                    <Link key={subIndex} href={subItem.path}>
                      <ListItem key={subIndex} sx={{ pl: 2, py: 0 }}>
                        <ListItemButton>
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider />
      <Stack direction={'row'} spacing={1}>
        <SecurityOutlined className='opacity-50' style={{ width: '20px' }} />
        <p className='opacity-75'>ADMINISTRATIVO</p>
      </Stack>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Stack>
  );
}

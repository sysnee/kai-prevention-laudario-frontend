"use client";

import { ReactNode, useEffect, useState } from "react"
import CssBaseline from '@mui/material/CssBaseline';
import SideMenu from './SideMenu';
import AppNavbar from './AppNavbar';
import { alpha, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import Header from './Header';
import db from '../../../db.json'
import { User } from "../types/types";

import AppTheme from '../theme/AppTheme';
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '../theme/customizations';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function BaseLayout({ children, session }: { children: ReactNode, session?: Session }) {

    const [, setUser] = useState<User | null>(null)

    async function getUser() {
        try {
            // const userData = await axios.get("http://localhost:5000/users/1")
            const userData = db.users[0]
            setUser(userData)
        } catch (error) {
            console.log("Erro ao buscar usuario: ", error)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <SessionProvider session={session}>
            <AppTheme themeComponents={xThemeComponents}>
                <CssBaseline enableColorScheme />
                <Grid container>
                    <Grid size={{ xs: 0, lg: 3 }}>
                        <SideMenu />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 9 }}>
                        <Box>
                            <AppNavbar />
                            <Box
                                component="main"
                                sx={(theme: Theme) => ({
                                    flexGrow: 1,
                                    backgroundColor: theme.cssVariables
                                        ? `rgba(${theme.palette.background.default} / 1)`
                                        : alpha(theme.palette.background.default, 1),
                                    overflow: 'auto',
                                })}
                            >
                                <Stack
                                    spacing={2}
                                    sx={{
                                        alignItems: 'center',
                                        height: '100vh',
                                        mx: 3,
                                        pb: 5,
                                        mt: { xs: 8, md: 0 },
                                    }}
                                >
                                    <Header />
                                    {children}
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </AppTheme>
        </SessionProvider>
    )
}
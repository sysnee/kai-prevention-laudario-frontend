"use client";

import { KeyboardArrowDown } from "@mui/icons-material"
import { Avatar, Box, Button, Typography } from "@mui/joy"
import { AppBar, Toolbar } from "@mui/material"
import axios from "axios";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react"
import logo from "../assets/imagens/logo.png"

type User = {
    id: string,
    nome: string,
    avatar: string
}

export default function BaseLayout({children}: {children: ReactNode}){

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        async function getUser(){
            const userData = await axios.get("http://localhost:5000/users/1")
            setUser(userData.data)
        }

        getUser();

    }, [])

    return(
        <div className="flex flex-col min-h-screen m-0 p-0">
            <AppBar 
                position="sticky" 
                elevation={0}
            >
                <Toolbar className="flex justify-between items-center bg-nav">
                    <Typography component="div">
                        <Image 
                            src={logo}
                            alt="Logo KAI"
                            width={55}
                        />
                    </Typography>
                    
                    <Box>
                        <Button 
                            sx={{
                                backgroundColor: '#71655c', 
                                gap: '.7em', 
                                padding: '.6em .6em',
                                '&:hover': {
                                    backgroundColor: '#5d4a3e'
                                }
                            }} 
                            size="sm" 
                            endDecorator={<KeyboardArrowDown sx={{color: '#ff8046'}} />}>
                                <Avatar 
                                    size="sm" 
                                    src={user?.avatar} 
                                />
                                <p className="text-xs">{user?.nome}</p>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

                
            <Box className="flex-1 overflow-y-auto">
                {children}
            </Box>
        </div>
    )
}
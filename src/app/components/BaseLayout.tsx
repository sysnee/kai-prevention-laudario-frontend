"use client";

import { KeyboardArrowDown } from "@mui/icons-material"
import { Avatar, Box, Button, Typography } from "@mui/joy"
import { AppBar, Toolbar } from "@mui/material"
import axios from "axios";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react"
import logo from "../assets/imagens/logo.png"
import db from '../../../db.json'

export default function BaseLayout({children}: {children: ReactNode}){

    const [user, setUser] = useState<User | null>(null)

    async function getUser(){
        try{
            // const userData = await axios.get("http://localhost:5000/users/1")
            const userData = db.users[0]
            setUser(userData)
        } catch(error){
            console.log("Erro ao buscar usuario: ", error)
        }
    }

    useEffect(() => {
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
                                    backgroundColor: '#5e4e46'
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

                
            <Box className="flex-1">
                {children}
            </Box>
        </div>
    )
}
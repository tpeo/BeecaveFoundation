import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkTheme } from "../pages/Home";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';


export default function Footer() {
    
    return (
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth="xl">
                <Box sx={{ bgcolor: "#000000", paddingLeft:"5%", paddingY:"5%"}}>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1,  md: 2 }}>
                        <Grid item xs={2} md={1} >
                            <Typography variant="h6" sx={{paddingBottom: '2%', color:"white" }}>Support the Bee Cave Arts Foundation</Typography>
                            <Typography variant="body2" color='white' fontWeight="200">Members can join the <Link style={{color:"white"}} to="https://beecavearts.foundation/artist-registry/join-the-artist-registry/"
                                >Artists Registry</Link>. Your donation is tax deductive. All donations help!</Typography>
                            <Box display="flex" sx={{ alignItems: 'center', paddingTop: '2%'}}>
                                <ArrowForwardIcon sx={{color: "white", marginRight: '1%'}}></ArrowForwardIcon>
                                <Link to="" style={{
                                    textDecoration: 'none',
                                    color: 'white', 
                                    transition: 'text-decoration 0.3s ease', 
                                    }} 
                                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                    size="small">Donate or Become a Member Today</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={1}>
                            <Typography variant="h6" color="white" sx={{paddingBottom: '2%'}}>Connect</Typography>
                            <Box display="flex" direction="row" justifyContent="space-between" alignItems="left" width="70%">
                                <Link to="https://www.facebook.com/BeeCaveArts/" style={{color: "white"}}><FacebookIcon/> </Link>
                                <Link to="https://www.instagram.com/beecavearts" style={{color: "white"}}><InstagramIcon/></Link>
                                <Link to="https://www.youtube.com/channel/UCtEb_ts24HUOo7xHUUyXImQ/about" style={{color: "white"}}><YouTubeIcon/></Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider> 
    )
}
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    typography: {
        fontFamily: [
          'DM Sans',
          'sans-serif',
        ].join(','),
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'DM Sans', sans-serif;
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: url(https://fonts.googleapis.com/css2?family=DM+Sans) format('woff2');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
      },
  });

export default function Footer() {
    
    return (
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth="xl">
                <Box sx={{ bgcolor: "#000000", paddingLeft:"5%", paddingY:"5%"}}>
                    <Grid container direction="row" spacing={4}>
                        <Grid item xs={4} >
                            <Typography color="white">Support the Bee Cave Arts Foundation</Typography>
                            <Typography color="white">Members can join the <Link color="white" to="https://beecavearts.foundation/artist-registry/join-the-artist-registry/">Artists Registry</Link>. Your donation is tax deductive. All donations help!</Typography>
                            <Box>
                                <ArrowForwardIcon sx={{color: "white"}}></ArrowForwardIcon>
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
                        <Grid item xs={8}>
                            <Typography color="white">Connect</Typography>
                            <Box display="flex" direction="row" justifyContent="space-evenly" alignItems="left">
                                <Link color="white">X</Link>
                                <Link color="white">FACEBOOK</Link>
                                <Link color="white">YOUTUBE</Link>
                                <Link color="white">INSTAGRAM</Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider> 
    )
}
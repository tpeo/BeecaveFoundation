import React, { useState, useEffect } from "react";
import Gallery from "../Gallery";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./Home.js";
import Footer from "../components/footer.js";
import NavigationBar from "../components/navbar.js";

const Exhibition = () => {
    const { sheetTitle } = useParams();
    const [exhibition, setExhibition] = useState({});

    const spreadsheetId = '1FbaWozLti_PIm2oZWX8rrhWTEr5Ty5KY5Z9LwzFf27w'; //'14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c'; 
    const ranges = 'B2:F100'; // might need to set this
    const apiKey = process.env.REACT_APP_API_KEY;
    const ROWS= 'ROWS';

    const extractImageId = (imageUrl) => {
        const parts = imageUrl.split('id=');
        const id = parts[1];
        return id;
      };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Exhibitions!${ranges}&key=${apiKey}&majorDimension=${ROWS}`);
            const data = await response.json();
            if (data.valueRanges[0].values.length > 0) {
              let item = data.valueRanges[0].values.filter((e, index) => e[0] == sheetTitle)[0];
              const exhibition = {
                name: item[0],
                start: item[1],
                end: item[2],
                image: extractImageId(item[3]),
                description: item[4]
                };

              setExhibition(exhibition);
            } else {
              console.log('No data found.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
      }, []);


    return (
        <ThemeProvider theme={darkTheme}>
        <div className="container">
        <NavigationBar/>
        <Card>
              <div style={{ position: "relative" }}>
                <CardMedia component="img" image={`https://drive.google.com/thumbnail?id=${exhibition.image}`} title={exhibition.name} alt="frog" /> 
                <div style={{position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)'}} ></div>
                  <Typography sx={{position: "absolute", color: "white",bottom: "5%",left: "5%", width: '25%'
                  }} variant='h3'>{exhibition.name}</Typography>
              </div>
        </Card>
        <Box
            sx={{
                display: 'grid',
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: '2fr 1fr',
                py: "5%" 
            }}
            >
            <Typography variant='body2' sx={{fontWeight:'500', px: "5%"}}>
                            {exhibition.description}
            </Typography>
            <Typography variant='body2' sx={{fontWeight:'500' , pl: "5%"}}>
                            <strong>Date:</strong><br/> {exhibition.start} - {exhibition.end}
            </Typography>
        </Box>
        
 


            
        <Gallery/>
        <Footer/>
        </div>
        </ThemeProvider>
    );
};
export default Exhibition;

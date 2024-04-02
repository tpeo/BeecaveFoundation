import React, { useState, useEffect } from 'react';
import ExhibitionLink from '../ExhibitionLink.js';
import NavigationBar from '../components/navbar.js';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardMedia } from '@mui/material';

const spreadsheetId = '14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c'; 
const ranges = '2:100'; 
const apiKey = process.env.REACT_APP_API_KEY;
const ROWS= 'ROWS';

const Home = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?&key=${apiKey}`);
            const data = await response.json();
            if (data.sheets.length > 0) {
              const pages = data.sheets.map((sheet, index) => ({
                sheetId: sheet.properties.sheetId,
                title: sheet.properties.title,
                key: index.toString(),
              }));
              setPages(pages);
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
        <div className='container'>
          <NavigationBar/>
            <Card>
              <div style={{ position: "relative" }}>
                <CardMedia component="img" image={'/images/frog.jpeg'} title="frog" alt="frog" /> 
                <div style={{position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)'}} ></div>
                  <Typography sx={{position: "absolute", color: "white",bottom: "5%",left: "5%", width: '25%'
                  //,transform: "translateX(-50%)",
                  }} variant='h3'> Bee Cave Arts Foundation</Typography>
              </div>
            </Card>

            <Typography variant='h5' sx={{paddingY: '5%', paddingRight: '40%', paddingLeft: '5%'}}>
              Established in 2010, Bee Cave Arts Foundation invigorates the community and visitor experience through diverse public art initiatives, including the Bee Cave Sculpture Park, The Hive art center, and ongoing exhibitions and classes.
            </Typography>

            <ExhibitionLink
                key="Current Exhibition"
                subtitle='CURRENT GALLERY EXHIBITION'
                title="Current Exhibition"
                date='Jan 1 - Feb 1'
                description='lorem ipsum....'
                order={false}
            ></ExhibitionLink>
            <Typography variant='h6' sx={{paddingLeft: '5%'}}>Upcoming Exhibitions</Typography>
            <Grid>
            {
                (pages) && (
                    pages.map((page) => (
                        <ExhibitionLink
                          key={page.title}
                          subtitle='Gallery Exhibition'
                          title={page.title}
                          date='Jan 1 - Feb 1'
                          description='lorem ipsum....'
                          order={true}
                        ></ExhibitionLink>
                    ))
                )
            }
            </Grid>
            
        </div>
    )

}
export default Home;

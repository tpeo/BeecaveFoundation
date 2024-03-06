import React, { useState, useEffect } from 'react';
import ExhibitionLink from '../ExhibitionLink.js';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';

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
            <img src='' alt='beecave_main_img'></img>
            <Typography sx={{paddingLeft: '5%'}} variant='h3'> Beecave Arts Foundation</Typography>
            <Typography sx={{paddingRight: '40%', paddingLeft: '5%'}}>
              Established in 2010, Bee Cave Arts Foundation invigorates the community and visitor experience through diverse public art initiatives, including the Bee Cave Sculpture Park, The Hive art center, and ongoing exhibitions and classes.
            </Typography>
            <h1> <Link to="/Exhibition">Current Exhibition</Link> </h1>
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
                        ></ExhibitionLink>
                    ))
                )
            }
            </Grid>
            
        </div>
    )

}
export default Home;

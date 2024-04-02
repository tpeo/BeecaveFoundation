import React, { useState, useEffect } from 'react';
import ExhibitionLink from '../ExhibitionLink.js';
import NavigationBar from '../components/navbar.js';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardMedia } from '@mui/material';

const spreadsheetId = '14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c'; 
const ranges = '2:100'; 
const apiKey = process.env.REACT_APP_API_KEY;
const ROWS= 'ROWS';

const PastExhibitions = () => {
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

            <Typography variant='h5' sx= {{paddingRight: '40%', paddingLeft: '5%'}}>
              Past Exhibition Archive
            </Typography>

            <Grid>
            {
                (pages) && (
                    pages.map((page) => (
                        <ExhibitionLink
                          key={page.title}
                          description={page.title}
                          order={true}
                        ></ExhibitionLink>
                    ))
                )
            }
            </Grid>
            
        </div>
    )

}
export default PastExhibitions;

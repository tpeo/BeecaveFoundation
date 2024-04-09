import React, { useState, useEffect } from 'react';
import ExhibitionLink from '../ExhibitionLink.js';
import NavigationBar from '../components/navbar.js';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardMedia } from '@mui/material';
import ArchiveCard from '../components/archiveCard.js';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchBar from '../components/SearchBar.js';
import Footer from '../components/footer.js';

const spreadsheetId = '1FbaWozLti_PIm2oZWX8rrhWTEr5Ty5KY5Z9LwzFf27w'; //'14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c'; 
const ranges = 'B2:F5'; // might need to set this
const apiKey = process.env.REACT_APP_API_KEY;
const ROWS= 'ROWS';
const sheetTitle = 'Exhibitions';

const extractImageId = (imageUrl) => {
  const parts = imageUrl.split('id=');
  const id = parts[1];
  return id;
};

const Home = () => {
    const [exhibitions, setExhibitions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${sheetTitle}!${ranges}&key=${apiKey}&majorDimension=${ROWS}`);
            const data = await response.json();
            console.log(data.valueRanges[0].values)
            if (data.valueRanges[0].values.length > 0) {
              const exhibitions = data.valueRanges[0].values.map((e, index) => {
                return {
                  name: e[0],
                  start: e[1],
                  end: e[2],
                  image: extractImageId(e[3]),
                  description: e[4]
                }
              });
              setExhibitions(exhibitions);
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
            <SearchBar/>
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
                image="/images/dummy.png"
                order={false}
            ></ExhibitionLink>
            <Typography variant='h6' sx={{paddingLeft: '5%'}}>Upcoming Exhibitions</Typography>
            <Grid container>
            {
                (exhibitions) && (
                    exhibitions.map((e) => (
                        <ExhibitionLink
                          key={e.name}
                          subtitle='Gallery Exhibition'
                          title={e.name}
                          date={`${e.start} - ${e.end}`}
                          description={e.description}
                          image={e.image}
                          order={true}
                        ></ExhibitionLink>
                    ))
                )
            }
            </Grid>
            <Box sx={{ marginY: '3%'}}>
            <Typography variant='h6' sx={{paddingLeft: '5%'}}>Exhibitions Archive</Typography>
              { (exhibitions.length > 0) && (
                <Grid container spacing={2} direction="row" sx={{ paddingX: '3%' }}>

                  <Grid item xs={4}>
                    <ArchiveCard
                        key={exhibitions[0].name}
                        title={exhibitions[0].name}
                        date={`${exhibitions[0].start} - ${exhibitions[0].end}`}
                        image={exhibitions[0].image}
                    ></ArchiveCard>
                  </Grid>
                  <Grid item xs={4}>
                    <ArchiveCard
                        key={exhibitions[0].name}
                        title={exhibitions[0].name}
                        date={`${exhibitions[0].start} - ${exhibitions[0].end}`}
                        image={exhibitions[0].image}
                    ></ArchiveCard>
                  </Grid>
                  <Grid item xs={4}>
                    <ArchiveCard
                        key={exhibitions[0].name}
                        title={exhibitions[0].name}
                        date={`${exhibitions[0].start} - ${exhibitions[0].end}`}
                        image={exhibitions[0].image}
                    ></ArchiveCard>
                  </Grid>
              </Grid>
              )}
              <Box sx={{ paddingLeft: '5%', marginY: '3%' }}>
                <ArrowForwardIcon></ArrowForwardIcon>
                <Link to={`/ExhibitionArchive`} style={{
                    textDecoration: 'none',
                    color: 'inherit', // This ensures the link inherits the color from its parent
                    transition: 'text-decoration 0.3s ease', 
                    // Smooth transition for the underline
                    }} 
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    size="small"> Visit Archive</Link>
              </Box>
            </Box>
        <Footer/>

            

        </div>
    )

}
export default Home;

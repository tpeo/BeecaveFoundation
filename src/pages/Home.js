import React, { useState, useEffect } from 'react';
import ExhibitionLink from '../ExhibitionLink.js';
import NavigationBar from '../components/navbar.js';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardMedia } from '@mui/material';
import ArchiveCard from '../components/archiveCard.js';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Footer from '../components/footer.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import currentexhibitions from '../components/exhibitions.json'
import { client, index } from '../components/SearchBar.js';

const spreadsheetId = '1FbaWozLti_PIm2oZWX8rrhWTEr5Ty5KY5Z9LwzFf27w'; //'14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c'; 
const ranges = 'B2:F100'; // might need to set this
const apiKey = process.env.REACT_APP_API_KEY;
const ROWS= 'ROWS';
const sheetTitle = 'Exhibitions';

const extractImageId = (imageUrl) => {
  const parts = imageUrl.split('id=');
  const id = parts[1];
  return id;
};

export const darkTheme = createTheme({
  typography: {
      fontFamily: [
        'Inter',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Inter', sans-serif;
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

const updateSearch = async (exhibitions) => {
  const result = exhibitions.filter((e) => !currentexhibitions.includes(e))
  console.log(result)
  index.addDocuments(result) // when to update
    .then((res) => console.log(res))
  // await writeJsonFile('exhibitions.json', JSON.stringify(result))
}

const Home = () => {
    const [exhibitions, setExhibitions] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [archive, setArchive] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${sheetTitle}!${ranges}&key=${apiKey}&majorDimension=${ROWS}`);
            const data = await response.json();
            console.log(data.valueRanges[0].values)
            if (data.valueRanges[0].values.length > 0) {
              const exhibitions = data.valueRanges[0].values.map((e, index) => {
                console.log(e[0])
                return {
                  id: index,
                  name: e[0],
                  start: e[1],
                  end: e[2],
                  image: extractImageId(e[3]),
                  description: e[4]
                }
              });
              setExhibitions(exhibitions);
              const date = new Date();
              // exhibitions.map((e) => (console.log(Date.parse(e.start) > Date.parse(date))))
              const res = exhibitions.filter((e) => Date.parse(e.start) > Date.parse(date))
              setUpcoming(res)
              const arch = exhibitions.filter(x => !res.includes(x))
              setArchive(arch)
              //update search json here {id, name}
              // updateSearch(exhibitions)
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
                  <Typography sx={{position: "absolute", color: "white",bottom: "5%",left: "5%", fontSize: '5vw', width: '25%'
                  }} variant='h3'> Bee Cave Arts Foundation</Typography>
              </div>
            </Card>
            <Box sx={{ background:'linear-gradient(180deg, #FFF 0%, rgba(249, 249, 249, 0.59) 100%), #FFF;'}}>

              <Typography variant='h5' sx={{weight:'300', paddingY: '5%', paddingLeft: '5%'}}>
                Established in 2010, Bee Cave Arts Foundation invigorates the community and visitor experience through diverse public art initiatives, including the Bee Cave Sculpture Park, The Hive art center, and ongoing exhibitions and classes.
              </Typography>
            </Box>
            <Box sx={{ background:'linear-gradient(180deg, #FFF 0%, rgba(249, 249, 249, 0.59) 100%), #FFF;'}}>

            {
              (exhibitions.length > 0) && (
              <Grid container>
                <ExhibitionLink
                  key="Current Exhibition"
                  subtitle='CURRENT GALLERY EXHIBITION'
                  title={exhibitions[0].name}
                  date={`${exhibitions[0].start} - ${exhibitions[0].end}`}
                  description={exhibitions[0].description}
                  image={exhibitions[0].image}
                  order={false}
                ></ExhibitionLink>
              </Grid>
                
              )
            }
            
            <Grid container>
            {
                (upcoming) && (
                  upcoming.map((e) => (
                        <ExhibitionLink
                          key={e.name}
                          subtitle='UPCOMING EXHIBITION'
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
            </Box>
            <Box>
            <Typography variant='h6' sx={{paddingLeft: '5%', paddingY: '3%'}}>Exhibitions Archive</Typography>
              { (archive.length > 0) && (
                <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, md: 12}} direction="row" sx={{ paddingX: '3%' }}>
                  <Grid item xs={4}>
                    <ArchiveCard
                        key={archive[1].name}
                        title={archive[1].name}
                        date={`${archive[1].start} - ${archive[1].end}`}
                        image={archive[1].image}
                    ></ArchiveCard>
                  </Grid>
                  <Grid item xs={4}>
                  { (archive.length > 1) && (
                    <ArchiveCard
                        key={archive[2].name}
                        title={archive[2].name}
                        date={`${archive[2].start} - ${archive[2].end}`}
                        image={archive[2].image}
                    ></ArchiveCard>
                  )}
                  </Grid>
                  <Grid item xs={4}>
                  { (archive.length > 2) && (
                    <ArchiveCard
                        key={archive[3].name}
                        title={archive[3].name}
                        date={`${archive[3].start} - ${archive[3].end}`}
                        image={archive[3].image}
                    ></ArchiveCard>
                  )}
                  </Grid>
              </Grid>
              )}
              <Box display="flex" sx={{ paddingLeft: '5%', marginY: '3%', alignItems: 'center' }}>
                <ArrowForwardIcon></ArrowForwardIcon>
                <Link to={`/ExhibitionArchive`} style={{
                    textDecoration: 'none',
                    color: 'inherit', // This ensures the link inherits the color from its parent
                    transition: 'text-decoration 0.3s ease', 
                    fontWeight:700,
                    // Smooth transition for the underline
                    }} 
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    > Visit Archive</Link>
              </Box>
            </Box>
        <Footer/>

            

        </div>
        </ThemeProvider>
    )

}
export default Home;

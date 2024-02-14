import React, { useState, useEffect } from 'react';
import Gallery from '../Gallery';
import Exhibition from './Exhibition.js';
import { Link } from 'react-router-dom';

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
            <h1> Beecave </h1>
            {
                (pages) && (
                    pages.map((page) => (
                        <h1> <Link to={`/Exhibition/${page.title}`}>{"Exhibition " + page.title}</Link> </h1>
                    ))
                )
            }
            <h1> <Link to="/Exhibition">Current Exhibition</Link> </h1>
        </div>
    )

}
export default Home;

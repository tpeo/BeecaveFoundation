import React, { useState } from "react";
import { useNavigate } from "react-router";
import {IconButton,  TextField} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    //const history = useHistory();
    const navigate = useNavigate();

    const ranges = "B2:G6"; // might need to set this
    const apiKey = process.env.REACT_APP_API_KEY;
    const spreadsheetId = "1FbaWozLti_PIm2oZWX8rrhWTEr5Ty5KY5Z9LwzFf27w";
    var foundmatchingthing = false;

    const extractImageId = (imageUrl) => {
        const parts = imageUrl.split("id=");
        const id = parts[1];
        return id;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        // Make request to Google Sheets API to fetch exhibition and artwork data
        // const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Exhibitions!A:F&key=${apiKey}&majorDimension=ROWS`);
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Exhibitions!B2:G6&key=${apiKey}&majorDimension=ROWS`
        );

        const data = await response.json();
        //const exhibitions = data.valueRanges[0].values;
        const exhibitions = data.valueRanges[0].values.map((row) => row[0]);
        console.log("exhibitions " + exhibitions);
        const matchingExhibition = exhibitions.find(
            (exhibition) => exhibition.toLowerCase() === searchQuery.toLowerCase()
        );
        if (matchingExhibition) {
            // Redirect to exhibition page
            navigate(`/Exhibition/${matchingExhibition}`);
            foundmatchingthing = true;
        } else {
            // Check artwork sheets for matching artwork titles
            for (let i = 0; i < exhibitions.length; i++) {
                const exhibition = exhibitions[i];
                console.log("current testing exhibition " + exhibition);
                const artworkResponse = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${encodeURIComponent(
                        exhibition
                    )}!2:1000&key=${apiKey}&majorDimension=ROWS`
                );
                const artworkData = await artworkResponse.json();
                //console.log("artworkData " + artworkData);
                const artworks = artworkData.valueRanges[0].values.map((row) => row);
                //console.log("artworks " + artworks);
                //console.log("artworks [5]" + artworks[5]);
                // const matchingArtwork = artworks.find(
                //     (artwork) => artwork.toLowerCase() === searchQuery.toLowerCase()
                // );
                for (let j = 0; j < artworks.length; j++) {
                    const artwork = artworks[j];
                    console.log("artwork " + artwork);
                    if (artwork[5].toLowerCase() === searchQuery.toLowerCase()) {
                      var [blank, email, phone, firstName, lastName, title, price, size, imageId, type, approved] = artwork;
                    //   console.log(title + artwork[5]);
                    //   console.log(price + artwork[6]);
                    //   console.log(imageId + artwork[8]);
                      imageId= extractImageId(imageId);
                      //const detailsParams = `?title=${encodeURIComponent(title)}&imageId=${encodeURIComponent(imageId)}&price=${encodeURIComponent(price)}&size=${encodeURIComponent(size)}&type=${encodeURIComponent(type)}&approved=${encodeURIComponent(approved)}`;
                      navigate(`/details/${imageId}?title=${encodeURIComponent(title)}&imageId=${encodeURIComponent(imageId)}&price=${encodeURIComponent(price)}&size=${encodeURIComponent(size)}&type=${encodeURIComponent(type)}`);
                      foundmatchingthing = true;
                      break; 
                    }
                  }
                // console.log("matchingArtwork " + matchingArtwork);

                // if (matchingArtwork) {
                //     navigate(`/details/${artwork.imageId}?title=${encodeURIComponent(artwork.title)}&imageId=${encodeURIComponent(artwork.imageId)}&price=${encodeURIComponent(artwork.price)}&size=${encodeURIComponent(artwork.size)}&type=${encodeURIComponent(artwork.type)}`);
                //     foundmatchingthing = true;
                //     return; 
                // }
            }
            if (!foundmatchingthing) {
                alert("No matching artwork found in any exhibition.");
            }
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <TextField
                style ={{marginTop: "3%" }}
                type="text"
                size='small'
                variant="standard"
                placeholder="Search Exhibitions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton style ={{height: '2%'}} size='large' variant="text" type="submit"><SearchIcon/></IconButton>
        </form>
    );
};

export default SearchBar;

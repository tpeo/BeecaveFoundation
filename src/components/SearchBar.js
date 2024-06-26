import { MeiliSearch } from 'meilisearch'
// import exhibitions from './exhibitions.json'
import { useState } from 'react'
import {Box, Menu, MenuItem, TextField, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router'


export const client = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: 'aSampleMasterKey'
})
export const index = client.index('exhibitions')

async function search(query) {
    
    // index.addDocuments(movies) // when to update
        // .then((res) => console.log(res))
    const search = await index.search(query, {
        limit: 5
    })  
    // console.log(search)

    return search.hits
}



export default function SearchBarComponent() {
    const [value, setValue] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [searchRes, setSearchRes] = useState([]);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseNav = (e) => {
        setAnchorEl(null);
        console.log(e)
        navigate(`/Exhibition/${e.target.innerText}`)
    };

    const handleClose = (e) => {
        setAnchorEl(null);
    };

    const processSearch = async(e) => {
        // const event = e;
        handleClick(e); // how is this synchronized

        const results = await search(value)
        setSearchRes(results)
        if (results.length == 0) handleClose()
        // console.log(event.currentTarget)
    }



    return (
        <Box>
            <TextField 
                variant="standard" 
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                      processSearch(ev);
                      ev.preventDefault();
                    }
                  }}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
            />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                style: { width: '100%' }
                }}
            >
                {
                    searchRes.map((result) => (
                        <MenuItem onClick={(e) => {handleCloseNav(e)}}>{result.name}</MenuItem>
                    ))
                }

            </Menu>

        </Box>

        
    )
}
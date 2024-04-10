import { MeiliSearch } from 'meilisearch'
import movies from './movies.json'
import { Icon, TextField } from '@mui/material'
import { useState } from 'react'
import {IconButton, Box, Menu, MenuItem} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router'

const client = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: 'aSampleMasterKey'
})

async function search(query) {
    const index = client.index('movies')
    // index.addDocuments(movies) // when to update
        // .then((res) => console.log(res))
    const search = await index.search(query, {
        limit: 5
    })  
    // console.log(search)

    return search.hits
}

export default function SearchBar() {
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
        navigate(`/Exhibition/${e.outerText}`)
    };

    const handleClose = (e) => {
        setAnchorEl(null);
    };

    const processSearch = async(e) => {
        // const event = e;
        handleClick(e); // how is this synchronized

        const results = await search(value)
        setSearchRes(results)
        // console.log(event.currentTarget)
    }

    return (
        <Box>
            <TextField
                id="filled-helperText"
                // label="Helper text"
                defaultValue="search"
                // helperText="Some important text"
                variant="filled"
                onInput={(e) => {setValue(e.target.value)}}
            />
            <IconButton
                onClick={(e) => processSearch(e)}
            ><SearchIcon/></IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {
                    searchRes.map((result) => (
                        <MenuItem onClick={(e) => {handleCloseNav(e)}}>{result.title}</MenuItem>
                    ))
                }


            </Menu>
        </Box>

        
    )
}
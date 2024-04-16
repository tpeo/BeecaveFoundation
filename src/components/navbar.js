import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
//import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SearchBarComponent from './SearchBar';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'All Exhibitions', path: '/AllExhibitions' },
];

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const darkTheme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#000012",
  //     },
  //   },
  // });

  return (
    // <ThemeProvider theme={darkTheme}>
      <AppBar position="static" sx={{ bgcolor: "#F8F9FA", boxShadow:'none'}} >  
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                //color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{color:'black', textDecoration:'none', fontFamily:"Inter"}} component={Link} to={page.path}>{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                fontFamily: 'Inter',
                fontWeight: 500,
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <Link to='/' style={{textDecoration:'none', color:'inherit'}}>
              Bee Cave Arts Foundation Gallery
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  component={Link} // Use Link instead of 'a' tag
                  to={page.path}
                  sx={{ 
                    my: 2,  
                    color: 'black',
                    display: 'block',
                    fontFamily: 'Inter',
                    textTransform: 'capitalize',
                    fontWeight: 400,
                  }}
                >
                  {page.title}
                </Button>
              ))}
            
            </Box>
            {/* <SearchBarComponent/> */}

          </Toolbar>
        </Container>
      </AppBar>
    // </ThemeProvider>
  );
}

export default NavigationBar;

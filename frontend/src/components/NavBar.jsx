import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../img/logo_brujula.png";
import { Link as LinkRouter, useNavigate } from "react-router-dom"
import "../styles/navbar.css"
import { useSelector, useDispatch } from 'react-redux'
import usersActions from '../redux/actions/usersActions'


const pages = [{ name: 'Home', to: "/" }, { name: 'Cities', to: "/Cities" }];
const settings = [
  { name: 'Sign Up', to: "/Signup" },
  { name: 'Log In', to: '/Login' }]


const NavBar = () => {

  const user = useSelector(store => store.usersReducer.user)
  // console.log(user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function signOut() {
    dispatch(usersActions.signOut())
    navigate("/")
  }

  return (
    <AppBar className="container_nav" position="static" sx={{ backgroundColor: "#37474f", display: 'flex', justifyContent: "space-evenly" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: "space-evenly" }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, m: 1, mr: 6 }}>
            <img src={Logo} alt="img_logo" style={{ width: "6rem" }} />
          </Box>
          {/* MENU HAMBURGUESA */}
          <Box className='containerMenuHam' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              {/* MAPEO MENU HAMBURGUESA */}
              {pages.map((page, index) => (
                <LinkRouter className="navbar_1" to={page.to} key={index}>
                  <MenuItem onClick={handleCloseNavMenu} sx={{ width: 64}}>
                    <Typography className="menuIconButtonNavBarham" textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
          {/* LOGO */}
          <Box sx={{ display: { xs: 'flex', justifyContent: "center", alignItems: "center", md: 'none' }, m: 1, p: 1}}>
            <img src={Logo} alt="img_logo" style={{ width: "6rem" }} />
          </Box>
          {/*  MAPEO Menu Home & Cities  */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, }}> 
            {pages.map((page, index) => (
              <LinkRouter className="navbar_1" to={page.to} key={index}>
                <Button onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              </LinkRouter>
            ))}
          </Box>
              {/* BOX QUE CONTIENE MENU SIGNUP & LOGIN */}
          <Box sx={{ flexGrow: 0, mr: 0 }}>
            {/* AVATAR */}
            <div>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml:1 }}>
                {user ? <Avatar alt="photoUser" src={user.photoUser} /> : <Avatar src="../img_video/avatar.jpg" />}
              </IconButton>
            </div>
            <Menu
              sx={{ mt: '57px', ml: '1.2rem', mr: '2rem' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                width: 64
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* TERNARIO Y MEPAO DE SETTINGS */}
              {user ? (
                <Box >
                  <MenuItem  onClick={handleCloseUserMenu}>
                    <Typography className= 'logoutNav' sx={{ p: 0, color: '#37474f',}} textAlign="center"
                      onClick={signOut}>Sign Out</Typography>
                  </MenuItem>
                </Box>
              ) : settings.map((setting, index) => (
                <LinkRouter key={index} to={setting.to} onClick={handleCloseUserMenu}>
                  <Typography sx={{ width: "4.5rem", color: '#37474f', p:0.5 }} textAlign="center">{setting.name}</Typography>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;

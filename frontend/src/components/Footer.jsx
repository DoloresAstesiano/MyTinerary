import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from "../img/logo.png"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as LinkRouter } from "react-router-dom"

const pages = [{
  nombre: 'Home',
  to: "/"
},
{
  nombre: 'Cities',
  to: "/Cities"
}
];

const Footer = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#37474f" }}>
      <Container className="contedor_footer" maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: 'space-around', width: "100%" }}>
          <Box sx={{ display: { md: 'flex' } }}>
            <img src={Logo} alt="img_logo" style={{ width: "6rem" }} />
          </Box>
          <Box sx={{ display: { md: 'flex' }, justifyContent: "center", alignItems: "center" }}>
            {pages.map((page, index) => (
              <LinkRouter to={page.to} key={index}>
                <Button
                  key={index}
                  sx={{ color: 'white', display: 'block', fontFamily: "Open Sans", fontSize: "large", textAlign: "center" }}
                >
                  {page.nombre}
                </Button>
              </LinkRouter>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', heigth: "30%", flexDirection: { xs: 'column', md: 'row' }, }}>
            <Box>
              <FacebookIcon sx={{ m: 1 }}></FacebookIcon>
              <InstagramIcon sx={{ m: 1 }}></InstagramIcon>
            </Box>
            <Box>
              <TwitterIcon sx={{ m: 1 }}></TwitterIcon>
              <GitHubIcon sx={{ m: 1 }}></GitHubIcon>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }} >
        <LocationOnIcon ></LocationOnIcon>
        <p sx={{ fontSize: "4rem" }}> Argentina  </p>
        <p>| © 2022 Astesiano Dolores | </p>
        <p> All rights reserved</p>
      </Box>
    </AppBar>
  );
};
export default Footer;

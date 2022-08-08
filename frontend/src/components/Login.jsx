import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"
import { Link as LinkRouter, useNavigate } from "react-router-dom"
import GoogleSigIn from './GoogleSigIn';
import "../styles/login.css"

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = async (event) => { //cuando el usurario hace click se ejecuta la funcion 
    event.preventDefault();
    // console.log(event)
    const logedUser =
    {
      email: event.target[0].value,
      password: event.target[2].value,
      from: "form-Signup"
    }; 
    // console.log(logedUser)

    const res = await dispatch(usersActions.signInUser(logedUser))
    // console.log(res)
   
    if (res.success) {
      navigate('/')
    }
    event.target[0].value=''
    event.target[2].value= ''
  };

  return (
    <div className= 'containerLogin'>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Log in into your account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bg: "#37474f" }}
                className='buttonSigin'
              >
                Sign In
              </Button>
              <Box className= 'container_txt_googleButton_login'>
              <Box className="container_txt_or">Or continue with</Box>
              <GoogleSigIn />
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item className="txt_back_signup">
                  <LinkRouter  to="/SignUp">
                    Don't have an account? Sign Up
                  </LinkRouter>
                </Grid>
              </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

    </div>
  );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios"
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Link as LinkRouter, useNavigate } from "react-router-dom"
import GoogleSignUp from './GoogleSignUp';
import "../styles/signup.css"



const theme = createTheme();

export default function SignUp() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [country, setCountry] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line
    axios.get(`https://restcountries.com/v3.1/all`).then((api) => setCountry(api.data));
  }, []);

  const countrySelect = country.map(res => res.name.common).sort()

  const [selectCountry, setSelectCountry] = useState(null);

  function selected(event) {
    // console.log(event.target.value)
    setSelectCountry(event.target.value)
  }
  const handleSubmit = async (event) => { //cuando hacemos click en submit se crea la const userData
    event.preventDefault();
    // console.log(event)
  
    const userData =
    {
      nameUser: event.target[0].value,
      lastNameUser: event.target[2].value,
      photoUser: event.target[4].value,
      email: event.target[6].value,
      country: selectCountry,
      password: event.target[8].value,
      from: "form-Signup",
    };
    // console.log(userData)
    const res= await dispatch(usersActions.signUpUsers(userData))
    // console.log (res)
    if (res.from === "signup") {
      navigate('/Login')
    }
    event.target[0].value= ""
    event.target[2].value= ""
    event.target[4].value= ""
    event.target[6].value= ""
    event.target[8].value= ""

  };

  return (
    <Box className='containerSignup'>
      <Box className='container_txt_Select'>Select your country to continue registration</Box>
        <FormControl className='containerInputCountry'>
        <InputLabel id="demo-simple-select-label" className='inputCountry'>Country</InputLabel>
        <Select
          required
          fullWidth
          id="country"
          label="country"
          name="country"
          autoComplete="country"
          onChange={selected}
          defaultValue=""
        >
          <MenuItem value=""></MenuItem>
          {countrySelect && countrySelect.map((country, index) => <MenuItem key={index}
            value={country}>{country}</MenuItem>)}

        </Select>

      </FormControl>
      {selectCountry &&
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
                Create Account
              </Typography>
              <Typography component="h6" variant="h7">
                Personal Information
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      required
                      fullWidth
                      id="photoUser"
                      label="Photo User"
                      name="photoUser"
                      autoComplete="photoUser"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bg: "#37474f" }}
                  className='buttonSignup'
                >
                  Sign Up
                </Button>
                <Box className='container_txt_googleButton'>
                <Box container_txt_or_with >Or with</Box>
                <GoogleSignUp className='googlebutton'selectCountry={selectCountry} />
                </Box>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      }
      <LinkRouter className="txt_back_login" to="/Login">
        Already have an account? Sign in
      </LinkRouter>
    </Box>
  )
}



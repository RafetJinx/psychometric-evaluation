import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { Login } from '../../redux/actions/loginActions';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function LoginLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch(Login(username, password, navigate));
    } else {
      console.log('Lütfen kullanıcı adı ve şifreyi girin.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // bgcolor: '#E1F5FE', // Açık mavi tonunu burada belirleyebilirsiniz.
            padding: '20px',
            borderRadius: '10px',
          }}>

          <Typography component="h1" variant="h5">
            Giriş Yapın
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* Username TextField */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Kullanıcı Adı"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password TextField */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* "Remember Me" & "Forgot Your Password" Grid Items */}
            {/* <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Şifreni mi unuttun?
                </Link>
              </Grid>
            </Grid> */}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!username || !password}
            >
              GİRİŞ YAP
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

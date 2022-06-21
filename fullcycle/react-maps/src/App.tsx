import { useEffect, useRef } from "react";
import { Loader } from 'google-maps';

import { Button, CssBaseline, Grid, MenuItem, Select, ThemeProvider } from "@mui/material";
import { styled } from '@mui/material/styles';


import { Navbar } from "./components/Navbar";

import { theme } from './theme';
import { getCurentPosition } from "./util/geolocation";

const loader = new Loader(process.env.GOOGLE_MAPS_API_KEY);

const Form = styled('form')(({ theme: _theme }) => ({ margin: _theme.spacing(1) }));
const MapContainer = styled('div')(({ theme: _theme }) => ({ width: '100%', height: '100%' }));

export const App = () => {
  const mapRef = useRef<google.maps.Map>();

  useEffect(() => {
    (async () => {
      await loader.load();
      const position = await getCurentPosition({ enableHighAccuracy: true });
      const divMap = document.getElementById('map') as HTMLDivElement;
      mapRef.current = new google.maps.Map(divMap, {
        zoom: 15,
        center: position,
      });
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Grid container style={{ width: "100%", height: "100%" }}>
        <Grid item xs={12} sm={3}>
          <Form>
            <Select fullWidth displayEmpty defaultValue={""} >
              <MenuItem value="">
                <em>Selecione uma rota</em>
              </MenuItem>
              <MenuItem value="rota-1">
                Rota 1
              </MenuItem>
            </Select>
            <div style={{textAlign: 'center', margin: theme.spacing(1)}}>
              <Button type="submit" variant="contained" >Iniciar rota</Button>
            </div>
          </Form>
        </Grid>
        <Grid item xs={12} sm={9}>
          <MapContainer id="map" />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

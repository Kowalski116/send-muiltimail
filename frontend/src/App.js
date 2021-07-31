import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { CreateTest, Header } from './components'
import './styles.css'
import axios from 'axios'

function App() {
  axios.defaults.baseURL = 'http://localhost:5000';
  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>

      <Grid item container>
        <Container>
          <CreateTest />
        </Container>
      </Grid>
    </Grid>
  );
}

export default App;

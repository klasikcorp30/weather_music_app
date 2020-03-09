import React from 'react'
import Music from './components/Music/Music';
import Weather from './components/Weather/Weather';
import './App.css'
import { Container, Grid } from '@material-ui/core';
export default function App() {
    return (
        <div id="App"> 
        <Container style={{padding:140}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Music />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Weather />
                </Grid>
            </Grid>
         </Container>       
        </div>
    )
}

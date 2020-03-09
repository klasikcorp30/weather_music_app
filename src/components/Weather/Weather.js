import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RefreshIcon from '@material-ui/icons/Refresh';
import axios from 'axios';
import moment from 'moment';
import { Typography, Grid } from '@material-ui/core';



const styles = {
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "red",
  },
};


  


export default class RecipeReviewCard extends Component {
  state ={
    WeatherData:{},
    latitude:0,
    longitude:0,
    mainWeather: '',
    desc: "",
    city:"",
    hum:0,
    windSpeed:0
  }

  getData = () => {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=c5f6f0f0be71617d38bba796856d8312`)
    .then(res => this.setState({WeatherData: res.data}))
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({latitude: pos.coords.latitude, longitude: pos.coords.longitude})
    })
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=c5f6f0f0be71617d38bba796856d8312`)
    .then(res => this.setState({WeatherData: res.data}, () =>{
      this.setState({
        mainWeather: this.state.WeatherData.list[0].weather[0].main,
        city: this.state.WeatherData.city.name,
        desc: this.state.WeatherData.list[0].weather[0].description,
        speed: this.state.WeatherData.list[0].wind.speed,
        hum: this.state.WeatherData.list[0].main.humidity
      })
      console.log(this.state.WeatherData.list[0].weather[0].main)
    } ))

   
  }

  
  render(){
    return (
      <Card className={styles.root}>
        <CardHeader
          title={this.state.mainWeather}
          subheader={moment().format('MMMM Do YYYY, h:mm:a')}
        />
        <CardMedia
          className={styles.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>City: </Typography>
            <Typography>Weather Description: </Typography>
            <Typography>Wind Speed: </Typography>
            <Typography>Humidity: </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>{this.state.city}</Typography>
            <Typography>{this.state.desc}</Typography>
            <Typography>{this.state.windSpeed} MPH</Typography>
            <Typography>{this.state.hum}%</Typography>
          </Grid>
        </Grid>
         
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>
        <RefreshIcon onClick={this.getData} />
      </Card>
    );
  }
 
}

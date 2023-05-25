import { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const GetPlanets = () => {
    const [planets, setPlanets] = useState([]);
  
  
  
    useEffect(() => {
      const planetUrl = 'http://localhost:3000/planets';
      fetchPlanets(planetUrl)
    }, [])
  
  
    const fetchPlanets = (planetUrl) => {
      axios.get(planetUrl)
      .then((response) => {
        setPlanets(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  
  
  };
  
  export default GetPlanets;
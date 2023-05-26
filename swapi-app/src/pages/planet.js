import { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import axios from "axios";

const GetPlanets = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const planetUrl = "http://localhost:3000/planets";
    fetchPlanets(planetUrl);
  }, []);

  const fetchPlanets = (planetUrl) => {
    axios
      .get(planetUrl)
      .then((response) => {
        setPlanets(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderPlanetCards = () => {
    if (!planets) {
      return <div>No Planets found</div>;
    }

    return planets.map((planet, index) => (
      <Card key={index}>
        <CardActionArea>
          <CardContent>
            <Typography>Name: {planet.name}</Typography>
            <Typography>Rotation Period: {planet.rotation_period}</Typography>
            <Typography>Orbital Period: {planet.orbital_period}</Typography>
            <Typography>Diameter: {planet.diameter}</Typography>
            <Typography>Climate: {planet.climate}</Typography>
            <Typography>Gravity: {planet.gravity}</Typography>
            <Typography>Terrain: {planet.terrain}</Typography>
            <Typography>Population: {planet.population}</Typography>
            <Typography>Residents:</Typography>
            <ul style={{ fontSize: "15px" }}>
              {planet.residents.map((resident, index) => (
                <li key={index}>{resident}</li>
              ))}
            </ul>
          </CardContent>
        </CardActionArea>
      </Card>
    ));
  };

  return <div>{renderPlanetCards()}</div>;
};

export default GetPlanets;

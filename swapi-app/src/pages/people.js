import { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const GetPeople = () => {
  const [people, setPeople] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const url = `http://localhost:3000/people${location.search || ""}`;
    fetchPeople(url);
  }, [location]);

  const fetchPeople = (url) => {
    axios
      .get(url)
      .then((response) => {
        setPeople(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderCards = () => {
    if (!Array.isArray(people)) {
      return <div>Error: Invalid Sort By</div>;
    }
    if (!people) {
      return <div>No people found</div>;
    }
    return people.map((person, index) => (
      <Card key={index}>
        <CardActionArea>
          <CardContent>
            <Typography>Name: {person.name}</Typography>
            <Typography>Height: {person.height}</Typography>
            <Typography>Mass: {person.mass}</Typography>
            <Typography>Hair Color: {person.hair_color}</Typography>
            <Typography>Eye Color: {person.eye_color}</Typography>
            <Typography>Skin Color: {person.skin_color}</Typography>
            <Typography>Birth Year: {person.birth_year}</Typography>
            <Typography>Gender: {person.gender}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));
  };

  return <div>{renderCards()}</div>;
};

export default GetPeople;

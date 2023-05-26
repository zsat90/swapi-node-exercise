const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

const port = 3000;

app.use(cors());

const getSortValue = (person, sortBy) => {
  if (sortBy === "name") {
    return person.name;
  }
  if (sortBy === "mass") {
    return person.mass;
  }
  if (sortBy === "height") {
    return person.height;
  }
};

const getAllPlanets = async () => {
  let allPlanets = [];
  let nextPlanet = "https://swapi.dev/api/planets";

  try {
    while (nextPlanet) {
      const response = await axios.get(nextPlanet);
      const planets = response.data.results;

      const sortPlanets = planets.map(async (planet) => {
        const sortResidents = planet.residents.map(async (residentUrl) => {
          const residentResponse = await axios.get(residentUrl);
          return residentResponse.data.name;
        });

        const residentNames = await Promise.all(sortResidents);

        planet.residents = residentNames;
        return planet;
      });

      const planetInfo = await Promise.all(sortPlanets);

      allPlanets = allPlanets.concat(planetInfo);
      getNext = response.data.next;
    }
  } catch (error) {
    res.send(error);
  }

  return allPlanets;
};

const getAllPeople = async (sortBy) => {
  let allPeople = [];
  let nextPerson = "https://swapi.dev/api/people";

  try {
    while (nextPerson) {
      const response = await axios.get(nextPerson);
      allPeople = allPeople.concat(response.data.results);
      nextPerson = response.data.next;
    }

    if (sortBy) {
      allPeople.sort((a, b) => {
        const valueA = getSortValue(a, sortBy);
        const valueB = getSortValue(b, sortBy);

        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
    }
  } catch (error) {
    res.send(error);
  }

  return allPeople;
};

app.get("/", (req, res) => {
  res.send("Express is working! Yes sir");
});

app.get("/people", async (req, res) => {
  const sortBy = req.query.sortBy;

  if (sortBy && sortBy != "name" && sortBy != "height" && sortBy != "mass") {
    res.send("Invalid sort by. Must use name, height, or mass");
  }

  const people = await getAllPeople(sortBy);

  return res.json(people);
});

app.get("/planets", async (req, res) => {
  const planets = await getAllPlanets();

  return res.json(planets);
});

app.listen(port, () => {
  console.log("App listening on Port 3000");
});

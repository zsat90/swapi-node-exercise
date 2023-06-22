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

const sortMass = (mass) => {
  const parsedMass = mass.replace(',', '');
  return parseInt(parsedMass)
}

const getAllPlanets = async (nextPlanet = "https://swapi.dev/api/planets", allPlanets = []) => {
  
  try {
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
      
      if (response.data.next) {
          return getAllPlanets(response.data.next, allPlanets)
      } else {
        return allPlanets;
      }
    
  } catch (error) {
    console.log(error)
  }

};

const getAllPeople = async (sortBy, nextPerson = "https://swapi.dev/api/people", allPeople = []) => {
  
  try {
    
      const response = await axios.get(nextPerson);
      nextPerson = response.data.next;

      allPeople = allPeople.concat(response.data.results);
    
    

    if (sortBy) {
      allPeople.sort((a, b) => {
        const valueA = getSortValue(a, sortBy);
        const valueB = getSortValue(b, sortBy);

        if(valueA === 'unknown'){
          return 1;
        }
        if(valueB === 'unknown'){
          return -1;
        }

        if(sortBy === 'height'){
          const numValueA = parseInt(valueA);
          const numValueB = parseInt(valueB);

          if (numValueA < numValueB) {
            return -1;
          }
          if (numValueA > numValueB) {
            return 1;
          }
          return 0;
          
        } else if(sortBy === 'mass'){
          const numValueA = sortMass(valueA);
          const numValueB = sortMass(valueB);

          if (numValueA < numValueB) {
            return -1;
          }
          if (numValueA > numValueB) {
            return 1;
          }
          return 0;


        } else {
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      }
      });
    }

    if(response.data.next) {
      return getAllPeople(sortBy, response.data.next, allPeople)
    } else {
      return allPeople;
    }
  } catch (error) {
    console.log(error)
  }

  
};

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

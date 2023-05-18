import { useState, useEffect } from "react";
import axios from "axios";


const GetPeople = () => {
  const [people, setPeople] = useState("");

  useEffect(() => {
    fetchPeople();
  },[]);

  const fetchPeople = () => {
    axios
      .get("http://localhost:3000/people")
      .then((response) => {
        setPeople(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      }); 
  };

  const nameComponent = people.name.map((item, index) => {
    return <li key={index}>{item}</li>

  })
  

  return (

    <div>
      <h1>List of People</h1>
      <div>Name: {nameComponent}</div>
    </div>
  );
};
export default GetPeople;

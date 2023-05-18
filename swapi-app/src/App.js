import { useState, useEffect } from "react";
import axios from "axios";

const GetPeople = () => {
  const [people, setPeople] = useState("");

  useEffect(() => {
    fetchPeople();
  });

  const fetchPeople = () => {
    axios
      .get("http://localhost:3000/people")
      .then((response) => {
        setPeople(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div></div>;
};

export default GetPeople;

import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import axios from "axios";

const GetPeople = () => {
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    fetchPeople('http://localhost:3000/people');
  }, []);

  const fetchPeople = (url) => {
    // let url1 = 'http://localhost:3000/people/?page={currentPage}'
    axios
      .get(url)
      .then((response) => {
        setPeople(response.data.results);
        setPreviousPage(response.data.previous);
        setNextPage(response.data.next);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchPeople(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchPeople(previousPage);
    }
  };

  const renderCards = () => {
    return people.map((person, index) => {
      return (
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography>
                Name: {person.name}
                {/* Height: {person.height} */}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    });
  };

  return (
    <div>
      {renderCards()}
      <button onClick={handlePreviousPage} disabled={!previousPage}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={!nextPage}>
        Next
      </button>
    </div>
  );
};
export default GetPeople;

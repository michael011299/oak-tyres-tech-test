import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";
import { getBeers } from "../ApiCalls";
import "../CSS/Main.css";

const MainBeerSection = () => {
  const [KegList, setKegList] = useState([]);
  const [Page, setPage] = useState("");
  const [PerPage, setPerPage] = useState("");

  const pageChange = (event) => {
    if (event.target.value > 0) {
      setPage(`?page=${event.target.value}`);
      setPerPage("");
    }
  };

  const resultsNumberChange = (event) => {
    if (event.target.value > 0) {
      setPerPage(`?per_page=${event.target.value}`);
      setPage("");
    }
  };

  useEffect(() => {
    getBeers(Page, PerPage).then((beers) => {
      setKegList(beers);
    });
  }, [Page, PerPage]);

  return (
    <>
      <h2 id="pageTitle">Beer</h2>

      <input type="text" placeholder="Page Number" onChange={pageChange} />
      <input
        type="text"
        placeholder="Page Size"
        onChange={resultsNumberChange}
      />

      <div id="beerSection">
        {KegList.map((beer) => {
          return (
            <Card id={beer.id} key={beer.id} className="beerCard">
              <Card.Title id="beerTitle">{beer.name}</Card.Title>
              <Card.Text id="beerTagline">{beer.tagline}</Card.Text>
              <Image id="beerImage" src={beer.image_url}></Image>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default MainBeerSection;
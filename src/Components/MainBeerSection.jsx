import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { getBeers } from "../ApiCalls";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../CSS/Main.css";

const MainBeerSection = () => {
  const [KegList, setKegList] = useState([]);
  const [Page, setPage] = useState("");
  const [PerPage, setPerPage] = useState("");
  const [Loading, setLoading] = useState(true);

  const pageChange = (event) => {
    if (event.target.value > 0) {
      setPage(`?page=${event.target.value}`);
    }
  };

  const resultsNumberChange = (event) => {
    if (event.target.value > 0) {
      setPerPage(`&per_page=${event.target.value}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBeers(Page, PerPage).then((beers) => {
      setKegList(beers);
      setLoading(false);
    });
  }, [Page, PerPage]);

  // const popUp = (beer) => {
  //   return (

  //   );
  // };

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
        {Loading ? (
          <p>Loading... </p>
        ) : KegList.length === 0 ? (
          <p>No Results, try a lower page number!</p>
        ) : (
          KegList.map((beer) => {
            return (
              <Card id={beer.id} key={beer.id} className="beerCard">
                <Card.Title id="beerTitle">{beer.name}</Card.Title>
                <Card.Text id="beerTagline">{beer.tagline}</Card.Text>
                <Image id="beerImage" alt={beer.name} src={beer.image_url} />
                <Popup
                  id="popup"
                  trigger={
                    <Button id="singleBeerButton">More Beer Info</Button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div id="modal">
                      <button className="close" onClick={close}>
                        &times;{" "}
                      </button>

                      <Card.Title id="modalTitle">{beer.name}</Card.Title>
                      <Card.Text id="modalTagline">{beer.tagline}</Card.Text>
                      <Card.Text id="modalText">
                        First Brewed: {beer.first_brewed}
                      </Card.Text>
                      <Image
                        id="beerImage"
                        alt={beer.name}
                        src={beer.image_url}
                      />
                      <Card.Text id="modalText">{beer.description}</Card.Text>
                      <Card.Text id="modalText">
                        Brewers Tips: <br></br>
                        {beer.brewers_tips}
                      </Card.Text>
                    </div>
                  )}
                </Popup>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
};

export default MainBeerSection;

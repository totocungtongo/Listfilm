import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbars from "./navbar.jsx";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


function App() {
  const [data1, setData1] = useState([]);
  const getData = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/popular?api_key=e37c79c53f9d7b138c1790e896ed6cb1&language=en-",
    }).then(function (response) {
      setData1(response.data.results);
    });
  };
  
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <Navbars></Navbars>
      <Container className="cardPlace">
        <Row>
          {data1.map((item, index) => {
            return (
              <Col key={index}>
                <Card  className="cards">
                  <Card.Img
                    className="card-img-top"
                    variant="top"
                    src={`${process.env.REACT_APP_IMG_URL}${item.poster_path}`}
                    alt="test"
                    style={{ width: "100%" }}
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{item.title}</Card.Title>
                    <Card.Text className="card-text">
                      movie id:{item.id}
                    </Card.Text>
                    <Card.Text className="card-text">{item.overview}</Card.Text>
                    <Card.Text className="card-text">
                      Watched: {parseInt(item.popularity)} time
                    </Card.Text>

                    <a
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                      target="_blank"
                      rel="noreferrer"
                      className="btn mr-2"
                    >
                      <i className="bi bi-play-circle"></i> Trailer
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;

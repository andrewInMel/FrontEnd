import React from "react";
import logo from "../../imgs/logo.jpg";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./greating.css";
import { Container, Row, Col } from "react-bootstrap";

function greating() {
  return (
    <div>
      <div>
        <img src={logo} alt="Logo" />
      </div>

      <Container fluid="md">
        <Row>
          <Col>
            <p className=""> Personal CRM </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="">Our goal is to make staying connected easy</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Link className="btn" to="/Signin">
              Sign In
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link className="btn" to="/SignUp">
              Sign Up
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default greating;

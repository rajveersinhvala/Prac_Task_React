import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <h1 style={{ color: "white" }}>Search & Pagination</h1>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;

import React from "react";
import { Container } from "react-bootstrap";
import NavbarApp from "./components/navbar";
import { useSelector } from "react-redux";

const Class = () => {

  const user = useSelector(state => state.AuthReducer.user)

  return (
    <Container fluid className='p-0 d-flex flex-column position-absolute h-100'>
      <NavbarApp user={user} />
    </Container>
  );
};

export default Class;

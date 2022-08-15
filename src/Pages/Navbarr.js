import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MyContext } from '../App';
import {useContext} from 'react'

const Navbarr = () => {
  const Context = useContext(MyContext)

  const searchButton = () => {
    Context.setMarket(Context.search)
    Context.setSearch((prev) => {
      return prev = ''
    })
  }

  return (
      <Navbar bg="dark" expand="lg" variant='dark' style={{
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1
        }} >
        <Container fluid>
          <Navbar.Brand  as={Link} to="/">ProMarket</Navbar.Brand>
          <Navbar.Brand style={{ position: 'absolute',marginLeft: 200}}  >ОДЕЖДА для <span style={{color: 'red'}}>МОЛОДЕЖИ </span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px', marginLeft: 740 }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">Главная</Nav.Link>
              <Nav.Link as={Link} to="/basket">Корзина ({Context.count.length})</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Что ищем?"
                className="me-2"
                aria-label="Search"
                value={Context.search}
                onChange={(e) => Context.setSearch(e.target.value)}
              />
              <Button variant="outline-success" onClick={searchButton}>Найти</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Navbarr;

import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Modal from "./components/modal";
import AddTaks from "./components/AddTaks";
import Taks from "./components/Task";
import firebase from "./config/firebase";
import { map } from "lodash";
import "firebase/firestore";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./App.scss";

const db = firebase.firestore(firebase);

function App() {
  const [tasks, setTasks] = useState(null);
  const [recargar, setRecargar] = useState(false);

  useEffect(() => {
    db.collection("tasks")
      .orderBy("completed") // ordenar en firebase
      .get()
      .then((response) => {
        const arrayTasks = [];
        map(response.docs, (task) => {
          const data = task.data();
          data.id = task.id;
          arrayTasks.push(data);
        });
        setTasks(arrayTasks);
        setRecargar(false);
      });
  }, [recargar]);


  return (
    <React.Fragment>
      <Navigation />

      <Container>
        <Row className="todo">
          <Col
            className="todo__title d-flex justify-content-around"
            xs={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
          >
            <h2>Today</h2>
            <Modal />
          </Col>
          <Col
            className="todo__list"
            xs={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
          >
            {!tasks ? (
              <div className="loading">
                <Spinner animation="border" />
                <span> Cargando... </span>
              </div>
            ) : tasks.length === 0 ? (
              <h4>No hay Tareas</h4>
            ) : (
              map(tasks, (ev_task) => (
                <Taks key={ev_task.id} ev_task={ev_task}
                setRecargar={setRecargar}
                />
              ))
            )}
          </Col>
          <Col
            className="todo__input"
            xs={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
          >
            <AddTaks setRecargar={setRecargar} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;

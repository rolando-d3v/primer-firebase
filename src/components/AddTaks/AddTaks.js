import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { isEmpty } from "lodash";
import firebase from "../../config/firebase";
import "firebase/firestore";
import arrow from "../../img/arrow.svg";
import "./AddTaks.scss";

const db = firebase.firestore(firebase);

export default function AddTaks({setRecargar}) {
  const [task, setTask] = useState("");

  const cargarDatos = (e) => setTask(e.target.value);

  const addTask = (e) => {
    e.preventDefault();
    if (!isEmpty(task)) {
      db.collection("tasks")
        .add({
          name: task,
          completed: false,
        })
        .then(() => {
          setTask("");
          setRecargar(true)
        });
    }
  };
  return (
    <Form onSubmit={addTask} className="add-task">
      <InputGroup className="mb-3">
        <input
          type="text"
          placeholder="Ingresa Tarea"
          value={task}
          onChange={cargarDatos}
        />
        <Button variant="outline-primary" type="submit">
          <img src={arrow} alt="arrow" />
        </Button>
      </InputGroup>
    </Form>
  );
}

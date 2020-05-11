import React from "react";
import Check from "../../img/chekc.svg";
import Check2 from "../../img/check2.svg";
import Delete from "../../img/delete.svg";
import firebase from "../../config/firebase";
import "firebase/firestore";
import "./Task.scss";

const db = firebase.firestore(firebase);

export default function Task({ ev_task, setRecargar }) {
  const { name, id, completed } = ev_task;

  // actualizar lista de tareas con true o false
  const completeTasks = () => {
    db.collection("tasks")
      .doc(id)
      .update({
        completed: !ev_task.completed,
      })
      .then(() => {
        setRecargar(true);
      });
  };

  // eliminar tarea
  const eliminarTask = () => {
    db.collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        setRecargar(true);
      });
  };

  return (
    <div className="task">
      <div>
        {completed === true ? (
          <img src={Check2} alt="check" onClick={completeTasks} />
        ) : (
          <img
            src={Check}
            alt="check"
            onClick={completeTasks}
            className={completed === true ? "completado" : ""}
          />
        )}
      </div>
      <div>{name} </div>
      <div>
        <img src={Delete} alt="check" onClick={eliminarTask} />
      </div>
    </div>
  );
}

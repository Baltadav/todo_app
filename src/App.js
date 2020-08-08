import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {  
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //comunicacion con la base de datos : Agregar o quitar
  useEffect(() => {
    //se activa cuando se carga app.js
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, text: doc.data().text})));
    })
  }  , []);

  const addTodo = (event) => {
    //Esto pasa con el click del boton
    event.preventDefault();
    
    //Agrega la tarea del input a la base de datos
    //Agrega timestamp a la base de datos
    db.collection('todos').add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setInput(''); //resetea el input
  }

  return (
    <div className="App">
      <h1 className="App__title">Lista de tareas</h1>
      <form>
        <FormControl>
          <InputLabel >Escribe una tarea</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <br></br>
        <br></br>
        <Button disabled ={!input} variant="contained" color="primary" type="submit" onClick={addTodo} >
          Añade una tarea
        </Button>
      </form>

      <ul className="App__ul">
        {todos.map(todo =>(
          <Todo todo={todo}/>
        ))}
      </ul>

    </div>
  );
}

export default App;

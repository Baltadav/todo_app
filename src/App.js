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
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    })
  }  , []);

  const addTodo = (event) => {
    //Esto pasa con el click del boton
    event.preventDefault();
    
    //Agrega el todo del input a la base de datos
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    //setTodos([...todos, input]); *Local
    setInput(''); //resetea el input
  }

  return (
    <div className="App">
      <h1>TO-DO List</h1>

      <form>
        <FormControl>
          <InputLabel >Escribe un To-Do</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <br></br>
        <br></br>
        <Button disabled ={!input} variant="contained" color="primary" type="submit" onClick={addTodo} >
          Add Todo
        </Button>
      </form>

      <ul className="blabla">
        {todos.map(todo =>(
          <Todo todo={todo} />
        ))}
      </ul>

    </div>
  );
}

export default App;

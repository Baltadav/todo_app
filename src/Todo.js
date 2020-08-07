import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Modal, Button } from '@material-ui/core';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import './Todo.css';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3) 
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const updateTodo = (event) => {
        event.preventDefault();

        //Update todo width new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge : true});

        setOpen(false);
    }
            
    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>Modal</h1>
                <input placeholder={props.todo.todo} value = {input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
        <List >
            <ListItem>
                <ListItemAvatar> 
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary='sdsd'/>
            </ListItem>
            <DeleteForeverIcon onClick={() => db.collection('todos').doc(props.todo.id).delete()} className="todo__list delete"/>
            <Button onClick={e => setOpen(true)} className="todo__list">Edit</Button >
        </List>
        </>
    )
}

export default Todo;    
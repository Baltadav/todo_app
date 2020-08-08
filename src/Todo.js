import React, { useState } from 'react';
import db from './firebase';
import firebase from 'firebase';
import { List, ListItem, ListItemText, ListItemAvatar, Modal, Button, Fab, Input } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import './Todo.css';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        float:"right",
        position: 'absolute',
        top: '-40px'
      },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

      },
    paper: {
      position: 'absolute',
      width: '30%',
      padding: 10,
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
        
        //Actualiza todo con los datos ingresados en el MODAL
        db.collection('todos').doc(props.todo.id).set({
            text: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge : true});

        setInput('');
        setOpen(false);
    }
    
    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)} 
        aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" 
        className={classes.modal}>
            <div className={classes.paper}>
                <h1 className="Modal__Title">Editar tarea</h1>
                <form className="Modal__Form">
                    <Input placeholder={props.todo.text} value = {input} 
                    onChange={event => setInput(event.target.value)} 
                    className="Modal__Input" />
                    <Button disabled ={!input} 
                    onClick={updateTodo} 
                    className="Modal__Button"
                    type="submit">Actualizar</Button>
                </form>
            </div>
        </Modal>
        <List className="List">
            <ListItem>
                <ListItemAvatar> 
                </ListItemAvatar>
                <ListItemText primary={props.todo.text} secondary='Date'/>
                <Fab color="primary" aria-label="edit" size="small" 
                className="List__Edit" 
                style={{marginRight: 20}} >
                    <EditIcon onClick={e => setOpen(true)}/>
                </Fab>
                <Button onClick={() => db.collection('todos').doc(props.todo.id).delete()} 
                    variant="contained"
                    color="secondary"
                    className="List__Delete"
                    style={{width : "10%"}}
                    startIcon={<DeleteIcon style={{fontSize: "170%"}} />}> 
                    Borrar</Button>
            </ListItem>
        </List>
        <br></br>
        </>
    )
}

export default Todo;    
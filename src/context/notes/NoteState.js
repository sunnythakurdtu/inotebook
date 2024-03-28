import Notecontext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  // const s1={
  //     "name": "sunny",
  //     "class":'VII'
  //       }
  //    const [state,setState]=useState(s1);
  //    const update=()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name":"Golu",
  //             "class":"VIII"
  //         })
  //     },1000)
  //    }
  const host = "http://localhost:5000";
  const note = [];
  const [notes, setNotes] = useState(note);
  // get all note
  const fetchNote = async () => {
    //Fetch API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":localStorage.getItem('token')
          ,
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    //Fetch API
    const response = await fetch('http://localhost:5000/api/notes/addnotes', {
      method: "POST",
      headers: {
        "auth-token":localStorage.getItem('token'),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({title,description,tag}),
    });

    const note = await response.json();
    console.log("add a new node");
    setNotes(notes.concat(note));
  };
  //Delete a note
  const deleteNote = async (id) => {
    console.log("deleting the notes of id" + id);
    //Fetch API
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const data = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //update a note
  const updatenote = async (id, title, description, tag) => {
    //Fetch API
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    
    const data = response.json();
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      {
        if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
        }
        
      }
      
    }
    setNotes(newNotes);
  };
  return (
    <Notecontext.Provider
      value={{ notes, addNote, deleteNote, updatenote, fetchNote }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};
export default NoteState;

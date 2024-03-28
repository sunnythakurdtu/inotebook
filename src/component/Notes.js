import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const history=useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchNote,updatenote } = context;
  
  useEffect(() => {
    if(localStorage.getItem('token')){
    fetchNote();}
    else{
      history("/login")
    }
  }, []);
  
  const ref = useRef(null);
  const refclose=useRef(null);
  const [note, addnote] = useState({id:"",etitle: "", edescription: "", etag: "" });
  const updateNote = (currentNote) => {
    ref.current.click();
    addnote({
        id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    updatenote(note.id,note.etitle,note.edescription,note.etag);
   
  };
  const handleclick = (e) => {
    console.log("update Note",note);
    updatenote(note.id,note.etitle,note.edescription,note.etag);
    e.preventDefault();
    refclose.current.click();
    props.showalert("updated successfully","success");
  };
  const onChange = (e) => {
    addnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <AddNote showalert={props.showalert}/>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="row mb-3">
                  <label htmlFor="title" className="col-sm-2 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange} minLength={5} required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="description"
                    className="col-sm-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange} minLength={5} required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="tag" className="col-sm-2 col-form-label">
                    tag
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange} minLength={5} 
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5||note.edescription.length<5||note.etag.length<5}
                type="button"
                className="btn btn-primary "
                onClick={handleclick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3 className=" row">Your Notes</h3>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} showalert={props.showalert}/>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;

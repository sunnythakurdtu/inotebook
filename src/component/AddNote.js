import React,{useContext,useState} from 'react'
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,addnote]=useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault();
addNote(note.title,note.description,note.tag);
props.showalert("Added Successfully","success")
addnote({title:"",description:"",tag:""})
    }
    const onChange=(e)=>{
addnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <form className="my-3">
          <div className="row mb-3">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required/>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="description" name="description"  onChange={onChange} value={note.description} minLength={5} required
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
                id="tag" name="tag"  onChange={onChange} value={note.tag} minLength={5} required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleclick} disabled={note.title.length<5||note.description.length<5||note.tag.length<5}>
           Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;

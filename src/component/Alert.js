import React from 'react'

export default function Alert(props) {
    const capitalize=(word)=>{
      if(word==='danger'){
        word="Error";
      }
        const d=word.toLowerCase();
        return d.charAt(0).toUpperCase()+d.slice(1);
    }
  return (
    <div style={{height:'50px'}}>
    {props.alert && <div class={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
   <strong>{capitalize(props.alert.type)}</strong>:{props.alert.msg}
  
  </div>}
  </div>
  )
}
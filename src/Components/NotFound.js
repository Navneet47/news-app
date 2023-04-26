import React from 'react'

function NotFound(props) {
  return (
    <div style={{display:props.dis}} className='container text-center'>
       <h1>No {props.text} headlines found!</h1>
    </div>
  )
}
export default NotFound;
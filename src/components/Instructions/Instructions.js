import React from 'react'
import "./Instructions.css"


export default function Instrutions({closed, update}) {
  console.log(closed)
  return (
    <div className={`${closed ? "closed":""} instructions text-center center-align`}>
        <div className="container container-instructions">
            <h3 className={`white-text ${closed ? "none":""}`}>{update}</h3>
        </div>
    </div>
  )
}

import React from 'react'
import "./Instructions.css"


export default function Instructions({closed}) {
  return (
    <div className={`${closed ? "closed":""} instructions text-center center-align`}>
        <div className="container container-instructions">
            <h3 className={`white-text ${closed ? "none":""}`}> Instructions: click characters to get points, but don't click the same one twice, or you'll have to start over again.</h3>
        </div>
    </div>
  )
}

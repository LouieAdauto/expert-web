import React from 'react'

interface Logoprops{fontSize:number}

function Logo({fontSize}:Logoprops) {
  return (
    <div style= {{textAlign:"center" ,marginBottom:0}}><p className="mina-bold" style={{fontSize:fontSize, color:"#fa9943", marginBottom:0}}>
        expert
        </p></div>
  )
}

export default Logo
import React from 'react'

interface Logoprops{fontSize:number}

function Logo({fontSize}:Logoprops) {
  return (
    <div style= {{textAlign:"center" ,marginBottom:0}}><p className="mina-bold" style={{fontSize:fontSize, color:"#fa9943", marginBottom:0}}>
        expert
        </p>
        <p className='pl-5 mina-bold text-[#fa9943]'>los expertos en expertos</p>
        </div>
  )
}

export default Logo
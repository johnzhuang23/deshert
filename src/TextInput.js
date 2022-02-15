import React, { Component } from "react";
import { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Text } from "react-konva";
import Konva from "konva";

export default function TextInput(props) {
  let [textState, setTextState] = useState({
    isDragging: false,
    x: 20,
    y: 20,
    value: 80,
  });

  return (  
  

    <Text
      name="text"
      text={props.content}
      x={textState.x}
      y={textState.y}
      fontSize={props.fontSize}
      draggable
      fill={props.fill}
      
      onDragStart={() => {
        setTextState({
          ...textState,
          isDragging: true,
        });
      }}
      setZIndex="3"
      onDragEnd={(e) => {
        setTextState({
          ...textState,
          isDragging: false,
          x: e.target.x(),
          y: e.target.y(),
        });
        
      }
    }
         
    />
  ); 
}

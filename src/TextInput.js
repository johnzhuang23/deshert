import React, { Component } from "react";
import { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Text } from "react-konva";
// import Inputbox from "./Inputbox.js"

import Konva from "konva";
// import { getByPlaceholderText } from '@testing-library/react';

export default function Textinput(props) {
  let [textState, setTextState] = useState({
    isDragging: false,
    x: 20,
    y: 20,
  });

  return (
    <Text
      text={props.content}
      x={textState.x}
      y={textState.y}
      fontsize={30}
      // value={textState.value}
      draggable
      fill={textState.isDragging ? "green" : "black"}
      onDragStart={() => {
        setTextState({
          ...textState,
          isDragging: true,
        });
      }}
      setZIndex="3"
      onDragEnd={(e) => {
        setTextState({
          isDragging: false,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    />
  );
}

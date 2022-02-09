import React, { Component } from 'react';
import { useState } from 'react'
import { render } from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';
import Konva from 'konva';
import TransformerComponent from "./TransformerComponent.js";


export default function Textinput(props) {
    let [textState, setTextState] = useState({
        fontsize: 30,
        isDragging: false,
        x: 20,
        y: 20,
        fill: 'red',
    })

    let [selectedShapeName, setSelectedShapeName] = useState({})

    // const selectShapeName = (e) => {
    //     return setSelectedShapeName(e.target.getStage())
    // }


    const handleStageMouseDown = e => {
        if (e.target === e.target.getStage()) {
            setSelectedShapeName({
                selectedShapeName: ""
            });
            return;
        }
        const clickedOnTransformer =
            e.target.getParent().className === "Transformer";
        if (clickedOnTransformer) {
            return;
        }

        const name = e.target.name();
        if (name) {
            setSelectedShapeName({
                selectedShapeName: name
            });
        } else {
            setSelectedShapeName({
                selectedShapeName: ""
            });
        }
    };

    // this.state = {
    //     material: "light",
    //     color: { r: 255, g: 255, b: 255 },
    //     textOn: false,
    //     text: "",
    //     textColor: "#000000",
    //     textScale: [],
    //     logoOn: false,
    //     logo: {
    //       uploadedFileCloudinaryUrl: "",
    //       uploadedFile: null
    //     },
    //     clothing: "tshirt",
    //     price: 0,
    //     selectedShapeName: "",
    //     logoScale: []
    //   };







    return (
        <Stage width={200} height={400} style={{ margin: "130px 160px", border: "1px solid red", zIndex: "990", position: "absolute", offset: "10" }}>
            <Layer >
                <Text
                    text={props.content}
                    x={textState.x}
                    y={textState.y}
                    fontSize={textState.fontsize}
                    draggable
                    // fill={textState.isDragging ? 'green' : `${props.textcolor}`}
                    fill={textState.fill}
                    onDragStart={() => {
                        setTextState({
                            ...textState,
                            isDragging: true,
                        });
                    }}
                    setZIndex="3"
                    onDragEnd={e => {
                        setTextState({
                            ...textState,
                            isDragging: false,
                            x: e.target.x(),
                            y: e.target.y(),
                        });
                    }}
                />

            </Layer>
        </Stage >
    );
}
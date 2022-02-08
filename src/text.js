import React, { Component } from 'react';

import { render } from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';

import Konva from 'konva';


export default class TextReader extends Component {
    state = {
        isDragging: false,
        fontSize: 30,
        x: 110,
        y: 20,
        a: 50,
        b: 40
    };


    render() {
        return (
            <Stage width={200} height={600} style={{ margin: "100px", border: "1px solid red", zIndex: "990", position: "absolute", offset: "10" }}>
                <Layer >
                    <Text
                        text="move the text"
                        x={this.state.x}
                        y={this.state.y}
                        draggable
                        fill={this.state.isDragging ? 'green' : 'black'}
                        onDragStart={() => {
                            this.setState({
                                isDragging: true,
                            });
                        }}
                        setZIndex="3"
                        onDragEnd={e => {
                            this.setState({
                                isDragging: false,
                                x: e.target.x(),
                                y: e.target.y(),
                            });
                        }}
                    />
                </Layer>
                <Layer >
                    <Text
                        text="another one"
                        x={this.state.a}
                        y={this.state.b}
                        draggable
                        fill={this.state.isDragging ? 'green' : 'black'}
                        onDragStart={() => {
                            this.setState({
                                isDragging: true,
                            });
                        }}
                        setZIndex="3"
                        onDragEnd={e => {
                            this.setState({
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
}

// render(<TextReader />, document.getElementById('grid-right-side'));

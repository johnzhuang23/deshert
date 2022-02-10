import React, { Component } from "react";
import { render } from "react-dom";
import Konva from "konva";
import { Stage, Layer, Rect, Transformer } from "react-konva";

export default class Rectangle extends React.Component {
  handleChange = e => {
    const shape = e.target;
    // take a look into width and height properties
    // by default Transformer will change scaleX and scaleY
    // while transforming
    // so we need to adjust that properties to width and height
    this.props.onTransform({
      x: shape.x(),
      y: shape.y(),
      width: shape.width() * shape.scaleX(),
      height: shape.height() * shape.scaleY(),
      rotation: shape.rotation()
    });
  };
  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        // force no scaling
        // otherwise Transformer will change it
        scaleX={1}
        scaleY={1}
        fill={this.props.fill}
        name={this.props.name}
        // save state on dragend or transformend
        onDragEnd={this.handleChange}
        onTransformEnd={this.handleChange}
        draggable
      />
    );
  }
}

export default class TransformerComponent extends Component {
  constructor(props) {
    super(props);

    this.checkNode = this.checkNode.bind(this);
  }

  componentDidMount() {
    this.checkNode();
    this.transformer.find("Rect").fill("white");
    this.transformer.find("Rect").width(9);
    this.transformer.find("Rect").height(9);
    this.transformer.find("Rect").cornerRadius(1);
    this.transformer.find("Shape").stroke("#f3f4f4");
    this.transformer.find("Shape").strokeWidth(1);
    this.transformer.find(".back").sceneFunc(ctx => {
      const tr = this.transformer;
      const shape = this.transformer.find(".back")[0];
      const padding = tr.getPadding();
      ctx.beginPath();
      ctx.rect(
        -padding,
        -padding,
        shape.width() + padding * 2,
        shape.height() + padding * 2
      );
      ctx.moveTo(shape.width() / 2, shape.height() + padding);
      if (tr.rotateEnabled()) {
        ctx.lineTo(
          shape.width() / 2,
          shape.height() +
            tr.rotateAnchorOffset() * Konva.Util._sign(shape.height())
        );
      }

      ctx.fillStrokeShape(shape);
    });
    const shape = this.transformer.find(".back")[0];
    this.transformer
      .find(".rotater")
      .y(shape.height() + this.transformer.rotateAnchorOffset());
  }

  componentDidUpdate() {
    this.checkNode();
  }

  checkNode() {
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;

    const selectedNode = stage.findOne("." + selectedShapeName);
    if (selectedNode === this.transformer.node()) {
      return;
    }

    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <Transformer
        ref={node => {
          this.transformer = node;
        }}
        keepRatio={false}
        rotateAnchorOffset={25}
      />
    );
  }
}

class App extends Component {
  state = {
    rectangles: [
      {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: "red",
        name: "rect1"
      },
      {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: "green",
        name: "rect2"
      }
    ],
    selectedShapeName: ""
  };
  handleStageMouseDown = e => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ""
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    const rect = this.state.rectangles.find(r => r.name === name);
    if (rect) {
      this.setState({
        selectedShapeName: name
      });
    } else {
      this.setState({
        selectedShapeName: ""
      });
    }
  };
  handleRectChange = (index, newProps) => {
    const rectangles = this.state.rectangles.concat();
    rectangles[index] = {
      ...rectangles[index],
      ...newProps
    };

    this.setState({ rectangles });
  };
  render() {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={this.handleStageMouseDown}
      >
        <Layer>
          {this.state.rectangles.map((rect, i) => (
            <Rectangle
              key={i}
              {...rect}
              onTransform={newProps => {
                this.handleRectChange(i, newProps);
              }}
            />
          ))}
          <TransformerComponent
            selectedShapeName={this.state.selectedShapeName}
          />
        </Layer>
      </Stage>
    );
  }
}

render(
  <App style={{ background: "black" }} />,
  document.getElementById("root")
);
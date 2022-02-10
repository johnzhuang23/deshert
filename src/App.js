import "./App.css";
import "./Sticker.css";
import React from "react";
import { useState } from "react";
import tshirt from "./shirtbackground.png";
import eleven from "./images/eleven.png";
import Picture from "./Picture.js";
import TextTool from "./TextTool.js";
import TextInput from "./TextInput.js";
import Sticker from "./Sticker.js";
import Draw from "./Draw.js";
import { Stage, Layer, Text, Image, Line } from "react-konva";
import Konva from "konva";

function App() {
  let [content, setContent] = useState("");
  const handleChange = (e) => {
    return setContent(e.target.value);
  };

  let [textcolor, setTextColor] = useState("");
  const handleTextColor = (textColorName) => {
    return () => {
      setTextColor(textColorName);
    };
  };

  let [color, setColor] = useState("");
  const addColor = (colorName) => {
    return () => {
      setColor(colorName);
    };
  };

  // ...

  //draw=====================//
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
  // const [drawColor, setDrawColor] = React.useState('stroke');

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  let [drawingEnabled, setDrawingEnabled] = useState(false);

  const handleMouseDown = (e) => {
    if (drawingEnabled) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };

  //draw=====================//

  const handleDrawButton = (e) => {
    e.preventDefault();
    // console.log(isDrawing)
    // isDrawing.current = !isDrawing.current
    setDrawingEnabled(!drawingEnabled);
  };

  const [showPic, toggleShowPic] = useState(false);
  const [showText, toggleShowText] = useState(false);
  const [showSticker, toggleShowSticker] = useState(false);
  const [showDraw, toggleShowDraw] = useState(false);

  return (
    <div className="App">
      <div id="grid-6x7">
        <header id="grid-header">
          <div id="header-title">deshert</div>
        </header>

        <header id="grid-color">
          <div id="color-buttons">
            <div id="white-btn" onClick={addColor("whitesmoke")}>
              Vanilla-White
            </div>
            <div id="black-btn" onClick={addColor("black")}>
              Seasame-Black
            </div>
            <div id="pink-btn" onClick={addColor("mistyrose")}>
              Strawberry-Pink
            </div>
            <div id="yellow-btn" onClick={addColor("goldenrod")}>
              Mango-Yellow
            </div>
            <div id="mint-btn" onClick={addColor("cadetblue")}>
              Minty-Mint
            </div>
          </div>
        </header>

        <div id="grid-shirt">
          <div id="shirt">
            <Stage
              width={200}
              height={400}
              ref={stageRef}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              style={{
                margin: "130px 195px",
                border: "1px solid red",
                zIndex: "990",
                position: "absolute",
              }}
            >
              <Layer>
                <TextInput content={content} />
              </Layer>
              <Layer>
                <Sticker stickyLabel={stickyLabel} />
              </Layer>
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke="#df4b26"
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      line.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                ))}
              </Layer>
            </Stage>

            <img
              id="tshirtFacing"
              src={tshirt}
              style={{ backgroundColor: `${color}` }}
            />
          </div>
        </div>

        <div id="grid-left-side">
          <h1 id="menu-title">Menu</h1>
          <div id="menu-options">
            <div id="pic" onClick={() => toggleShowPic(!showPic)}>
              Toppics--------$5
            </div>
            <div id="text" onClick={() => toggleShowText(!showText)}>
              Textra----------$1
            </div>
            <div id="sticker" onClick={() => toggleShowSticker(!showSticker)}>
              Chef's Pick------$2
            </div>
            <div id="drawing" onClick={() => toggleShowDraw(!showDraw)}>
              Today's Special--$5
            </div>
          </div>
        </div>
        <div id="grid-right-side">
          <h1 id="toolbar-title">Tool Bar</h1>
          <h2 id="toolbar-subtitle">Add a little sauce to your deshert</h2>
          <h2>design your text </h2>
          <input
            type="text"
            onChange={handleChange}
            placeholder="say something"
          />

          <h2>Draw Something</h2>
          <p>{drawingEnabled ? "true" : "false"}</p>
          <button onClick={handleDrawButton}>Draw</button>
          {/* <select
            value={stroke}
            onChange={(e) => {
              setDrawColor(e.target.value);
            }}> */}
          {/* <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select> */}
          <select
            value={tool}
            onChange={(e) => {
              setTool(e.target.value);
            }}
          >
            <option value="pen">Pen</option>
            <option value="eraser">Eraser</option>
          </select>

          <h2>Add Stickers </h2>
          <button>onClick{handleClick}</button>
          <h1>{content}</h1>
          <button className="dropbtn"></button>

          <div className="dropup-content">
            Stickers show up here
            <Sticker />
          </div>

          {showPic && <Picture />}
          {showText && <TextInput />}
          {showSticker && <Sticker />}
          {showDraw && <Draw />}
        </div>
      </div>
    </div>
  );
}

export default App;

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
import useImage from "use-image";

function App() {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([
    {
      src: { Image },
      x: 100,
      y: 100,
      offsetX: 100,
      offsetY: 100,
    },
  ]);

  let [content, setContent] = useState("");
  const handleChange = (e) => {
    return setContent(e.target.value);
  };
  // let [stickyLabel, setStickylabel]

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
  const [drawColor, setDrawColor] = React.useState("#ffe4e1");

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

  const handleDrawColor = (e) => {
    // console.log(e.target.value)

    setDrawColor(e.target.value);
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
            <div
              onDrop={(e) => {
                e.preventDefault();
                console.log("hi");
                // register event position
                stageRef.current.setPointersPositions(e);
                // add image
                setImages(
                  images.concat([
                    {
                      ...stageRef.current.getPointerPosition(),
                      src: dragUrl.current,
                    },
                  ])
                );
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <Stage
                ref={stageRef}
                width={200}
                height={400}
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
                  {lines.map((line, i) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke={drawColor}
                      strokeWidth={5}
                      tension={0.5}
                      lineCap="round"
                      globalCompositeOperation={
                        line.tool === "eraser"
                          ? "destination-out"
                          : "source-over"
                      }
                    />
                  ))}
                </Layer>
                <Layer>
                  <TextInput content={content} />
                </Layer>

                <Sticker images={images} />
              </Stage>
            </div>
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
          <h1>{content}</h1>
          <h2>Draw Something</h2>
          <p>{drawingEnabled ? "true" : "false"}</p>
          <button onClick={handleDrawButton}>Draw</button>
          <select onChange={handleDrawColor}>
            <option value="#ffe4e1">Misty Rose</option>
            <option value="yellow">Yellow</option>
            <option value="#3D9970">Olive</option>
            <option value="red">Red</option>
            <option value="#01FF70">Lime</option>
            <option value="blue">Blue</option>
            <option value="white">White</option>
          </select>
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
          <button>Mouse hover for Stickers</button>

          <img
            alt="lion"
            src="https://konvajs.org/assets/lion.png"
            draggable="true"
            width="50"
            height="50"
            onDragStart={(e) => {
              dragUrl.current = e.target.src;
            }}
          />
          <img
            alt="lion"
            src=" https://i.pinimg.com/564x/78/9f/cf/789fcf5f9070f81431ea9b587387de85.jpg"
            draggable="true"
            width="50"
            height="50"
            onDragStart={(e) => {
              dragUrl.current = e.target.src;
            }}
          />
          <img
            className="img2"
            alt=""
            src="https://slm-assets.secondlife.com/assets/25911713/lightbox/easter%20yoda.jpg?1584671285"
            draggable="true"
            width="50"
            height="50"
            onDragStart={(e) => {
              dragUrl.current = e.target.src;
            }}
          />

          <img
            className="img2"
            alt=""
            src="https://webtrickz.com/wp-content/uploads/2020/03/memoji-sticker-transparent-background.png"
            draggable="true"
            width="50"
            height="50"
            onDragStart={(e) => {
              dragUrl.current = e.target.src;
            }}
          />
          <img
            className="img2"
            alt=""
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/004eebdd-fbb2-40d1-a89d-0612b04c2a8c/dk95rq-97c36be3-beaf-4b7a-a91b-3d107f7345c6.png"
            draggable="true"
            width="50"
            height="50"
            onDragStart={(e) => {
              dragUrl.current = e.target.src;
            }}
          />
          <img
            className="img2"
            alt=""
            src="https://i.pinimg.com/474x/fe/43/d6/fe43d649aa3a106c44dc173b3f8dc874.jpg"
            draggable="true"
            width="80"
            height="80"
            onDragStart={(e) => {
              dragUrl.current = e.target.src;
            }}
          />

          <button className="dropbtn"></button>
          <div className="dropup-content">Stickers show up here</div>
          {showPic && <Picture />}
          {showText && <TextInput />}
          {showDraw && <Draw />}
        </div>
      </div>
    </div>
  );
}

export default App;

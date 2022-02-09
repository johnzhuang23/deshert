import "./App.css";
import React from "react";
import { useState } from "react";
import tshirt from "./shirtbackground.png";
import Picture from "./Picture.js";
import TextInput from "./TextInput.js";
import Sticker from "./Sticker.js";
import Draw from "./Draw.js";
import { Stage, Layer, Text, Image } from "react-konva";

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

  let [stickyLabel, setStickyLabel] = useState([]);
  const handleClick = (e) => {
    return () => {
      setStickyLabel(e.target.value);
    };
  };

  let [color, setColor] = useState("");
  const addColor = (colorName) => {
    return () => {
      setColor(colorName);
    };
  };

  const [showPic, toggleShowPic] = useState(false);
  const [showText, toggleShowText] = useState(false);
  const [showSticker, toggleShowSticker] = useState(false);
  const [showDraw, toggleShowDraw] = useState(false);
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
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
              width={300}
              height={200}
              ref={stageRef}
              style={{
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
          <h2>Add Stickers </h2>
          <button>onClick{handleClick}</button>

          <Sticker />
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

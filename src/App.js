import "./App.css";
import "./Sticker.css";
import React from "react";
import { useState } from "react";
//===================
import tshirt from "./shirtbackground.png";
import cherry from "./images/stickers/cherry.png";
import banana from "./images/stickers/banana.png";
import pizza from "./images/stickers/pizza.png";
import snickers from "./images/stickers/snickers.png";
import darksoul from "./images/stickers/darksoul.png";
import bear from "./images/stickers/bear.png";
import pushingp from "./images/stickers/pushingp.png";
import questionmark from "./images/stickers/questionmark.png";
import tooth from "./images/stickers/tooth.png";
import smile from "./images/stickers/smile.png";
import angry from "./images/stickers/angry.png";
import cool from "./images/stickers/cool.png";
import googlyeyeleft from "./images/stickers/googlyeyeleft.png";
import googlyeyeright from "./images/stickers/googlyeyeright.png";
import advisory from "./images/stickers/advisory.png";
import spitfire from "./images/stickers/spitfire.png";
import nickycrying from "./images/stickers/nickycrying.png";
import artpainting from "./images/stickers/artpainting.png";

//===================
import Picture from "./Picture.js";
import TransformerComponent from "./TransformerComponent";
// import TextTool from "./TextTool.js";
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
  
  let [contentPic, setContentPic] = useState("");
  const handleChangePic = (e) => {
    return setContentPic(e.target.value);
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
  const [show, toggleShow] = useState(false);

  const handleDrawButton = (e) => {
    e.preventDefault();
    // console.log(isDrawing)
    // isDrawing.current = !isDrawing.current
    setDrawingEnabled(!drawingEnabled);
    toggleShow(!show);
  };

  const handleDrawColor = (e) => {
    // console.log(e.target.value)

    setDrawColor(e.target.value);
  };

  let [textFontSize, setTextFontSize] = useState(14);

  const handleFontSize = (e) => {
    // console.log(e.target.value)

    setTextFontSize(e.target.value);
  };

  let [textFontColor, setTextFontColor] = useState("black");

  const handleTextFontColor = (e) => {
    // console.log(e.target.value)

    setTextFontColor(e.target.value);
  };

  const [showPic, toggleShowPic] = useState(false);
  const [showText, toggleShowText] = useState(false);
  const [showSticker, toggleShowSticker] = useState(false);
  const [showDraw, toggleShowDraw] = useState(false);

  // let [selectedShapeName, setShapeName] = useState("")
  // const handleStageMouseDown = e => {
  //   // isDrawing.current = true;
  //   // const pos = e.target.getStage().getPointerPosition();
  //   // setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  //   if (e.target === e.target.getStage()) {
  //     setShapeName({
  //       selectedShapeName: ""
  //     });
  //     return;
  //   }
  //   const clickedOnTransformer =
  //     e.target.getParent().className === "Transformer";
  //   if (clickedOnTransformer) {
  //     return;
  //   }
  //   const name = e.target.name();
  //   if (name) {
  //     setShapeName({
  //       selectedShapeName: name
  //     });
  //   } else {
  //     setShapeName({
  //       selectedShapeName: ""
  //     });
  //   }
  //   console.log(selectedShapeName)
  // };

  
  
  const UploadImage = () => {
    const [image] = useImage(contentPic);
    return <Image draggable width={200} height={200} image={image} />;
  };


  return (
    <div className="App">
      <div id="grid-6x7">
        <header id="grid-header">
          <div id="header-title">DeShert</div>
        </header>

        <header id="grid-color">
          <div id="color-buttons">
            <div id="white-btn" onClick={addColor("FloralWhite")}>
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
                // console.log("hi");
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
                  margin: "130px 200px",
                  border: "1px solid darkgrey",
                  zIndex: "990",
                  position: "absolute",
                }}
              >
                <Layer>
                  {/* <Picture /> */}
                  <UploadImage/>
                </Layer>
                <Layer>
                  {lines.map((line, i) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke={drawColor}
                      strokeWidth={10}
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
                  <TextInput content={content} fontSize={textFontSize} fill={textFontColor}/>
                  <TransformerComponent selectedShapeName="text" />
                  </Layer>
                   {/* <Layer>  */}
                  <Sticker images={images} />
                  {/* <TransformerComponent selectedShapeName="sticker"/> */}
                  {/* </Layer> */}
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
          <div id="menu-list">
            <h3>Toppics · · · · · · · · · · · · · · · · · · · · · ·$2</h3>
            <h3>Textra· · · · · · · · · · · · · · · · · · · · · · ·$3</h3>
            <h3>Today's Special · · · · · · · · · · · · · · ·$4</h3>
            <h3>Chef's Pick · · · · · · · · · · · · · · · · · · ·$5</h3>
          </div>
          
          <div id="sticker-box">
            <h1> Chef's Pick </h1>
            <h3 >Sprinkle your shirt with stickers</h3>
            <div className="stickers">
              <img
                src={cherry}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
              <img
                src={banana}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
              <img
                src={snickers}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
              <img
                src={pizza}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
                <img
                src={darksoul}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
              <img
                src={bear}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
              <img
                src={pushingp}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
                
              />
              <img
                src={questionmark}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
              <img
                src={tooth}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
              <img
                src={smile}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
              <img
                src={angry}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
                <img
                src={cool}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
                <img
                src={googlyeyeleft}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
                <img
                src={googlyeyeright}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
                <img
                src={advisory}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
                <img
                src={spitfire}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
                <img
                src={nickycrying}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
                <img
                src={artpainting}
                draggable="true"
                width="50"
                height="50"
                onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                }}
              />
          </div>
          </div>
          </div>        

        <div id="grid-right-side">
          <div id="text-box">
            <h1> Textra </h1>
            <h3>Shout out the words in your mind</h3>
            <input
              type="text"
              onChange={handleChange}
              placeholder="type here"
            />
            <select id="dropdown-size" onChange={handleFontSize}>
                <option value="14">Small</option>
                <option value="22">Medium</option>
                <option value="26">Large</option>
                <option value="38">Extra Large</option>
                <option value="72">Family size</option>
              

            </select>
            <select id="dropdown-colorT"onChange={handleTextFontColor}>
                <option value="black">Black</option>
                <option value="#f5c71a">Deep Lemon</option>
                <option value="red">Red</option>
                <option value="white">White</option>
                <option value="#FBCEB1">Apricot</option>
                <option value="#30D5C8">Turqoise</option>
            </select>
          </div>
          
          <div id="draw-box">
            <h1> Today's Special </h1>
            <h3>Nothing is more sepcial then your own drawing</h3>
            {/* <p>{drawingEnabled ? "true" : "false"}</p> */}
            <div id="drawButton" onClick={handleDrawButton}>{show ? 'Click to End Drawing' : 'Click to Start Drawing'}</div>
            
              <select id="dropdown-colorD"onChange={handleDrawColor}>
                <option value="#ffe4e1">Misty Rose</option>
                <option value="yellow">Yellow</option>
                <option value="#3D9970">Olive</option>
                <option value="red">Red</option>
                <option value="#01FF70">Lime</option>
                <option value="blue">Blue</option>
                <option value="white">White</option>
              </select>
            
              <select id="dropdown-pen"
                value={tool}
                onChange={(e) => {
                  setTool(e.target.value);
                }}>
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
              </select>
            
          </div>
          <div id="image-box">
            <h1> Toppics </h1>
            <h3>Leave a nice image here</h3>
            <input
              type="text"
              onChange={handleChangePic}
              placeholder="type URL here"
            />

            <div>
      
              <input
                type="file"
                name="myImage"
               />
               
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default App;

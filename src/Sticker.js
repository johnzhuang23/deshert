import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { useDropzone } from "react-dropzone";
import eleven from "./images/eleven.png";
import "./Sticker.css";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={100}
      offsetY={100}
      // offsetX={img ? img.width / 1 : 0}
      // offsetY={img ? img.height / 1 : 0}
    />
  );
};

// let [stickyLabel, setStickyLabel] = useState([]);
//   const stickerHandleClick = (e) => {
//     console.log(e.target.childNodes);
//     return () => {
//       setStickyLabel(e.target.childNodes);
//     };
//   };

export default function Sticker(props) {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();

  return (
    // <div>
    /* <div className="img">
          <img
            className="img1"
            alt="lion"
            src="https://konvajs.org/assets/lion.png"
            draggable="true"
            onDragStart={(e) => {
              dragUrl.current = e.target.src;
            }}/>
        </div>
      </div>
        onDrop={(e) => {
          e.preventDefault();
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
        onDragOver={(e) => e.preventDefault()} */

    <Layer>
      {props.images.map((image) => {
        console.log(image);
        return <URLImage image={image} />;
      })}
    </Layer>
    /* </div>
    </div> */
  );
}

/* <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: "1px solid grey" }}
          ref={stageRef}
        ></Stage> */

//   // render(<App />, document.getElementById("root"));

import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { useDropzone } from "react-dropzone";
import "./Sticker.css";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      name="sticker"
      image={img}
      x={image.x}
      y={image.y}
      draggable
      // I will use offset to set origin to the center of the image
      offsetX={10}
      offsetY={10}
      width={50}
      height={50}
    />
  );
};

export default function Sticker(props) {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();

  return (
    <Layer>
      {props.images.map((image) => {
        // console.log(image);
        return <URLImage image={image} />;
      })}
    </Layer>
  );
}

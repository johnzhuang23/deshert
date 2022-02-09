import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { useDropzone } from "react-dropzone";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 1 : 0}
      offsetY={img ? img.height / 1 : 0}
    />
  );
};

export default function Sticker(props) {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  return (
    <div>
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <div
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
        onDragOver={(e) => e.preventDefault()}
      >
        {images.map((image) => {
          return <URLImage image={image} />;
        })}
      </div>
    </div>
  );
}
//   // render(<App />, document.getElementById("root"));

//   const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
//     useDropzone({
//       accept: "image/jpeg,image/png",
//     });
//   const acceptedFileItems = acceptedFiles.map((file) => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));
//   const fileRejectionItems = fileRejections.map(({ file, errors }) => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//       <ul>
//         {errors.map((e) => (
//           <li key={e.code}>{e.message}</li>
//         ))}
//       </ul>
//     </li>
//   ));
//   return (
//     <section className="container">
//       <div {...getRootProps({ className: "dropzone" })}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//         <em>(Only *.jpeg and *.png images will be accepted)</em>
//       </div>
//       <aside>
//         <h4>Accepted files</h4>
//         <input type="text" name="" id="" />
//         <button>add</button>
//         <ul>{acceptedFileItems}</ul>
//         <h4>Rejected files</h4>
//         <ul>{fileRejectionItems}</ul>
//       </aside>
//     </section>
//   );
// }

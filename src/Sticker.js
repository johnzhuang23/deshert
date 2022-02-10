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
      offsetX={img ? img.width / 1 : 0}
      offsetY={img ? img.height / 1 : 0}
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
  const [images, setImages] = React.useState([]);
  return (
    <div>
      <div className="img">
        <img
          className="img1"
          alt="lion"
          src="https://konvajs.org/assets/lion.png"
          draggable="true"
          onDragStart={(e) => {
            dragUrl.current = e.target.src;
          }}
        />
        {/* <img
          className="img2"
          alt=""
          src="https://slm-assets.secondlife.com/assets/25911713/lightbox/easter%20yoda.jpg?1584671285'"
          draggable="true"
          onDragStart={(e) => {
            dragUrl.current = e.target.src;
          }}
        />
        <img
          className="img2"
          alt=""
          src="https://webtrickz.com/wp-content/uploads/2020/03/memoji-sticker-transparent-background.png"
          draggable="true"
          onDragStart={(e) => {
            dragUrl.current = e.target.src;
          }}
        /> */}
        <img
          className="img2"
          alt=""
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/004eebdd-fbb2-40d1-a89d-0612b04c2a8c/dk95rq-97c36be3-beaf-4b7a-a91b-3d107f7345c6.png"
          draggable="true"
          onDragStart={(e) => {
            dragUrl.current = e.target.src;
          }}
        />
      </div>
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
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: "1px solid grey" }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
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

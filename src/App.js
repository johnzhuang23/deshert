
import './App.css';
import { useState } from 'react'
import tshirt from './shirtbackground.png'
import TextReader from './text.js'

function App() {
  let [color, setColor] = useState("")

  const addColor = colorName => {
    return () => {
      setColor(colorName)
    }
  }

  return (
    <div className="App">
      <div id="grid-6x7">
        <header id='grid-header'>
          <div id="header-title">deshert</div>
        </header>

        <header id='grid-color'>

          <div id="color-buttons">
            <div id='white-btn' onClick={addColor('whitesmoke')}>Vanilla-White</div>
            <div id='black-btn' onClick={addColor('black')}>Seasame-Black</div>
            <div id='pink-btn' onClick={addColor('mistyrose')}>Strawberry-Pink</div>
            <div id='yellow-btn' onClick={addColor('deepyellow')}>Mango-Yellow</div>
            <div id='mint-btn' onClick={addColor('cadetblue')}>Minty-Mint</div>
          </div>
        </header>

        <div id='grid-shirt'>
          <div id="shirt">
            <TextReader />

            <img id="tshirtFacing" src={tshirt} style={{ backgroundColor: `${color}` }} />
          </div>
        </div>

        <div id='grid-left-side'>
          <h1 id='menu-title'>Menu</h1>

          <div id='menu-options'>
            <div id='pic'>Toppics--------$5</div>
            <div id='text'>Textra----------$1</div>
            <div id='sticker'>Chef's Pick------$2</div>
            <div id='drawing'>Today's Special--$5</div>
          </div>
        </div>

        <div id='grid-right-side'>
          <h1 id='toolbar-title'>Tool Bar</h1>
          <h2 id='toolbar-subtitle'>Add a little sauce to your deshert</h2>

        </div>r
      </div>
    </div>
  );
}

export default App;
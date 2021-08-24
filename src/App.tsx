import React from 'react';
import './App.css';
import DataZoomControl from "./components/DataZoomControl";

const App = () => {
    const handleBarMove = () => {
        console.log("bar move");
    }
    const handleBarMoveEnd = () => {
        console.log("bar move end");
    }

    const handleBarResize = () => {
        console.log("bar resize");
    }

    const handleBarResizeEnd = () => {
        console.log("bar resize end");
    }

    return (
        <div className="App">
            <DataZoomControl
                width={500}
                height={20}
                onBarMove={handleBarMove}
                onBarMoveEnd={handleBarMoveEnd}
                onBarResize={handleBarResize}
                onBarResizeEnd={handleBarResizeEnd}/>
        </div>
    );
}

export default App;

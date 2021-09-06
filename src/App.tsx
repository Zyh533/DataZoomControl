import React from 'react';
import './App.css';
import DataZoomControl from "./components/DataZoomControl";

const App = () => {
    const handleBarMove = (starta: number, end: number) => {
        console.log("bar move");
    }
    const handleBarMoveEnd = (starta: number, end: number) => {
        console.log("bar move end");
    }

    const handleBarResize = (starta: number, end: number) => {
        console.log("bar resize");
    }

    const handleBarResizeEnd = (starta: number, end: number) => {
        console.log("bar resize end");
    }

    return (
        <div className="App">
            <DataZoomControl
                width={500}
                height={24}
                orientation={"horizontal"}
                onBarMove={handleBarMove}
                onBarMoveEnd={handleBarMoveEnd}
                onBarResize={handleBarResize}
                onBarResizeEnd={handleBarResizeEnd}/>
        </div>
    );
}

export default App;

import React from 'react';
import "../css/DataZoomControl.scss";
export declare type DataZoomControlProps = {
    width: number;
    height: number;
    onBarMove?: () => void;
    onBarMoveEnd?: () => void;
    onBarResize?: () => void;
    onBarResizeEnd?: () => void;
};
declare const DataZoomControl: React.FC<DataZoomControlProps>;
export default DataZoomControl;

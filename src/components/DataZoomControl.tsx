import React, {useState} from 'react';
import {DataZoomControlProps} from "./index";
import "../css/DataZoomControl.scss";

const DataZoomControl: React.FC<DataZoomControlProps> = ({
                                                             width,
                                                             height,
                                                             onBarMove,
                                                             onBarResize,
                                                             onBarMoveEnd,
                                                             onBarResizeEnd
                                                         }) => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(width);
    const mouseWheelMoveStep = 5;   // 鼠标每次滚动条滚动，移动
    const mouseWheelResizeStep = 1; // 鼠标每次滚动条滚动，缩放

    // 滑动条移动
    const handleMoveBarMouseDown = (event: any) => {
        const startX = event.clientX;
        const mouseMoveEvent = (e: any) => {
            const endX = e.clientX;
            const moveLength = endX - startX;
            const newStart = start + moveLength;
            const newEnd = end + moveLength;

            if (newStart >= 0 && newEnd <= width) {
                setStart(newStart);
                setEnd(newEnd);
                if (onBarMove) {
                    onBarMove();
                }
            }
        }
        const mouseUpEvent = () => {
            document.removeEventListener("mousemove", mouseMoveEvent);
            document.removeEventListener("mouseup", mouseUpEvent);
            if (onBarMoveEnd) {
                onBarMoveEnd();
            }
        }
        document.addEventListener("mousemove", mouseMoveEvent);
        document.addEventListener("mouseup", mouseUpEvent);
    };

    // 修改滑动条长度
    const handleResizeBarMouseDown = (event: any, size: "left" | "right") => {
        const startX = event.clientX;
        let newStart = start;
        let newEnd = end;

        const mouseMoveEvent = (e: any) => {
            const endX = e.clientX;
            const moveLength = endX - startX;

            if (size === "left") {
                newStart = start + moveLength;
                if (newStart >= width) {
                    newStart = width;
                } else if (newStart >= end) {
                    newStart = end;
                } else if (newStart <= 0) {
                    newStart = 0;
                }
                setStart(newStart);
            } else {
                newEnd = end + moveLength;
                if (newEnd > width) {
                    newEnd = width;
                } else if (newEnd <= start) {
                    newEnd = start;
                } else if (newEnd <= 0) {
                    newEnd = 0;
                }
                setEnd(newEnd);
            }
            if (onBarResize) {
                onBarResize();
            }
        }

        const mouseUpEvent = () => {
            document.removeEventListener("mousemove", mouseMoveEvent);
            document.removeEventListener("mouseup", mouseUpEvent);
            if (onBarResizeEnd) {
                onBarResizeEnd();
            }
        }
        document.addEventListener("mousemove", mouseMoveEvent);
        document.addEventListener("mouseup", mouseUpEvent);
    }

    const handleMouseWheel = (event: any) => {
        let newStart = start;
        let newEnd = end;

        // 向右移动
        if (event.deltaY > 0) {
            newStart += mouseWheelMoveStep;
            newEnd += mouseWheelMoveStep;
        } else {  // 向左移动
            newStart -= mouseWheelMoveStep;
            newEnd -= mouseWheelMoveStep;
        }

        if (newStart >= 0 && newEnd <= width) {
            setStart(newStart);
            setEnd(newEnd);
        }

        // 触发滚动条移动事件
        if (onBarMove) {
            onBarMove();
        }
        if (onBarMoveEnd) {
            onBarMoveEnd();
        }
    }

    return <div
        className={"DataZoomControl"}
        onWheel={handleMouseWheel}
        style={{width: `${width}px`, height: `${height}px`}}>

        {/*轨道*/}
        <div className={"trail"}/>

        {/*滑动条*/}
        <div className={"slideBar"}
             onMouseDown={handleMoveBarMouseDown}
             style={{width: `${end - start}px`, left: `${start}px`}}/>

        {/*左变化条*/}
        <div className={"resizeBar"}
             onMouseDown={(e) => handleResizeBarMouseDown(e, "left")}
             style={{left: `${start - 3}px`, top: `${(height - 18) / 2}px`}}/>

        {/*右变化条*/}
        <div className={"resizeBar"}
             onMouseDown={(e) => handleResizeBarMouseDown(e, "right")}
             style={{left: `${end - 3}px`, top: `${(height - 18) / 2}px`}}/>
    </div>
};

export default DataZoomControl;

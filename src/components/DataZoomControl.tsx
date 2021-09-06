import React, {useMemo, useState} from 'react';
import {DataZoomControlProps, styleDefault} from "./index";
import "../css/DataZoomControl.scss";

const DataZoomControl: React.FC<DataZoomControlProps> = ({
                                                             width,
                                                             height,
                                                             orientation = "horizontal",
                                                             styleConfg = styleDefault,
                                                             onBarMove,
                                                             onBarResize,
                                                             onBarMoveEnd,
                                                             onBarResizeEnd
                                                         }) => {
    // 状态数据
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(orientation === "horizontal" ? width : height);

    // 常量
    const mouseWheelMoveStep: number = 10;   // 鼠标每次滚动条滚动，移动

    // 布局方式是否为水平
    const isHorizontal: boolean = orientation === "horizontal";

    // 滑动条样式
    const silderBarStyle = useMemo(() => {
        return {
            width: isHorizontal ? `${end - start}px` : "100%",
            height: !isHorizontal ? `${end - start}px` : "100%",
            left: isHorizontal ? `${start}px` : 0,
            top: !isHorizontal ? `${start}px` : 0,
            background: styleConfg?.slideBar?.background ? styleConfg?.slideBar?.background : styleDefault.slideBar?.background
        };
    }, [styleConfg, start, end, isHorizontal]);

    // 左resizebar样式
    const leftResizeBarStyle = useMemo(() => {
        return {
            width: isHorizontal ? 4 : width * 0.7,
            height: isHorizontal ? height * 0.7 : 4,
            left: isHorizontal ? `${start - 3}px` : `${0.15 * width}px`,
            top: isHorizontal ? `${0.15 * height}px` : `${start - 3}px`,
            cursor: isHorizontal ? "w-resize" : "n-resize"
        };
    }, [isHorizontal, start, width, height]);

    // 右resizebar样式
    const rightResizeBarStyle = useMemo(() => {
        return {
            width: isHorizontal ? 4 : width * 0.7,
            height: isHorizontal ? height * 0.7 : 4,
            left: isHorizontal ? `${end - 3}px` : `${0.15 * width}px`,
            top: isHorizontal ? `${0.15 * height}px` : `${end - 3}px`,
            cursor: isHorizontal ? "w-resize" : "n-resize"
        };
    }, [isHorizontal, end, width, height]);

    // 滑动条移动
    const handleMoveBarMouseDown = (event: any) => {
        const startX = event.clientX;
        const startY = event.clientY;
        let newStart = start
        let newEnd = end
        const mouseMoveEvent = (e: any) => {
            const limit = isHorizontal ? width : height;
            const moveLength = isHorizontal ? (e.clientX - startX) : (e.clientY - startY);
            newStart = start + moveLength;
            newEnd = end + moveLength;

            // 修改位置
            if (newStart >= 0 && newEnd <= limit) {
                setStart(newStart);
                setEnd(newEnd);
                if (onBarMove) {
                    onBarMove(newStart, newEnd);
                }
            }
        }
        const mouseUpEvent = () => {
            document.removeEventListener("mousemove", mouseMoveEvent);
            document.removeEventListener("mouseup", mouseUpEvent);
            if (onBarMoveEnd) {
                onBarMoveEnd(newStart, newEnd);
            }
        }
        document.addEventListener("mousemove", mouseMoveEvent);
        document.addEventListener("mouseup", mouseUpEvent);
    };

    // 修改滑动条长度
    const handleResizeBarMouseDown = (event: any, size: "left" | "right") => {
        const startX = event.clientX;
        const startY = event.clientY;
        let newStart = start;
        let newEnd = end;

        const mouseMoveEvent = (e: any) => {
            const endX = e.clientX;
            const endY = e.clientY;
            const moveLength = isHorizontal ? (endX - startX) : (endY - startY);
            const limit = isHorizontal ? width : height;

            if (size === "left") {
                newStart = start + moveLength;
                if (newStart >= limit) {
                    newStart = limit;
                } else if (newStart >= end) {
                    newStart = end;
                } else if (newStart <= 0) {
                    newStart = 0;
                }
                setStart(newStart);
            } else {
                newEnd = end + moveLength;
                if (newEnd > limit) {
                    newEnd = limit;
                } else if (newEnd <= start) {
                    newEnd = start;
                } else if (newEnd <= 0) {
                    newEnd = 0;
                }
                setEnd(newEnd);
            }
            if (onBarResize) {
                onBarResize(newStart, newEnd);
            }
        }

        const mouseUpEvent = () => {
            document.removeEventListener("mousemove", mouseMoveEvent);
            document.removeEventListener("mouseup", mouseUpEvent);
            if (onBarResizeEnd) {
                onBarResizeEnd(newStart, newEnd);
            }
        }
        document.addEventListener("mousemove", mouseMoveEvent);
        document.addEventListener("mouseup", mouseUpEvent);
    };

    // 鼠标滚动移动滑动条位置
    const handleMouseWheel = (event: any) => {
        let newStart = start;
        let newEnd = end;
        let limit = isHorizontal ? width : height;

        // 向右移动
        if (event.deltaY > 0) {
            newStart += mouseWheelMoveStep;
            newEnd += mouseWheelMoveStep;
        } else {  // 向左移动
            newStart -= mouseWheelMoveStep;
            newEnd -= mouseWheelMoveStep;
        }

        if (newStart >= 0 && newEnd <= limit) {
            setStart(newStart);
            setEnd(newEnd);
        }

        // 触发滚动条移动事件
        if (onBarMoveEnd) {
            onBarMoveEnd(newStart, newEnd);
        }
    };

    return <div
        className={"DataZoomControl"}
        onWheel={handleMouseWheel}
        style={{width: `${width}px`, height: `${height}px`}}>

        {/*轨道*/}
        <div className={"trail"} style={{
            background: styleConfg?.trail?.background ? styleConfg?.trail?.background : styleDefault.trail?.background
        }}/>

        {/*滑动条*/}
        <div className={"slideBar"}
             onMouseDown={handleMoveBarMouseDown}
             style={silderBarStyle}/>

        {/*左变化条*/}
        <div className={"resizeBar"}
             onMouseDown={(e) => handleResizeBarMouseDown(e, "left")}
             style={leftResizeBarStyle}/>

        {/*右变化条*/}
        <div className={"resizeBar"}
             onMouseDown={(e) => handleResizeBarMouseDown(e, "right")}
             style={rightResizeBarStyle}/>
    </div>
};

export default DataZoomControl;

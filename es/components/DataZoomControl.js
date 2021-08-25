var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import "../css/DataZoomControl.scss";

var DataZoomControl = function DataZoomControl(_a) {
  var width = _a.width,
      height = _a.height,
      onBarMove = _a.onBarMove,
      onBarResize = _a.onBarResize,
      onBarMoveEnd = _a.onBarMoveEnd,
      onBarResizeEnd = _a.onBarResizeEnd;

  var _b = useState(0),
      start = _b[0],
      setStart = _b[1];

  var _c = useState(width),
      end = _c[0],
      setEnd = _c[1];

  var mouseWheelMoveStep = 5; // 鼠标每次滚动条滚动，移动

  var mouseWheelResizeStep = 1; // 鼠标每次滚动条滚动，缩放
  // 滑动条移动

  var handleMoveBarMouseDown = function handleMoveBarMouseDown(event) {
    var startX = event.clientX;

    var mouseMoveEvent = function mouseMoveEvent(e) {
      var endX = e.clientX;
      var moveLength = endX - startX;
      var newStart = start + moveLength;
      var newEnd = end + moveLength;

      if (newStart >= 0 && newEnd <= width) {
        setStart(newStart);
        setEnd(newEnd);

        if (onBarMove) {
          onBarMove();
        }
      }
    };

    var mouseUpEvent = function mouseUpEvent() {
      document.removeEventListener("mousemove", mouseMoveEvent);
      document.removeEventListener("mouseup", mouseUpEvent);

      if (onBarMoveEnd) {
        onBarMoveEnd();
      }
    };

    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("mouseup", mouseUpEvent);
  }; // 修改滑动条长度


  var handleResizeBarMouseDown = function handleResizeBarMouseDown(event, size) {
    var startX = event.clientX;
    var newStart = start;
    var newEnd = end;

    var mouseMoveEvent = function mouseMoveEvent(e) {
      var endX = e.clientX;
      var moveLength = endX - startX;

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
    };

    var mouseUpEvent = function mouseUpEvent() {
      document.removeEventListener("mousemove", mouseMoveEvent);
      document.removeEventListener("mouseup", mouseUpEvent);

      if (onBarResizeEnd) {
        onBarResizeEnd();
      }
    };

    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("mouseup", mouseUpEvent);
  };

  var handleMouseWheel = function handleMouseWheel(event) {
    var newStart = start;
    var newEnd = end; // 向右移动

    if (event.deltaY > 0) {
      newStart += mouseWheelMoveStep;
      newEnd += mouseWheelMoveStep;
    } else {
      // 向左移动
      newStart -= mouseWheelMoveStep;
      newEnd -= mouseWheelMoveStep;
    }

    if (newStart >= 0 && newEnd <= width) {
      setStart(newStart);
      setEnd(newEnd);
    } // 触发滚动条移动事件


    if (onBarMove) {
      onBarMove();
    }

    if (onBarMoveEnd) {
      onBarMoveEnd();
    }
  };

  return _jsxs("div", __assign({
    className: "DataZoomControl",
    onWheel: handleMouseWheel,
    style: {
      width: width + "px",
      height: height + "px"
    }
  }, {
    children: [_jsx("div", {
      className: "trail"
    }, void 0), _jsx("div", {
      className: "slideBar",
      onMouseDown: handleMoveBarMouseDown,
      style: {
        width: end - start + "px",
        left: start + "px"
      }
    }, void 0), _jsx("div", {
      className: "resizeBar",
      onMouseDown: function onMouseDown(e) {
        return handleResizeBarMouseDown(e, "left");
      },
      style: {
        left: start - 3 + "px",
        top: (height - 18) / 2 + "px"
      }
    }, void 0), _jsx("div", {
      className: "resizeBar",
      onMouseDown: function onMouseDown(e) {
        return handleResizeBarMouseDown(e, "right");
      },
      style: {
        left: end - 3 + "px",
        top: (height - 18) / 2 + "px"
      }
    }, void 0)]
  }), void 0);
};

export default DataZoomControl;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = _interopRequireWildcard(require("react"));

require("../css/DataZoomControl.scss");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __assign = void 0 && (void 0).__assign || function () {
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

var DataZoomControl = function DataZoomControl(_a) {
  var width = _a.width,
      height = _a.height,
      onBarMove = _a.onBarMove,
      onBarResize = _a.onBarResize,
      onBarMoveEnd = _a.onBarMoveEnd,
      onBarResizeEnd = _a.onBarResizeEnd;

  var _b = (0, _react.useState)(0),
      start = _b[0],
      setStart = _b[1];

  var _c = (0, _react.useState)(width),
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

  return (0, _jsxRuntime.jsxs)("div", __assign({
    className: "DataZoomControl",
    onWheel: handleMouseWheel,
    style: {
      width: width + "px",
      height: height + "px"
    }
  }, {
    children: [(0, _jsxRuntime.jsx)("div", {
      className: "trail"
    }, void 0), (0, _jsxRuntime.jsx)("div", {
      className: "slideBar",
      onMouseDown: handleMoveBarMouseDown,
      style: {
        width: end - start + "px",
        left: start + "px"
      }
    }, void 0), (0, _jsxRuntime.jsx)("div", {
      className: "resizeBar",
      onMouseDown: function onMouseDown(e) {
        return handleResizeBarMouseDown(e, "left");
      },
      style: {
        left: start - 3 + "px",
        top: (height - 18) / 2 + "px"
      }
    }, void 0), (0, _jsxRuntime.jsx)("div", {
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

var _default = DataZoomControl;
exports.default = _default;
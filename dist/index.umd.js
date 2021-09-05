(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react/jsx-runtime'), require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react/jsx-runtime', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.datazoomcontrol = {}, global.jsxRuntime, global.React));
}(this, (function (exports, jsxRuntime, react) { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var DataZoomControl = function DataZoomControl(_ref) {
    var width = _ref.width,
        height = _ref.height,
        onBarMove = _ref.onBarMove,
        onBarResize = _ref.onBarResize,
        onBarMoveEnd = _ref.onBarMoveEnd,
        onBarResizeEnd = _ref.onBarResizeEnd;

    var _useState = react.useState(0),
        _useState2 = _slicedToArray(_useState, 2),
        start = _useState2[0],
        setStart = _useState2[1];

    var _useState3 = react.useState(width),
        _useState4 = _slicedToArray(_useState3, 2),
        end = _useState4[0],
        setEnd = _useState4[1];

    var mouseWheelMoveStep = 5; // 鼠标每次滚动条滚动，移动
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

    return jsxRuntime.jsxs("div", Object.assign({
      className: "DataZoomControl",
      onWheel: handleMouseWheel,
      style: {
        width: "".concat(width, "px"),
        height: "".concat(height, "px")
      }
    }, {
      children: [jsxRuntime.jsx("div", {
        className: "trail"
      }, void 0), jsxRuntime.jsx("div", {
        className: "slideBar",
        onMouseDown: handleMoveBarMouseDown,
        style: {
          width: "".concat(end - start, "px"),
          left: "".concat(start, "px")
        }
      }, void 0), jsxRuntime.jsx("div", {
        className: "resizeBar",
        onMouseDown: function onMouseDown(e) {
          return handleResizeBarMouseDown(e, "left");
        },
        style: {
          left: "".concat(start - 3, "px"),
          top: "".concat((height - 18) / 2, "px")
        }
      }, void 0), jsxRuntime.jsx("div", {
        className: "resizeBar",
        onMouseDown: function onMouseDown(e) {
          return handleResizeBarMouseDown(e, "right");
        },
        style: {
          left: "".concat(end - 3, "px"),
          top: "".concat((height - 18) / 2, "px")
        }
      }, void 0)]
    }), void 0);
  };

  exports.DataZoomControl = DataZoomControl;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map

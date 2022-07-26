"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _types = require("./types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getSlideWidth = function getSlideWidth(count, wrapAround) {
  return "".concat(wrapAround ? 100 / (3 * count) : 100 / count, "%");
};

var getSlideStyles = function getSlideStyles(count, isCurrentSlide, isVisibleSlide, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight, initializedAdaptiveHeight) {
  var width = getSlideWidth(count, wrapAround);
  var visibleSlideOpacity = isVisibleSlide ? 1 : 0;
  var animationSpeed = animation === 'fade' ? 200 : 500;
  var height = 'auto';

  if (adaptiveHeight) {
    if (initializedAdaptiveHeight) {
      // Once adaptiveHeight is initialized, the frame will size to the height
      // of all the visible slides
      height = '100%';
    } else if (isVisibleSlide) {
      // If the slide is visible but we're still measuring heights, have
      // visible slides just take up their natural height
      height = 'auto';
    } else {
      // If the slide is not visible and we're still measuring heights, the
      // slide should have height 0 so it doesn't contribute to the measured
      // height of the frame
      height = '0';
    }
  }

  return {
    width: width,
    flex: 1,
    height: height,
    padding: "0 ".concat(cellSpacing ? cellSpacing / 2 : 0, "px"),
    transition: animation ? "".concat(speed || animationSpeed, "ms ease 0s") : undefined,
    transform: animation === 'zoom' ? "scale(".concat(isCurrentSlide ? 1 : zoomScale || 0.85, ")") : undefined,
    opacity: animation === 'fade' ? visibleSlideOpacity : 1
  };
};

var isVisibleSlide = function isVisibleSlide(currentSlide, index, slidesToShow, cellAlign) {
  if (slidesToShow === 1) {
    return index === currentSlide;
  }

  if (cellAlign === _types.Alignment.Left) {
    return index < currentSlide + slidesToShow && index >= currentSlide;
  }

  if (cellAlign === _types.Alignment.Center) {
    return index >= currentSlide - slidesToShow / 2 && index <= currentSlide || index > currentSlide && index <= currentSlide + slidesToShow / 2;
  }

  if (cellAlign === _types.Alignment.Right) {
    return index <= currentSlide && index > currentSlide - slidesToShow;
  }

  return false;
};

var generateIndex = function generateIndex(index, count, typeOfSlide) {
  if (typeOfSlide === 'prev-cloned') {
    return index - count;
  }

  if (typeOfSlide === 'next-cloned') {
    return index + count;
  }

  return index;
};

var Slide = function Slide(_ref) {
  var count = _ref.count,
      children = _ref.children,
      currentSlide = _ref.currentSlide,
      index = _ref.index,
      isCurrentSlide = _ref.isCurrentSlide,
      typeOfSlide = _ref.typeOfSlide,
      wrapAround = _ref.wrapAround,
      cellSpacing = _ref.cellSpacing,
      animation = _ref.animation,
      speed = _ref.speed,
      slidesToShow = _ref.slidesToShow,
      zoomScale = _ref.zoomScale,
      cellAlign = _ref.cellAlign,
      onVisibleSlideHeightChange = _ref.onVisibleSlideHeightChange,
      adaptiveHeight = _ref.adaptiveHeight,
      initializedAdaptiveHeight = _ref.initializedAdaptiveHeight,
      slideClassName = _ref.slideClassName;
  var customIndex = wrapAround ? generateIndex(index, count, typeOfSlide) : index;
  var isVisible = isVisibleSlide(currentSlide, customIndex, slidesToShow, cellAlign);
  var slideRef = (0, _react.useRef)(null);
  var prevSlideHeight = (0, _react.useRef)(null);
  var handleHeightOrVisibilityChange = (0, _react.useCallback)(function () {
    var node = slideRef.current;

    if (node) {
      if (isVisible) {
        node.removeAttribute('inert');
      } else {
        node.setAttribute('inert', 'true');
      }

      var slideHeight = isVisible ? node.getBoundingClientRect().height : null;

      if (slideHeight !== prevSlideHeight.current) {
        prevSlideHeight.current = slideHeight;
        onVisibleSlideHeightChange(customIndex, slideHeight);
      }
    }
  }, [customIndex, isVisible, onVisibleSlideHeightChange]); // Update status if any dependencies change

  (0, _react.useEffect)(function () {
    handleHeightOrVisibilityChange();
  }, [handleHeightOrVisibilityChange]); // Also allow for re-measuring height even if none of the props or state
  // changes. This is useful if a carousel item is expandable.

  (0, _react.useEffect)(function () {
    var node = slideRef.current;

    if (node && typeof ResizeObserver !== 'undefined') {
      var resizeObserver = new ResizeObserver(handleHeightOrVisibilityChange);
      resizeObserver.observe(node);
      return function () {
        return resizeObserver.disconnect();
      };
    }
  }, [handleHeightOrVisibilityChange]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: slideRef,
    className: ['slide', isCurrentSlide && isVisible && 'slide-current', typeOfSlide, isVisible && 'slide-visible', slideClassName].filter(function (value) {
      return value;
    }).join(' '),
    style: getSlideStyles(count, isCurrentSlide, isVisible, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight, initializedAdaptiveHeight)
  }, children);
};

var _default = Slide;
exports["default"] = _default;
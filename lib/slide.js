"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const types_1 = require("./types");
const getSlideWidth = (count, wrapAround) => `${wrapAround ? 100 / (3 * count) : 100 / count}%`;
const getSlideStyles = (count, isCurrentSlide, isVisibleSlide, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight, initializedAdaptiveHeight) => {
    const width = getSlideWidth(count, wrapAround);
    const visibleSlideOpacity = isVisibleSlide ? 1 : 0;
    const animationSpeed = animation === 'fade' ? 200 : 500;
    let height = 'auto';
    if (adaptiveHeight) {
        if (initializedAdaptiveHeight) {
            // Once adaptiveHeight is initialized, the frame will size to the height
            // of all the visible slides
            height = '100%';
        }
        else if (isVisibleSlide) {
            // If the slide is visible but we're still measuring heights, have
            // visible slides just take up their natural height
            height = 'auto';
        }
        else {
            // If the slide is not visible and we're still measuring heights, the
            // slide should have height 0 so it doesn't contribute to the measured
            // height of the frame
            height = '0';
        }
    }
    return {
        width,
        flex: 1,
        height,
        padding: `0 ${cellSpacing ? cellSpacing / 2 : 0}px`,
        transition: animation ? `${speed || animationSpeed}ms ease 0s` : undefined,
        transform: animation === 'zoom'
            ? `scale(${isCurrentSlide && isVisibleSlide ? 1 : zoomScale || 0.85})`
            : undefined,
        opacity: animation === 'fade' ? visibleSlideOpacity : 1
    };
};
const isVisibleSlide = (currentSlide, index, slidesToShow, cellAlign) => {
    if (slidesToShow === 1) {
        return index === currentSlide;
    }
    if (cellAlign === types_1.Alignment.Left) {
        return index < currentSlide + slidesToShow && index >= currentSlide;
    }
    if (cellAlign === types_1.Alignment.Center) {
        return ((index >= currentSlide - slidesToShow / 2 && index <= currentSlide) ||
            (index > currentSlide && index <= currentSlide + slidesToShow / 2));
    }
    if (cellAlign === types_1.Alignment.Right) {
        return index <= currentSlide && index > currentSlide - slidesToShow;
    }
    return false;
};
const generateIndex = (index, count, typeOfSlide) => {
    if (typeOfSlide === 'prev-cloned') {
        return index - count;
    }
    if (typeOfSlide === 'next-cloned') {
        return index + count;
    }
    return index;
};
const Slide = ({ count, children, currentSlide, index, isCurrentSlide, typeOfSlide, wrapAround, cellSpacing, animation, speed, slidesToShow, zoomScale, cellAlign, onVisibleSlideHeightChange, adaptiveHeight, initializedAdaptiveHeight, slideClassName }) => {
    const customIndex = wrapAround
        ? generateIndex(index, count, typeOfSlide)
        : index;
    const isVisible = isVisibleSlide(currentSlide, customIndex, slidesToShow, cellAlign);
    const slideRef = (0, react_1.useRef)(null);
    const prevSlideHeight = (0, react_1.useRef)(null);
    const handleHeightOrVisibilityChange = (0, react_1.useCallback)(() => {
        const node = slideRef.current;
        if (node) {
            if (isVisible) {
                node.removeAttribute('inert');
            }
            else {
                node.setAttribute('inert', 'true');
            }
            const slideHeight = isVisible
                ? node.getBoundingClientRect().height
                : null;
            if (slideHeight !== prevSlideHeight.current) {
                prevSlideHeight.current = slideHeight;
                onVisibleSlideHeightChange(customIndex, slideHeight);
            }
        }
    }, [customIndex, isVisible, onVisibleSlideHeightChange]);
    // Update status if any dependencies change
    (0, react_1.useEffect)(() => {
        handleHeightOrVisibilityChange();
    }, [handleHeightOrVisibilityChange]);
    // Also allow for re-measuring height even if none of the props or state
    // changes. This is useful if a carousel item is expandable.
    (0, react_1.useEffect)(() => {
        const node = slideRef.current;
        if (node && typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(handleHeightOrVisibilityChange);
            resizeObserver.observe(node);
            return () => resizeObserver.disconnect();
        }
    }, [handleHeightOrVisibilityChange]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: slideRef, className: [
            'slide',
            isCurrentSlide && isVisible && 'slide-current',
            typeOfSlide,
            isVisible && 'slide-visible',
            slideClassName
        ]
            .filter((value) => value)
            .join(' '), style: getSlideStyles(count, isCurrentSlide, isVisible, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight, initializedAdaptiveHeight) }, { children: children })));
};
exports.default = Slide;
//# sourceMappingURL=slide.js.map
import { ReactNode } from 'react';
import { Alignment } from './types';
declare const Slide: ({ count, children, currentSlide, index, isCurrentSlide, typeOfSlide, wrapAround, cellSpacing, animation, speed, slidesToShow, zoomScale, cellAlign, onVisibleSlideHeightChange, adaptiveHeight, initializedAdaptiveHeight, slideClassName }: {
    count: number;
    children: ReactNode | ReactNode[];
    currentSlide: number;
    index: number;
    isCurrentSlide: boolean;
    typeOfSlide: 'prev-cloned' | 'next-cloned' | undefined;
    wrapAround: boolean;
    cellSpacing: number;
    animation: 'zoom' | 'fade' | undefined;
    speed: number;
    slidesToShow: number;
    zoomScale: number | undefined;
    cellAlign: Alignment;
    /**
     * Called with `height` when slide becomes visible and `null` when it becomes
     * hidden.
     */
    onVisibleSlideHeightChange: (index: number, height: number | null) => unknown;
    adaptiveHeight: boolean;
    initializedAdaptiveHeight: boolean;
    slideClassName: string | undefined;
}) => JSX.Element;
export default Slide;
//# sourceMappingURL=slide.d.ts.map
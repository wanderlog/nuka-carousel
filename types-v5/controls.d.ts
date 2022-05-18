import React from 'react';
import { InternalCarouselProps } from './types';
declare const renderControls: (props: InternalCarouselProps, count: number, currentSlide: number, moveSlide: (to?: number | undefined) => void, nextSlide: () => void, prevSlide: () => void, slidesToScroll: number) => React.ReactElement[] | null;
export default renderControls;

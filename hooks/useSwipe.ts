import { useEffect, useState } from 'react';

interface SwipeInput {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    minSwipeDistance?: number;
    element?: HTMLElement | null;
}

export const useSwipe = ({
    onSwipeLeft,
    onSwipeRight,
    minSwipeDistance = 50,
    element
}: SwipeInput) => {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [startX, setStartX] = useState<number | null>(null);

    useEffect(() => {
        const target = element || document;

        const onTouchStart = (e: Event) => {
            const touchEvent = e as TouchEvent;
            const x = touchEvent.targetTouches[0].clientX;
            setTouchEnd(null);
            setTouchStart(x);
            setStartX(x);
        };

        const onTouchMove = (e: Event) => {
            const touchEvent = e as TouchEvent;
            setTouchEnd(touchEvent.targetTouches[0].clientX);
        };

        const onTouchEnd = () => {
            if (!touchStart || !touchEnd) return;

            const distance = touchStart - touchEnd;
            const isLeftSwipe = distance > minSwipeDistance;
            const isRightSwipe = distance < -minSwipeDistance;
            const windowWidth = window.innerWidth;

            // For left swipes (opening menu), only trigger if starting from the right edge
            if (isLeftSwipe && onSwipeLeft && (!element && startX && startX > windowWidth * 0.9)) {
                onSwipeLeft();
            }

            // For right swipes (closing menu), allow anywhere on the menu
            if (isRightSwipe && onSwipeRight && element) {
                onSwipeRight();
            }
        };

        target.addEventListener('touchstart', onTouchStart);
        target.addEventListener('touchmove', onTouchMove);
        target.addEventListener('touchend', onTouchEnd);

        return () => {
            target.removeEventListener('touchstart', onTouchStart);
            target.removeEventListener('touchmove', onTouchMove);
            target.removeEventListener('touchend', onTouchEnd);
        };
    }, [onSwipeLeft, onSwipeRight, touchStart, touchEnd, startX, minSwipeDistance, element]);

    return {};
}; 
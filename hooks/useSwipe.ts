import { useEffect, useRef } from 'react';

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
    const touchStartRef = useRef<number | null>(null);
    const touchEndRef = useRef<number | null>(null);
    const startXRef = useRef<number | null>(null);

    useEffect(() => {
        const target = element || document;

        const onTouchStart = (e: Event) => {
            const touchEvent = e as TouchEvent;
            const x = touchEvent.targetTouches[0].clientX;
            touchEndRef.current = null;
            touchStartRef.current = x;
            startXRef.current = x;
        };

        const onTouchMove = (e: Event) => {
            const touchEvent = e as TouchEvent;
            touchEndRef.current = touchEvent.targetTouches[0].clientX;
        };

        const onTouchEnd = () => {
            if (touchStartRef.current === null || touchEndRef.current === null) return;

            const distance = touchStartRef.current - touchEndRef.current;
            const isLeftSwipe = distance > minSwipeDistance;
            const isRightSwipe = distance < -minSwipeDistance;
            const windowWidth = window.innerWidth;

            // For left swipes (opening menu), only trigger if starting from the right edge
            if (isLeftSwipe && onSwipeLeft && (!element && startXRef.current !== null && startXRef.current > windowWidth * 0.9)) {
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
    }, [onSwipeLeft, onSwipeRight, minSwipeDistance, element]);

    return {};
}; 

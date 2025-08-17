import React, { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";

interface RainbowHighlightProps {
    color: string;
    children: React.ReactNode;
    order: number;
}

export const RainbowHighlight: React.FC<RainbowHighlightProps> = ({ color, children, order }) => {
    const elementRef = useRef<HTMLElement>(null);
    const annotationRef = useRef<RoughAnnotation | null>(null);

    useEffect(() => {
        if (elementRef.current) {
            // Create annotation
            annotationRef.current = annotate(elementRef.current, {
                type: "highlight",
                color: color,
                strokeWidth: 2,
                padding: 2,
                multiline: true,
                iterations: 1,
                animationDuration: 300,
            });

            // Show annotation with delay based on order
            const timer = setTimeout(() => {
                if (annotationRef.current) {
                    annotationRef.current.show();
                }
            }, order * 100);

            return () => {
                clearTimeout(timer);
                if (annotationRef.current) {
                    annotationRef.current.remove();
                }
            };
        }
    }, [color, order]);

    return (
        <span ref={elementRef}>
            {children}
        </span>
    );
}; 
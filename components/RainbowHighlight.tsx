import React from "react";
import { RoughNotation } from "react-rough-notation";

interface RainbowHighlightProps {
    color: string;
    children: React.ReactNode;
    order: number;
}

export const RainbowHighlight: React.FC<RainbowHighlightProps> = ({ color, children, order }) => {
    // Increase base duration and multiply by text length
    const animationDuration = Math.floor(300 * React.Children.count(children));

    return (
        <RoughNotation
            type="highlight"
            multiline={true}
            padding={[0, 2]}
            iterations={1}
            animationDuration={animationDuration}
            color={color}
            strokeWidth={2}
            order={order}
        >
            {children}
        </RoughNotation>
    );
}; 
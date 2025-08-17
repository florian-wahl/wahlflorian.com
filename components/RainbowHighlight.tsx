import React from "react";

interface RainbowHighlightProps {
    color: string;
    children: React.ReactNode;
    order: number;
}

export const RainbowHighlight: React.FC<RainbowHighlightProps> = ({ color, children, order }) => {
    return (
        <span 
            style={{ 
                backgroundColor: color,
                padding: '2px 4px',
                borderRadius: '4px',
                margin: '4px 0',
                display: 'inline-block'
            }}
        >
            {children}
        </span>
    );
}; 
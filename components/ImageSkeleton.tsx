import React from 'react';

interface ImageSkeletonProps {
    width?: number | string;
    height?: number | string;
    className?: string;
    rounded?: boolean;
}

/**
 * Placeholder held while an image loads.
 *
 * A flat --surface block: no shimmer gradient and no `animate-pulse`. DESIGN.md
 * §5 permits state-change motion only, and a looping skeleton is decoration —
 * the block already communicates "not loaded yet".
 */
const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
    width = '100%',
    height = '100%',
    className = '',
    rounded = false
}) => (
    <div
        aria-hidden="true"
        className={`bg-surface ${rounded ? 'rounded-lg' : ''} ${className}`}
        style={{
            width,
            height,
            minHeight: typeof height === 'number' ? `${height}px` : height
        }}
    />
);

export default ImageSkeleton;

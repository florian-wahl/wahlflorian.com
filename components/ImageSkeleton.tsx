import React from 'react';

interface ImageSkeletonProps {
    width?: number | string;
    height?: number | string;
    className?: string;
    rounded?: boolean;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
    width = '100%',
    height = '100%',
    className = '',
    rounded = false
}) => {
    return (
        <div
            className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${rounded ? 'rounded-lg' : ''} ${className}`}
            style={{
                width,
                height,
                minHeight: typeof height === 'number' ? `${height}px` : height
            }}
        >
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
        </div>
    );
};

export default ImageSkeleton;

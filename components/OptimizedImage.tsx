import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import ImageSkeleton from './ImageSkeleton';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    sizes?: string;
    fill?: boolean;
    style?: React.CSSProperties;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    sizes,
    fill = false,
    style = {}
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const { basePath } = useRouter();

    useEffect(() => {
        // For priority images, start loading immediately
        if (priority) {
            setIsLoaded(false);
            return;
        }

        // For non-priority images, use intersection observer for lazy loading
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Image is in view, start loading
                    setIsLoaded(false);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px 0px', // Start loading 100px before image comes into view
                threshold: 0.01
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    // Handle images that may already be loaded (e.g., from cache or preload)
    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoaded(true);
        }
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
        setHasError(false);
    };

    const handleError = () => {
        setHasError(true);
        console.warn(`Failed to load image: ${src}`);
    };

    // Always render the image, but show skeleton while loading
    if (fill) {
        return (
            <div className={`relative ${className}`} style={style}>
                <img
                    ref={imgRef}
                    src={src.startsWith('http') ? src : `${basePath}${src}`}
                    alt={alt}
                    className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        } ${className}`}
                    style={style}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    sizes={sizes}
                />
                {(!isLoaded || hasError) && (
                    <ImageSkeleton
                        width="100%"
                        height="100%"
                        className="absolute inset-0"
                    />
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            <img
                ref={imgRef}
                src={src.startsWith('http') ? src : `${basePath}${src}`}
                alt={alt}
                width={width}
                height={height}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                style={style}
                onLoad={handleLoad}
                onError={handleError}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                sizes={sizes}
            />
            {(!isLoaded || hasError) && (
                <ImageSkeleton
                    width={width || '100%'}
                    height={height || '100%'}
                />
            )}
        </div>
    );
};

export default OptimizedImage;

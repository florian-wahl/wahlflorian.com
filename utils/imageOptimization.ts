// Image optimization utilities for static export compatibility

export const preloadCriticalImages = (imageUrls: string[]) => {
    if (typeof window === 'undefined') return;

    imageUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
    });
};

export const getImageDimensions = (aspectRatio: number, containerWidth: number) => {
    const height = containerWidth / aspectRatio;
    return { width: containerWidth, height };
};

export const createImagePlaceholder = (width: number, height: number, color: string = '#f3f4f6') => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${color}'/%3E%3C/svg%3E`;
};

export const optimizeImageLoading = {
    // Priority images that should be loaded immediately
    priority: ['/headshot.webp'],
};

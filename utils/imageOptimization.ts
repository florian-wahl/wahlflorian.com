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

export const generateResponsiveImageUrl = (baseUrl: string, width: number): string => {
    // For external images, we can't resize them, but we can optimize loading
    // This function can be extended to work with image CDNs in the future
    return baseUrl;
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
    priority: ['/headshot.jpg'],

    // Images that can be lazy loaded
    lazy: [
        'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ywYLQMzS1NLVWYHB3B7sZA.jpeg',
        'https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/Instant%20ACH%20verification%20and%20meeting%20consumer%20expectations%20-%20Blog%20post.svg',
        'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yg7tmTyUqldSMY6ITNfsLQ.png'
    ]
};

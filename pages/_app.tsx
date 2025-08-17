import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { preloadCriticalImages, optimizeImageLoading } from '../utils/imageOptimization';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Preload critical images for better performance
        preloadCriticalImages(optimizeImageLoading.priority);

        // Add performance monitoring
        if (typeof window !== 'undefined' && 'performance' in window) {
            // Monitor Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input-delay') {
                        const fidEntry = entry as PerformanceEventTiming;
                        console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
                    }
                }
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input-delay'] });

            return () => observer.disconnect();
        }
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp; 
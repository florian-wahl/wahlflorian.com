import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from "@next/third-parties/google";

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    useEffect(() => {
        document.documentElement.lang = "en";
    }, []);

    useEffect(() => {
        // Not preloading here any more. This effect runs after hydration, so the
        // hint arrived long after the browser had already started fetching the
        // image via loading="eager" + fetchpriority="high" — which is what the
        // "preloaded but not used within a few seconds" console warning was
        // reporting. OptimizedImage handles priority loading on its own.

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
    }, [router.basePath]);

    useEffect(() => {
        if (!gaId) return;

        const handleRouteChange = (url: string) => {
            window.gtag?.('config', gaId, { page_path: url });
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, gaId]);

    return (
        <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
            {gaId && <GoogleAnalytics gaId={gaId} />}
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp; 

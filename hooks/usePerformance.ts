import { useEffect, useState } from 'react';

interface PerformanceMetrics {
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    ttfb: number | null;
}

export const usePerformance = () => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        lcp: null,
        fid: null,
        cls: null,
        ttfb: null
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Time to First Byte
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
            setMetrics(prev => ({
                ...prev,
                ttfb: navigationEntry.responseStart - navigationEntry.requestStart
            }));
        }

        // Core Web Vitals
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                switch (entry.entryType) {
                    case 'largest-contentful-paint':
                        setMetrics(prev => ({
                            ...prev,
                            lcp: entry.startTime
                        }));
                        break;
                    case 'first-input-delay':
                        const fidEntry = entry as PerformanceEventTiming;
                        setMetrics(prev => ({
                            ...prev,
                            fid: fidEntry.processingStart - fidEntry.startTime
                        }));
                        break;
                    case 'layout-shift':
                        const clsEntry = entry as any;
                        setMetrics(prev => ({
                            ...prev,
                            cls: clsEntry.value
                        }));
                        break;
                }
            }
        });

        observer.observe({
            entryTypes: ['largest-contentful-paint', 'first-input-delay', 'layout-shift']
        });

        return () => observer.disconnect();
    }, []);

    const logMetrics = () => {
        console.group('Performance Metrics');
        console.log('LCP (Largest Contentful Paint):', metrics.lcp, 'ms');
        console.log('FID (First Input Delay):', metrics.fid, 'ms');
        console.log('CLS (Cumulative Layout Shift):', metrics.cls);
        console.log('TTFB (Time to First Byte):', metrics.ttfb, 'ms');
        console.groupEnd();
    };

    return { metrics, logMetrics };
};

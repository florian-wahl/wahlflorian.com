import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import { generateResponsiveImageUrl, getImageDimensions, createImagePlaceholder } from './imageOptimization';

test('generateResponsiveImageUrl returns base URL', () => {
  const base = 'https://example.com/image.jpg';
  const result = generateResponsiveImageUrl(base, 800);
  assert.equal(result, base);
});

test('getImageDimensions computes height from aspect ratio', () => {
  const dims = getImageDimensions(2, 400);
  assert.deepEqual(dims, { width: 400, height: 200 });
});

test('createImagePlaceholder encodes width, height, and color', () => {
  const placeholder = createImagePlaceholder(100, 50, '#fff');
  assert.match(placeholder, /width='100'/);
  assert.match(placeholder, /height='50'/);
  assert.match(placeholder, /fill='#fff'/);
});

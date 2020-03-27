import React from 'react';

export interface RectClipPathProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const RectClipPath = ({
  id,
  x,
  y,
  width,
  height,
}: RectClipPathProps) => (
  <clipPath id={id}>
    <rect
      x={Math.max(0, x)}
      y={Math.max(0, y)}
      width={Math.max(0, width)}
      height={Math.max(0, height)}
    />
  </clipPath>
);

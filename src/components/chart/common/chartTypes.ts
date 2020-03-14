import { Map } from 'immutable';

export interface IChartSize {
  width: number;
  height: number;
}

export type IChartDimensions = IChartSize;

export interface IChartPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export type ILineChartData<T> = Map<string, T[]>;

export interface IChartPoint {
  x: number;
  y: number;
}

export interface IChartRect {
  origin: IChartPoint;
  size: IChartSize;
}

export interface MouseOverEventProps<Payload> {
  onValueMouseOver?(payload: Payload): void;
  onValueMouseOut?(): void;
}

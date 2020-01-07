import { Map } from 'immutable';

export interface IChartDimensions {
  width: number;
  height: number;
}

export interface IChartPadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export type ILineChartData<T> = Map<string, T[]>;

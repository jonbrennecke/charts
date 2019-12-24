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

export const zeroPadding: IChartPadding = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

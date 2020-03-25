import {
  line,
  curveLinear,
  curveStep,
  curveStepAfter,
  curveStepBefore,
  curveBasis,
  curveCardinal,
  curveMonotoneX,
  curveCatmullRom,
} from 'd3-shape';

export enum Curve {
  Linear = 'Linear',
  Step = 'Step',
  StepBefore = 'StepBefore',
  StepAfter = 'StepAfter',
  Basis = 'Basis',
  Cardinal = 'Cardinal',
  MonotoneX = 'MonotoneX',
  CatmullRom = 'CatmullRom',
}

export const d3CurveFunction = (curve: Curve | keyof typeof Curve) => {
  switch (curve) {
    case Curve.Linear:
      return curveLinear;
    case Curve.Step:
      return curveStep;
    case Curve.StepBefore:
      return curveStepBefore;
    case Curve.StepAfter:
      return curveStepAfter;
    case Curve.Basis:
      return curveBasis;
    case Curve.Cardinal:
      return curveCardinal;
    case Curve.MonotoneX:
      return curveMonotoneX;
    case Curve.CatmullRom:
      return curveCatmullRom;
    default:
      return curveLinear;
  }
};

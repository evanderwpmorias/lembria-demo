import { type animationStaggerConfig } from './animationStaggerConfig'
import { type animationSequenceStep } from './animationSequenceStep'
import { type animationScrollTimelineOptions } from './animationScrollTimelineOptions'

export interface animations {
  _id: string;
  name: string;
  event: string;
  target: string[];
  keyframes: any[];
  from: any;
  properties: any;
  duration: number;
  delay: number;
  easing: string;
  iterations: string;
  direction: string;
  stagger: animationStaggerConfig;
  sequence: animationSequenceStep[];
  scrollTimeline: animationScrollTimelineOptions[];
  condition: string;
  script: string;
}

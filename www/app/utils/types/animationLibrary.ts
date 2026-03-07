import { type animations } from './animations'
type Ref<T> = string | T;

export interface animationLibrary {
  _id: string;
  name: string;
  animation: Ref<animations>;
}

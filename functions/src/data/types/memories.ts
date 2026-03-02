import { type persons } from './persons'
import { type users } from './users'
type Ref<T> = string | T;

export interface memories {
  _id: string;
  summary: string;
  title: string;
  personIds: Ref<persons>;
  media: any;
  createdByUid: Ref<users>;
  capturedAt: any;
  embeddings: string;
}

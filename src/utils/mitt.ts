import type { Emitter } from 'mitt';
import mitt from 'mitt';

type Events = {
  resize: {
    detail: {
      width: number;
      height: number;
    };
  };
};

export const emitter: Emitter<Events> = mitt<Events>();

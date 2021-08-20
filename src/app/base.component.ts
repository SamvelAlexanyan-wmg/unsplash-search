import {Subject} from "rxjs";

export class BaseComponent {
  destroyed$ = new Subject();

  destroy() {
    this.destroyed$.next()
    this.destroyed$.complete();
  }
}

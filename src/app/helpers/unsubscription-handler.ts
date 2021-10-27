import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class UnsubscriptionHandler implements OnDestroy {

  protected unsubscribe$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

import {
  Component,
  inject,
  DestroyRef,
  OnInit,
  signal,
  effect,
  computed,
} from "@angular/core";
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { interval, map, Observable } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      subscriber.error();
      if (timesExecuted > 5) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...')
      subscriber.next({ message: 'New value!' });
      timesExecuted ++;
    }, 2000);
  });
  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked ${this.clickCount()} times.`);
    // });
  }

  ngOnInit() {
    // setInterval(() => {
    //   // update some signal
    //   this.interval.update((oldValue) => oldValue + 1);
    // }, 1000);
    //   const subscription = interval(1000).pipe(
    //     map((val) => val * 2),
    //   ).subscribe({
    //     next: (val) => console.log(val)
    //   });

    //   this.destroyRef.onDestroy(() => {
    //     subscription.unsubscribe();
    //   });
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Completed'),
      error: (val) => console.log(val)
    });
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked ${this.clickCount()} times.`)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((oldCount) => oldCount + 1);
  }
}

import {
  Component,
  inject,
  DestroyRef,
  OnInit,
  signal,
  effect,
  computed,
} from "@angular/core";

import { interval, map } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  interval = signal(0);
  doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(`Clicked ${this.clickCount()} times.`);
    });
  }

  ngOnInit() {
    setInterval(() => {
      // update some signal
      this.interval.update((oldValue) => oldValue + 1);
    }, 1000);
    //   const subscription = interval(1000).pipe(
    //     map((val) => val * 2),
    //   ).subscribe({
    //     next: (val) => console.log(val)
    //   });

    //   this.destroyRef.onDestroy(() => {
    //     subscription.unsubscribe();
    //   });
  }

  onClick() {
    this.clickCount.update((oldCount) => oldCount + 1);
  }
}

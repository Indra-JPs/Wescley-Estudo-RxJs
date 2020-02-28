import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

  subscription: Subscription;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit(): void {
    this.s1 = 'Initial';
    this.s2 = 'Initial';

    const myInterval = new Observable(
      (observer: Observer<any>) => {
        let i = 0;
        let id = setInterval(() => {
          i++;
          console.log(i);

          if (i == 10) {
            observer.complete();
          } else if(i % 2 == 0) {
            observer.next(i);
          }
        }, 1000);

        return () => {
          clearInterval(id);
        }
      }
    );

    this.subscription = myInterval.subscribe(
      (n: number) => this.n1 = n,
      (error: any) => this.s1 = error,
      () => this.s1 = 'Completed...'
    );

    setTimeout(() => {
      this.subscription.unsubscribe();
    }, 5000);
  }

}

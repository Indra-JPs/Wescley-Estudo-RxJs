import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  subscription: Subscription;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit(): void {
    this.s1 = 'Initial';
    this.s2 = 'Initial';

    const myFirstObservable = new Observable(
      (observer: Observer<number>) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.error('error');
        observer.complete();
      }
    );

    myFirstObservable.subscribe(
      (n: number) => console.log(n),
      (error: any) => console.log(error),
      () => console.log('Completed...'));

    const timerCount = interval(500);
    timerCount.subscribe(n => console.log(n));

    console.log('After interval');

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

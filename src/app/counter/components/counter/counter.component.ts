import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h3>Counter: {{ counter }}</h3>
    <button (click)="modifyCounterBy(-1)">-1</button>
    <button (click)="resetCounter()">RESET</button>
    <button (click)="modifyCounterBy(+1)">+1</button>
  `
})
export class CounterComponent {
  public counter: number = 10;

  constructor() {}

  modifyCounterBy(value: number): void {
    value > 0 ? (this.counter += 1) : (this.counter -= 1);
  }

  resetCounter(): void {
    this.counter = 10;
  }
}

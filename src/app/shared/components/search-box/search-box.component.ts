import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = 'Search...';

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue(searchValue: string): void {
    this.onValue.emit(searchValue);
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() tableInput: any;
  @Input() caption: string;
  constructor() { }

}

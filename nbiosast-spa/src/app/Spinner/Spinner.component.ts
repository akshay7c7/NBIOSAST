import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Spinner',
  templateUrl: './Spinner.component.html',
  styleUrls: ['./Spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  message = 'Loading data...';
  constructor() { }

  ngOnInit() {
  }

}

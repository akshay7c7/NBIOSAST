import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-SpinnerOverlay',
  templateUrl: './SpinnerOverlay.component.html',
  styleUrls: ['./SpinnerOverlay.component.scss']
})
export class SpinnerOverlayComponent implements OnInit {
  @Input() public message: string;
  constructor() { }

  ngOnInit() {
  }

}

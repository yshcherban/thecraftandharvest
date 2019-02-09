import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.scss']
})
export class GooglemapComponent implements OnInit {
  lat: number = 39.519424;
  lng: number = -104.763975;
  zoom: number = 9;

  constructor() { }

  ngOnInit() {
  }

}

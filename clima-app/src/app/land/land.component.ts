import { Component, OnInit } from '@angular/core';
// should be change in Production
// import { environment } from "../environments/environment.prod";
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.scss']
})
export class LandComponent implements OnInit{
  constructor() { }
  ngOnInit() {
    localStorage.removeItem(environment.query);
    localStorage.removeItem(environment.result);
  }
}

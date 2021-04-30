import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private api: ApiService) { }

  async ngOnInit() {

    // test

    let obj = {
      clima: {
        query: "1, 2, ab",
        numbers: "1, 2",
        result: 3
      }
    }
    await this.api.getAllHistory().then(result => console.log(result)).catch((error) => console.log(error));
    await this.api.postOne(obj).then(result => console.log(result)).catch((error) => console.log(error));

  }

}

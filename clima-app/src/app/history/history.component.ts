import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private restFullApi: ApiService) { }

  async ngOnInit() {
    await this.restFullApi.getAllHistory().then(res => console.log(res)).catch(err => {
          console.log(err);
      });
  }

}

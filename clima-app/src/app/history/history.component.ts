import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

//import { History } from '../models/interfaceHistory'
import { Clima } from '../models/clima';

import { ApiService } from '../api.service';
import { returnErrorText } from '../utils/returnError';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit {

  showMessage: string;
  displayedColumns: string[] = ['id', 'query', 'numbers', 'result'];
  dataSource: MatTableDataSource<Clima>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService) {
    this.dataSource = new MatTableDataSource([]);
    this.showMessage = "";
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ngOnInit() {
     this.api.action$.subscribe(async () => {
      await this.callDataTable();
    })
    await this.callDataTable();
  }

  async callDataTable() {
    await this.api.getAllHistory().then(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch((err) => {
        this.showMessage = returnErrorText(err.statusText);
        this.resetResponse(3000);
      });
  }
    resetResponse(time: number){
    setTimeout(async () => {
      this.showMessage = "";
    }, time);
  }

}

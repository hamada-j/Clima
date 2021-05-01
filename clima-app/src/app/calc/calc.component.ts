import { Component, ElementRef, Inject,  Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// should be change in Production
// import { environment } from "../environments/environment.prod";
import { environment } from "../../environments/environment";

import { ApiService } from '../api.service';

import { generateId } from '../utils/generateId';
import { localStorageItems } from '../utils/localStorageItems';
import { returnErrorText } from '../utils/returnError';
import { returnElementDOM } from '../utils/returnInputDOM';
import { returnLimit } from '../utils/returnLimit';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent  {

  arrIds: Array<string>;
  resultCalc: boolean;
  result: number;
  showMessage: string;

  @ViewChild('divInput') toAddElement:ElementRef;
  constructor(
     private apiService: ApiService,
     private elementRef: ElementRef,
     private renderer: Renderer2,
     @Inject(DOCUMENT)
     private document) {

    this.arrIds = [];
    this.resultCalc = false;
    this.result = 0;
    this.showMessage = "";

  }

  addElementMethod(e: unknown){
    let limit: number = 51
    if (this.arrIds.length < limit ) {
      let idInput: string = generateId();
      this.toAddElement.nativeElement.insertAdjacentHTML('beforeend', returnElementDOM(idInput));
      this.arrIds.push(idInput);
      this.resultCalc = false;
    }else{
      this.showMessage = returnLimit(limit);
      this.resetResponse(5000);
    }

  }

  removeElementMethod(e: unknown){

    if (this.arrIds.length > 0 ) {
      let element: any = this.document.getElementById('inputUser');
      let id: string= element.lastChild.id;
      this.arrIds.splice(this.arrIds.indexOf(id), 1);
      element.removeChild(element.lastChild);
      this.resultCalc = false;
    }
  }

  async onSubmit(formValues: any) {

    const regEx = /^\d+\.\d+$|^\d+$/;
    let jsonObject: Object = {};
    let arrayOnlyNumbers: Array<number> = [];
    let query: string = "";
    let valueFirst: string = formValues.userInputValue.trim();
    let checkInput: boolean = false;
    this.resultCalc = false;
    query += valueFirst;

    if (regEx.test(valueFirst)) arrayOnlyNumbers.push(Number(valueFirst))

    if (this.arrIds.length > 0 || arrayOnlyNumbers.length > 0) {

      for (let i: number = 0; i < this.arrIds.length; i++){

        let valueInputArray:string = this.document.getElementById(this.arrIds[i]).value.trim();
        if( valueInputArray === "") checkInput = true;
        query = query + ", " + valueInputArray;
        if (regEx.test(valueInputArray)) arrayOnlyNumbers.push(Number(valueInputArray));

      }
      if ( checkInput || valueFirst === ""){
        // Show user witch ones it is empty (( TO DO ))
        this.showMessage = " There is some EMPTY input!"
        this.resetResponse(3000);

      } else {

        let sum: string = parseFloat(arrayOnlyNumbers.reduce((a, b) => a + b, 0).toString()).toFixed(2)
        this.result = Number(sum);
        let numbers: string = arrayOnlyNumbers.map(num => num.toString()).join(', ');
        this.resultCalc = true;

        jsonObject = {
          clima: {
            query: query,
            numbers: numbers,
            result: this.result
          }
        };
        await this.apiService.postOne(jsonObject).then((res) => {
          this.apiService.action$.emit('storage');
          localStorageItems(res['result'], res['query'])
          this.showMessage = `Your Query is: " ${res['query']} "`;
          this.resetResponse(5000);

        }).catch((err) => {
            if(err.error.query[0]){
                this.showMessage = returnErrorText(`${err.error.query[0]}. ${err.statusText}`);
                this.resetResponse(3000);
            } else {
                this.showMessage = returnErrorText(err.statusText);
                this.resetResponse(3000);
            }
        });
      }
    } else {

      jsonObject = {
        clima: {
          query: query,
          numbers: null,
          result: null
        }
      };
      await this.apiService.postOne(jsonObject).then((res) => {
        this.apiService.action$.emit(environment.emit);
        localStorageItems(null, res['query'])
        this.showMessage = `Your Query is: " ${res['query']} "`;
        this.resetResponse(5000);


      }).catch((err) => {
          if(err.error.query[0]){
            this.showMessage = returnErrorText(`${err.error.query[0]}. ${err.statusText}`);
            this.resetResponse(3000);
          } else {
            this.showMessage = returnErrorText(err.statusText);;
            this.resetResponse(3000);
          }
      });

    }

  }

  getLastResultMethod($event: unknown){
    this.result = Number(parseFloat(localStorage.getItem(environment.result)).toFixed(2));
    this.showMessage = `Your Last Query was: " ${localStorage.getItem(environment.query)} "`;
    this.resultCalc = true;
    this.resetResponse(5000);
  }

  resetResponse(time: number){
    setTimeout(async () => {
      this.showMessage = ""
    }, time);
  }
}

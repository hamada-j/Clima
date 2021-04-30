import { Component, ElementRef, Inject,  Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ApiService } from '../api.service';

import { generateId } from '../utils/generateId';
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
    this.result = 0
    this.showMessage = "";

  }

  addElementMethod(e: unknown){

    if (this.arrIds.length < 50 ) {
      let idInput: string = generateId();
      this.toAddElement.nativeElement.insertAdjacentHTML('beforeend', `<input type="text" id="${idInput}" ngModel />`);
      this.arrIds.push(idInput);
      this.resultCalc = false;
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

        this.showMessage = " There is some EMPTY input!"
        this.resetResponse(3000);

      } else {

        this.result = arrayOnlyNumbers.reduce((a, b) => a + b, 0);
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

          this.showMessage = `Your Query is: " ${res['query']} "`;
          this.resetResponse(5000);

        }).catch((err) => {
            if(err.error.query[0]){
                this.showMessage = `Somme error happened: ${err.error.query[0]}. ${err.statusText}. Please try again.`;
                this.resetResponse(3000);
            } else {
                this.showMessage = `Somme error happened: ${err.statusText}. Please try again.`;
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

        this.showMessage = `Your Query is: " ${res['query']} "`;
        this.resetResponse(5000);

      }).catch((err) => {
          if(err.error.query[0]){
            this.showMessage = `Somme error happened: ${err.error.query[0]}. ${err.statusText}. Please try again.`;
            this.resetResponse(3000);
          } else {
            this.showMessage = `Somme error happened: ${err.statusText}. Please try again.`;
            this.resetResponse(3000);
          }
      });

    }

  }

  resetResponse(time: number){
    setTimeout(async () => {
      this.showMessage = ""
    }, time);
  }
}

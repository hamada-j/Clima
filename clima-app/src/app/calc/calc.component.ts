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

  }



     addElementMethod(e){

      if (this.arrIds.length < 50 ) {
        let idInput = generateId();
        this.toAddElement.nativeElement.insertAdjacentHTML('beforeend', `<input type="text" id="${idInput}" ngModel />`);
        this.arrIds.push(idInput);
        console.log(this.arrIds);
      }

    }

  removeElementMethod(e){

    if (this.arrIds.length > 0 ) {
      let element = this.document.getElementById('inputUser');
      let id = element.lastChild.id
      this.arrIds.splice(this.arrIds.indexOf(id), 1);
      element.removeChild(element.lastChild);
      console.log(this.arrIds)
    }
  }

  async onSubmit(formValues) {
    const regEx = /^\d+\.\d+$|^\d+$/;
    let jsonObject: Object = {};
    let arrayOnlyNumbers: Array<number> = [];
    let query: string = "";
    let valueFirst: string = formValues.userInputValue.trim();
    query += valueFirst
    if (regEx.test(valueFirst)) arrayOnlyNumbers.push(Number(valueFirst))
    if (this.arrIds.length > 0 || arrayOnlyNumbers.length > 0) {
      for (let i: number = 0; i < this.arrIds.length; i++){
        let valueInputArray = this.document.getElementById(this.arrIds[i]).value.trim()
        query = query + ", " + valueInputArray;
        if (regEx.test(valueInputArray)) arrayOnlyNumbers.push(Number(valueInputArray))
      }
      this.result = arrayOnlyNumbers.reduce((a, b) => a + b, 0);
      let numbers = arrayOnlyNumbers.map(num => num.toString()).join(', ');
      this.resultCalc = true;


      jsonObject = {
        clima: {
        query: query,
        numbers: numbers,
        result: this.result
        }
      };

      await this.apiService.postOne(jsonObject).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err) });

    } else {

      jsonObject = {
         clima: {
          query: query,
          numbers: null,
          result: null
         }
        };

      await this.apiService.postOne(jsonObject).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err) });

    }

  }





}

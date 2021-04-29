import { Component, ElementRef, Inject,  Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document) {
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


    onSubmit(formValues) {console.log(formValues)}






}

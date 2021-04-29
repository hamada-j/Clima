import { Component, ElementRef, Inject,  Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent  {

  arrIds = [];
  resultCalc: boolean = false;
  result: number = 0;

  @ViewChild('divInput') toAddElement:ElementRef;
  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document) { }



    addElementMethod(e){console.log(e)}

    removeElementMethod(e){console.log(e)}

    onSubmit(formValues) {console.log(formValues)}


    generateId(){
    const ALPHABET: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ID_LENGTH: number = 6;
      let rtn: string = '';
      for (let i: number = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
      }
    return rtn;
  }


}

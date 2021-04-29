import { Component } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent  {

  arrIds = [];
  resultCalc: boolean = false;
  result: number = 0;

  constructor() { }

    addElementMethod(e){console.log(e)}

    removeElementMethod(e){console.log(e)}

    onSubmit(formValues) {console.log(formValues)}


}

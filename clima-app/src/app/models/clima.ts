export class Clima {
  id: number;
  query: string;
  numbers: string;
  results: number;

    constructor(pId: number, pQuery: string, pNumbers: string, pResults: number) {
      this.id = pId;
      this.query = pQuery;
      this.numbers = pNumbers;
      this.results = pResults;
    }

}

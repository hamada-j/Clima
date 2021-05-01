import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";

import { Clima } from "./models/clima";

// should be change in Production URL
// import { environment } from "../environments/environment.prod";
import { environment } from "../environments/environment";
const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})

export class ApiService {

  action$ = new EventEmitter<String>();

  baseUrl = BACKEND_URL;


  constructor(private httpClient: HttpClient) {}

  getAllHistory(): Promise<Clima[]> {
    return this.httpClient.get<Clima[]>(`${this.baseUrl}`, ).toPromise();
  }

   postOne(inputValueObject: object): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, inputValueObject, ).toPromise();
  }

  // Add Header in Production
  createHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type',})
    };
  }


}

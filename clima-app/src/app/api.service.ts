import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";

import { environment } from "../environments/environment";


const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})

export class ApiService {



  baseUrl = BACKEND_URL;


  constructor(private httpClient: HttpClient) {}

  getAllHistory(): Promise<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}`,this.createHeaders()).toPromise();
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'text/json'})
    };
  }


}

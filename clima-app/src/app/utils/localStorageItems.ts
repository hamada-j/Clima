// should be change in Production
// import { environment } from "../environments/environment.prod";
import { environment } from "../../environments/environment";

export function localStorageItems(result:string, query: string):void {
  localStorage.setItem(environment.result, result);
  localStorage.setItem(environment.query, query);
}

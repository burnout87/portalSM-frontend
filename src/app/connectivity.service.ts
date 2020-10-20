import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Machine } from "./machine";
import * as Rx from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ConnectivityService {
  constructor(private http: HttpClient) {}

  public InsertNewMachine(data: Machine): Rx.Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.post(environment.addSms, data, httpOptions);
  }
}

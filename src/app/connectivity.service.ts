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

  public InsertNewMachine(data: FormData): Rx.Observable<object> {
    return this.http.post(environment.sms, data);
  }

  public RemoveMachine(id: Number): Rx.Observable<object> {
    return this.http.delete(environment.sms + '/' + id);
  }

  public GetMachines(): Rx.Observable<object[]> {
    return this.http.get<object[]>(environment.sms);
  }
}

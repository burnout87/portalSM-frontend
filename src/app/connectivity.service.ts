import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Machine } from "./machine";
import * as Rx from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ConnectivityService {
  constructor(private http: HttpClient) {}

  public InsertNewMachine(data: FormData): Rx.Observable<any> {
    return this.http.post(environment.sms, data, 
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  public UpdateCard(data: FormData): Rx.Observable<any> {
    return this.http.post(environment.updateCard, data,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  public RemoveMachine(id: Number): Rx.Observable<object> {
    return this.http.delete(environment.sms + '/' + id);
  }

  public GetMachines(): Rx.Observable<object[]> {
    return this.http.get<object[]>(environment.sms);
  }

  public SearchMachines(q: object): Rx.Observable<object[]> {
    return this.http.post<object[]>(environment.smsSearch, q);
  }

  public GetOwners(): Rx.Observable<object[]> {
    return this.http.get<object[]>(environment.owners);
  }

  public GetOwnersQuery(queryFilter): Rx.Observable<object[]> {
    return this.http.get<object[]>(environment.owners + '?q=' + queryFilter,);
  }
}

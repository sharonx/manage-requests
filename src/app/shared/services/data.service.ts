import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { ICustomer, IOrder, IState, IRequests } from '../interfaces';

@Injectable()
export class DataService {
  
    _baseUrl: string = '';
    customers: ICustomer[];
    requests: IRequests[];
    orders: IOrder[];
    states: IState[];

    constructor(private http: Http) { }
    

    getRequests() : Observable<IRequests[]> {
        if (!this.requests) {
            return this.http.get(this._baseUrl + 'requests.json')
                        .map((res: Response) => {
                            this.requests = res.json();
                            return this.requests;
                        })
                        .catch(this.handleError);
        }
        else {
            //return cached data
            return this.createObservable(this.requests);
        }
    }
    
    addRequest(request: IRequests) : Observable<IRequests[]> {
        this.requests.push(request);
        return this.createObservable(this.requests);
    }
    
    private createObservable(data: any) : Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next(data);
            observer.complete();
        });
    }
    
    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}

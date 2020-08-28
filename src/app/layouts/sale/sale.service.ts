import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

import {ISale} from './sale.model';

@Injectable({providedIn: 'root'})
export class SaleService {
    private readonly resourceUrl = environment.url + '/api/sale';

    constructor(private http: HttpClient) {}

    getAll(): Observable<ISale[]> {
        return this.http.get<ISale[]>(`${this.resourceUrl}/list`);
    }

    findById(id: number): Observable<ISale> {
        return this.http.get<ISale>(`${this.resourceUrl}/${id}`);
    }

    create(sale: ISale): Observable<ISale> {
        return this.http.post<ISale>(`${this.resourceUrl}/save`, sale);
    }

    update(sale: ISale): Observable<ISale> {
        return this.http.put<ISale>(`${this.resourceUrl}/update`, sale);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.resourceUrl}/delete/${id}`);
    }
}

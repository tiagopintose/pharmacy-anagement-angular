import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {SaleService} from './sale.service';
import {ISale, Sale} from './sale.model';

@Injectable({providedIn: 'root'})
export class SaleResolver implements Resolve<ISale> {
    constructor(private service: SaleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISale> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findById(id).pipe(map(sale => sale));
        }
        return of(new Sale());
    }
}

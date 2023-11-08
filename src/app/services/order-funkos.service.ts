import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderFunkosService {

    constructor() {}

    private orderTypeSubject = new BehaviorSubject<'az' | 'za' | 'desc' | 'asc'>('az');
    orderType$ = this.orderTypeSubject.asObservable();

    setOrderType(orderType: 'az' | 'za' | 'desc' | 'asc') {
        this.orderTypeSubject.next(orderType);
    }

    private searchQuerySubject = new BehaviorSubject<string>('');
    searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

    setSearchQuery(query: string) {
        this.searchQuerySubject.next(query);
    }

    private categoryQuerySubject = new BehaviorSubject<string>('');
    categoryQuery$: Observable<string> = this.categoryQuerySubject.asObservable();

    setCategoryQuery(serie: string) {
        this.categoryQuerySubject.next(serie);
    }
}

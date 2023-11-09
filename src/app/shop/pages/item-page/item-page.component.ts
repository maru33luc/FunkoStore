import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../../item/item.component';
import { Observable } from 'rxjs';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent {
title: string = 'PRODUCTOS RELACIONADOS';
selectedItemLicence: string | undefined;
selectedItemLicence$ : Observable<string> | undefined;

constructor( private funkoService: FunkosService) {
  this.funkoService.getFilteredFunkosObservable().subscribe(filteredFunkos => {
    this.selectedItemLicence = filteredFunkos[0].licence;
  });
 }

}

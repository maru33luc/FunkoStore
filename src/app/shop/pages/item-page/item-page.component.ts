import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../../item/item.component';
import { Observable } from 'rxjs';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-item-page',
    templateUrl: './item-page.component.html',
    styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent {
    title: string = 'PRODUCTOS RELACIONADOS';
    selectedItemLicence: string | undefined;
    selectedItemLicence$: Observable<string> | undefined;

    constructor(private funkoService: FunkosService,
        private activatedRoute: ActivatedRoute) {
            this.obtenerIdItem();

    }

    obtenerIdItem() {
        this.activatedRoute.paramMap.subscribe(async(params) =>  {
            let id = params.get('id');
            const resp = await this.funkoService.getFunko(parseInt(id || ''));
            this.selectedItemLicence = resp?.licence;
        });
    }
}
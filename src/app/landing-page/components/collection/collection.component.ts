import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FunkosService } from 'src/app/services/funkos.service';
import { OrderFunkosService } from 'src/app/services/order-funkos.service';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
    
    constructor(private funkoService: FunkosService) {
    }

    ngOnInit() {
        this.funkoService.emitirLanding("home");
    }

    scrollToTop() {
        window.scroll(0, 0);
    }
}

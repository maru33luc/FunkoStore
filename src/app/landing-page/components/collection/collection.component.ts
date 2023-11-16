import { Component } from '@angular/core';
import { FunkosService } from 'src/app/services/funkos.service';

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

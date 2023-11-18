import { Component, OnInit } from '@angular/core';
import { FunkosService } from 'src/app/services/funkos.service';
import AOS from 'aos';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit{
    
    constructor(private funkoService: FunkosService) {
    }

    ngOnInit() {
        AOS.init();
    }

    scrollToTop() {
        window.scroll(0, 0);
    }
}

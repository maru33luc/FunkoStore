import { Component } from '@angular/core';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent {

    scrollToTop() {
        window.scroll(0, 0);
    }
}

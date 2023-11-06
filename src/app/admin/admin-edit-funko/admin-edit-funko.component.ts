import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-admin-edit-funko',
    templateUrl: './admin-edit-funko.component.html',
    styleUrls: ['./admin-edit-funko.component.css']
})
export class AdminEditFunkoComponent implements OnInit {
    name?: string;
    category?: string;
    serie?: string;
    description?: string;
    price?: number;
    frontImage?: string;
    backImage?: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private funkosService: FunkosService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(async (params) => {
            const id = params['id'];
            try {
                const response = await this.funkosService.getFunko(id);
                if (response) {
                    this.name = response.name;
                    this.category = response.category;
                    this.serie = response.serie;
                    this.description = response.description;
                    this.price = response.price;
                    this.frontImage = response.frontImage;
                    this.backImage = response.backImage;
                }
            } catch (e) {
                console.log(e);
            }
        });
    }

    saveFunko(funko: Funko) {
        this.funkosService.putFunko(funko, this.route.snapshot.params['id']);
        Swal.fire({
            title: "El producto ha sido modificado",
            icon: "success"
        }).then(() => {
            this.router.navigate(['/admin']);
            this.scrollToTop();
        });
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}
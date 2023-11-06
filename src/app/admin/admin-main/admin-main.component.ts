import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
import { OrderFunkosService } from 'src/app/services/order-funkos.service';

@Component({
    selector: 'app-admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
    lista: Funko[] = [];
    searchQuery: string = '';
    hasResults: boolean = true;
    listaFiltrada : Observable  <Funko[]> | undefined;

    constructor(
        private funkosService: FunkosService,
        private orderService: OrderFunkosService,
    ) { }

    ngOnInit() {
        this.mostrarFunkos();
        this.funkosService.getFilteredFunkosObservable().subscribe(filteredFunkos => {
            this.lista = filteredFunkos;
        });

    }

    filterFunkos(query: string) {
        this.funkosService.filterFunkosByName(query);
    }

    async mostrarFunkos() {
        const response = await this.funkosService.getFunkos();
        if (response) {
            this.lista = response;
        }
    }

    async eliminarFunko(id: number | undefined) {
        const ok = confirm('¿Está seguro que desea eliminar este Funko?');
        if (ok) {
            await this.funkosService.deleteFunko(id);
            this.scrollToTop();
            window.location.reload();
        }
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}
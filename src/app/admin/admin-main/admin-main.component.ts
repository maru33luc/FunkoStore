import { Component, OnInit } from '@angular/core';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
import { OrderFunkosService } from 'src/app/services/order-funkos.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
    lista: Funko[] = [];
    searchQuery: string = '';
    hasResults: boolean = true;

    constructor(
        private funkosService: FunkosService,
        private orderService: OrderFunkosService,
    ) { }

    ngOnInit() {
        this.orderService.searchQuery$.subscribe((query) => {
            this.searchQuery = query;
            this.filterFunkos();
        });
    }

    onSearchChange(query: string) {
        this.orderService.setSearchQuery(query);
    }

    filterFunkos() {
        if (this.searchQuery.trim() === '') {
            this.mostrarFunkos();
            this.hasResults = true;
        } else {
            const filteredFunkos = this.lista.filter((funko) =>
                (funko.name || '').toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            if (filteredFunkos.length === 0) {
                this.lista = [];
                this.hasResults = false;
            } else {
                this.lista = filteredFunkos;
                this.hasResults = true;
            }
        }
    }

    async mostrarFunkos() {
        const response = await this.funkosService.getFunkos();
        if (response) {
            this.lista = response;
        }
    }

    async eliminarFunko(id: number | undefined) {
        const result = await Swal.fire({
            title: 'Eliminar?',
            text: 'Estás seguro de eliminar este registro.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await this.funkosService.deleteFunko(id);
            const result = await Swal.fire(
                'Eliminado!',
                'El registro ha sido eliminado.',
                'success'
            );
            if (result.isConfirmed) {
                this.scrollToTop();
                window.location.reload();
            }
        }
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}
import { Component, OnInit } from '@angular/core';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
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

    constructor(private funkosService: FunkosService) { }

    ngOnInit() {
        this.mostrarFunkos();
        this.funkosService.getFilteredFunkosObservable().subscribe(filteredFunkos => {
            this.lista = filteredFunkos;
            if (this.lista.length == 0) {
                this.hasResults = false;
            } else {
                this.hasResults = true;
            }
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

    eliminarFunko(id: number | undefined) {
        Swal.fire({
            title: "¿Está seguro que desea eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF3333",
            cancelButtonColor: "#1D84B5",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                this.funkosService.deleteFunko(id);
                Swal.fire({
                    title: "El producto ha sido eliminado",
                    icon: "success",
                    confirmButtonColor: "#1D84B5"
                }).then(() => {
                    this.scrollToTop();
                    window.location.reload();
                });
            }
        });
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}
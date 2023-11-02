import { Component, OnInit } from '@angular/core';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  funkos!: Funko[];

  constructor(private funkosService: FunkosService) { }

  ngOnInit(): void {
    this.mostrarFunkos();
  }

  async mostrarFunkos() {
    const response = await this.funkosService.getFunkos();
    if (response) {
      this.funkos = response;
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
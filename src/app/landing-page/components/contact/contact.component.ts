import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent {

    formContact: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        mail: ['', Validators.required],
        telephone: ['', [Validators.required]],
        message: ['', [Validators.required]],
    });

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    validate(field: string, error: string) {
        return (
            this.formContact.controls[field].getError(error) &&
            this.formContact.controls[field].touched);
    }

    sendContact() {
        if (this.formContact.invalid) {
            this.formContact.markAllAsTouched();
        } else {
            const contacto: string =
                `Fecha: ${new Date().toLocaleDateString()}\n` +
                `Hora: ${new Date().toLocaleTimeString()}\n` +
                `Nombre: ${this.formContact.controls['name'].value}\n` +
                `Correo: ${this.formContact.controls['mail'].value}\n` +
                `Teléfono: ${this.formContact.controls['telephone'].value}\n` +
                `Mensaje: ${this.formContact.controls['message'].value}`;

            /*ACÁ VA LA FUNCIÓN QUE ENVÍA EL MENSAJE A UN MAIL*/

            Swal.fire({
                text: "Su mensaje ha sido enviado",
                icon: "success",
            }).then(() => {
                this.router.navigate(['/home']);
                this.scrollToTop();
            });
        }
    }

    scrollToTop() {
        window.scroll(0, 0);
    }
}
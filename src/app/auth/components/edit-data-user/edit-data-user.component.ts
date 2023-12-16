import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-edit-data-form',
    templateUrl: './edit-data-user.component.html',
    styleUrls: ['./edit-data-user.component.css']
})
export class EditDataUserComponent implements OnInit {

    editDataForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(30)]],
        lastname: ['', [Validators.required, Validators.maxLength(30)]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
        address: ['', [Validators.required, Validators.maxLength(50)]]
    });
    isUser: boolean = false;
    dataLoaded: boolean = true;

    constructor(private fb: FormBuilder, private loginService: LoginService, private router:Router) { }

    ngOnInit() {
        this.obtenerDatos();
    }

    async obtenerDatos() {
        try {
            // Obtener datos actuales del usuario
            const userData: any = await this.loginService.getDataActualUser();
            const user = this.loginService.getUser();
            this.loginService.authStateObservable()?.subscribe((user) => {
                if (user) {
                    this.loginService.getDataActualUser()?.then((userData: any) => {
                        this.editDataForm.patchValue({
                            name: userData.nombre,
                            lastname: userData.apellido,
                            phone: userData.teléfono,
                            address: userData.dirección
                        });
                    });
                }
            });
        } catch (error) {
            console.error('Error al obtener datos del usuario', error);
        }
    }

    // Método para validar campos del formulario
    validate(field: string, error: string): boolean {
        return (
            this.editDataForm.controls[field].getError(error) &&
            this.editDataForm.controls[field].touched
        );
    }

    // Método para manejar la lógica de actualización de datos
    editData() {
        if (this.editDataForm.invalid) {
            this.editDataForm.markAllAsTouched();
            return;
        }

        // Realizar la lógica de actualización de datos utilizando el servicio
        const { name, lastname, phone, address } = this.editDataForm.value;
        try {
            // Puedes llamar a un método del servicio para actualizar los datos del usuario
            // (asegúrate de implementar este método en tu servicio)
            this.loginService.updateUserData(name, lastname, phone, address);

            // redirigir al home
            Swal.fire({
                text: "El usuario ha sido modificado",
                icon: "success",
            }).then(() => {
                this.router.navigate(['/home']);
                this.scrollToTop();
            });
            
        } catch (error) {
            console.error('Error al actualizar los datos', error);
        }
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}
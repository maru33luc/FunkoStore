import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funko } from 'src/app/interfaces/Funko';

@Component({
    selector: 'app-admin-form',
    templateUrl: './admin-form.component.html',
    styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent {
    @Input() name?: string;
    @Input() category?: string;
    @Input() serie?: string;
    @Input() description?: string;
    @Input() price?: number;
    @Input() frontImage?: string;
    @Input() backImage?: string;

    formAdmin: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        category: ['', Validators.required],
        serie: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        price: [0, [Validators.required, Validators.min(1)]],
        description: ['', [Validators.required, Validators.maxLength(100)]],
        frontImage: ['', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]],
        backImage: ['', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]]
    });

    @Output() sendFunko = new EventEmitter<Funko>();

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges() {
        this.formAdmin.controls['name'].setValue(this.name);
        this.formAdmin.controls['category'].setValue(this.category);
        this.formAdmin.controls['serie'].setValue(this.serie);
        this.formAdmin.controls['description'].setValue(this.description);
        this.formAdmin.controls['price'].setValue(this.price);
        this.formAdmin.controls['frontImage'].setValue(this.frontImage);
        this.formAdmin.controls['backImage'].setValue(this.backImage);
    }

    validate(field: string, error: string) {
        return (
            this.formAdmin.controls[field].getError(error) &&
            this.formAdmin.controls[field].touched);
    }

    sendData() {
        if (this.formAdmin.invalid) {
            this.formAdmin.markAllAsTouched();
        } else {
            const funko: Funko = {
                name: this.formAdmin.controls['name'].value,
                category: this.formAdmin.controls['category'].value,
                serie: this.formAdmin.controls['serie'].value,
                description: this.formAdmin.controls['description'].value,
                price: this.formAdmin.controls['price'].value,
                frontImage: this.formAdmin.controls['frontImage'].value,
                backImage: this.formAdmin.controls['backImage'].value,
                id: 0,
            };
            this.sendFunko.emit(funko);
        }
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}
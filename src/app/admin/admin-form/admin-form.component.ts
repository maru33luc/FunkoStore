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

  formulario: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    category: ['', [Validators.required, Validators.pattern('^(Keychain|Minis|Plugis)$')]],
    serie: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    price: [0, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.maxLength(300)]],
    frontImage: ['', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]],
    backImage: ['', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]]
  });

  @Output() sendFunko = new EventEmitter<Funko>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    this.formulario.controls['name'].setValue(this.name);
    this.formulario.controls['category'].setValue(this.category);
    this.formulario.controls['serie'].setValue(this.serie);
    this.formulario.controls['description'].setValue(this.description);
    this.formulario.controls['price'].setValue(this.price);
    this.formulario.controls['frontImage'].setValue(this.frontImage);
    this.formulario.controls['backImage'].setValue(this.backImage);
  }

  validate(field: string, error: string) {
    return (this.formulario.controls[field].getError(error) && this.formulario.controls[field].touched);
  }

  sendData() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
    } else {
      const funko: Funko = {
        name: this.formulario.controls['name'].value,
        category: this.formulario.controls['category'].value,
        serie: this.formulario.controls['serie'].value,
        description: this.formulario.controls['description'].value,
        price: this.formulario.controls['price'].value,
        frontImage: this.formulario.controls['frontImage'].value,
        backImage: this.formulario.controls['backImage'].value,
        id: 0,
      };
      this.sendFunko.emit(funko);
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
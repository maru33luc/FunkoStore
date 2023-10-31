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
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    serie: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required]],
    frontImage: ['', [Validators.required]],
    backImage: ['', [Validators.required]],
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

  sendData() {
    if (this.formulario.invalid) {
      alert('Debe completar todos los campos');
      return;
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

}
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  
form: FormGroup;
loading: boolean = false; 
id: number;
operacion: string = 'Adicionar';

constructor(private fb: FormBuilder,
  private _productService: ProductService,
  private router: Router,
  private toastr: ToastrService,
  private aRouter: ActivatedRoute) {
  this.form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    unit: [null, Validators.required],
    stock: [null, Validators.required]
  })
  this.id = Number(aRouter.snapshot.paramMap.get('id'));
  console.log(this.id)
}

ngOnInit(): void {

  if (this.id != 0) {
    // Es editar
    this.operacion = 'Editar ';
    this.getProduct(this.id);
  }
}

getProduct(id: number) {
  this.loading = true;
  this._productService.getProduct(id).subscribe((data: Product) => {
    this.loading = false;
    this.form.setValue({
      name: data.name,
      description: data.description,
      price: data.unit,
      stock: data.stock
    })
  })
}

addProduct() {
  // console.log(this.form.value.name);
  // console.log(this.form.get('name')?.value);

  const product: Product = {
    name: this.form.value.name,
    description: this.form.value.description,
    unit: this.form.value.unit,
    stock: this.form.value.stock
  }

  if (this.id !== 0) {
    // Editar
    product.id = this.id;
    this._productService.updateProduct(this.id, product).subscribe(() => {
      this.toastr.info(`O produto ${product.name} foi atualizado com sucesso`, 'Produto atualizado');
      this.loading = false;
      this.router.navigate(['/']);
    })

  } else {
    // Adicionar
    this._productService.saveProduct(product).subscribe(() => {
      this.toastr.success(`O produto ${product.name} foi registrado com sucesso`, 'Produto registrado');
      this.loading = false;
      this.router.navigate(['/']);
    })
  }


}
}

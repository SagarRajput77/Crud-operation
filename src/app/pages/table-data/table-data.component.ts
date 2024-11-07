import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent {

  products: Product[] = [];
  productForm !: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;
  currentProductId: number | null = null;
  displayModal: boolean = false;  // Control modal visibility

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.productService.productObservable.subscribe(products => {
      this.products = products;
    });
  }

  initializeForm(){
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required]
    });
  }

  get f(){
    return this.productForm.controls;
  }

  openModalForAdd(): void {
    this.isEditing = false;
    this.currentProductId = null;
    this.productForm.reset();
    this.displayModal = true;
  }

  openModalForEdit(product: Product): void {
    this.isEditing = true;
    this.currentProductId = product.id;
    this.productForm.patchValue(product);
    this.displayModal = true;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.invalid) return;

    const formData = this.productForm.value;
    if (this.isEditing && this.currentProductId !== null) {
      this.productService.updateProduct({ ...formData, id: this.currentProductId });
    } else {
      this.productService.addProduct(formData);
    }

    this.displayModal = false; 
    this.submitted = false; 
    this.productForm.reset();
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId);
  }
}

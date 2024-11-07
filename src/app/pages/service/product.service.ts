import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 100, category: 'Category 1' },
    { id: 2, name: 'Product 2', price: 200, category: 'Category 2' }
  ];

  // here creating array to store and perform opration on array element.
  private productSubject = new BehaviorSubject<Product[]>(this.products);
  productObservable = this.productSubject.asObservable();   

  constructor() {}

  // Add a new product
  addProduct(product: Product): void {
    product.id = this.products.length + 1;
    this.products.push(product);
    this.productSubject.next([...this.products]);
  }

  // Update an existing product
  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productSubject.next([...this.products]);
    }
  }

  // Delete a product
  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
    this.productSubject.next([...this.products]);
  }
}

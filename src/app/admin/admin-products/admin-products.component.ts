import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from 'src/app/shared/productModel';
import { query } from '@angular/animations';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: ProductModel[];
  filteredProducts: ProductModel[];
  subscription: Subscription;
  constructor(public productService: ProductService) {
    this.subscription = this.productService
      .getAllProducts()
      .subscribe((products) => {
        this.filteredProducts = this.products = products as ProductModel[];
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
}

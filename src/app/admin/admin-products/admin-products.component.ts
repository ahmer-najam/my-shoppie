import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/shared/productModel';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
    console.log(this.products$);
  }

}

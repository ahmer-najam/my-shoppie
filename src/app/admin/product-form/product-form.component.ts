import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from 'src/app/shared/product.service';
import { CategoryModel } from 'src/app/shared/categoryModel';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/shared/productModel';
import { LowerCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories: CategoryModel[];
  isProductPresent: boolean = false;
  products: Observable<any[]>;

  constructor(
    public productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.fillCategoryDdl();

  }

  async fillCategoryDdl() {
    this.categoryService.getCategories().subscribe((actionArry) => {
      this.categories = actionArry.map(
        (item) =>
          ({
            $key: item.payload.doc.id,
            ...(item.payload.doc.data() as CategoryModel),
          } as CategoryModel)
      );
    });
  }

  async checkProductDuplication(productName){

    this.products = this.productService.getProductsByName(productName);
    console.log(this.products);
  }

  save(product: ProductModel) {
    let productData: ProductModel = {
      title: product.title,
      imageUrl: product.imageUrl,
      $key: '',
      category: product.category,
      price: product.price,
      titleLower: product.title.toLowerCase()
    }
    let result = this.productService.createProduct(productData);
    this.router.navigate(["/admin/products"]);
  }

  assignValue(title){

  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
}

import { Injectable, ɵConsole } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import { ProductModel } from './productModel';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { CastExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products;
  isDuplicate: boolean;
  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}


  getProductsByName(productName) {
    return this.firestore
      .collection('products', (ref) => ref.where('title', '==', productName))
      .valueChanges();
  }

  getAllProducts() {
    return this.firestore.collection('products').valueChanges();
  }

  async createProduct(product) {
    console.log(product);
    let ref = this.firestore.collection('products').ref;

    let query = ref
      .where('titleLower', '==', product.titleLower) //where clause
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          //checking duplication
          this.firestore.collection('products').add(product); //adding product
          this.toastr.success('New Product has been added');
        } else {
          this.toastr.error('Duplicate Product'); //display error
        }
      });
  }
}

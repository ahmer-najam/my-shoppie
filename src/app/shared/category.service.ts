import { Injectable, Query } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryList;
  constructor(private firestore: AngularFirestore) {}

  getCategories() {
    return this.firestore
      .collection('categories', ref=> ref.orderBy('name'))
      .snapshotChanges();
  }
}

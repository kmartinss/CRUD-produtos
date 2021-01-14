import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(
    private snackBar: MatSnackBar,
    private _http: HttpClient
  ) { }

  showMessage(msg: string): void {
   this.snackBar.open(msg, 'X', {
     duration: 3000,
     horizontalPosition: "right",
     verticalPosition: "top"
   })
  }

  public create(product: Product): Observable<Product> {
    return this._http.post<Product>(this.baseUrl, product)
  }

  public read(): Observable<Product[]> {
    return this._http.get<Product[]>(this.baseUrl)
  }

  public readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get<Product>(url);
  }

  public update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this._http.put<Product>(url, product);
  }

  public delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.delete<Product>(url);
  }
}

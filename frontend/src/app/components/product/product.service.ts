import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  showMessage(msg: string, isError: boolean = false): void {
   this.snackBar.open(msg, '', {
     duration: 3000,
     horizontalPosition: "right",
     verticalPosition: "top",
     panelClass: isError ? ['msg-error'] : ['msg-sucess']
   })
  }

  public create(product: Product): Observable<Product> {
    return this._http.post<Product>(this.baseUrl, product)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  public read(): Observable<Product[]> {
    return this._http.get<Product[]>(this.baseUrl)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  public readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get<Product>(url)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  public update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this._http.put<Product>(url, product)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  public delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.delete<Product>(url)
    .pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  public errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }
}

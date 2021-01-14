import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  public product: Product;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this._route.snapshot.paramMap.get('id');
    this._productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  public deleteProduct(): void {
    this._productService.delete(this.product.id).subscribe(() => {
      this._productService.showMessage('Produto excluído com sucesso!');
      this._router.navigate(['/products']);
    })
  }

  public cancel(): void {
    this._router.navigate(['/products']);
  }

}

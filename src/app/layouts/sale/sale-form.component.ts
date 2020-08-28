import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {isNullOrUndefined} from 'util';
import {SaleService} from './sale.service';
import {ProductService} from './../product/product.service';
import {ISale, SaleProduct} from './sale.model';
import {IProduct, IProductPrecautions} from './../product/product.model';
import {IClient} from './../client/client.model';
import {ClientService} from './../client/client.service';

@Component({
    selector: 'app-sale-form',
    templateUrl: './sale-form.component.html',
    styleUrls: ['./sale.scss'],
})
export class SaleFormComponent implements OnInit, OnDestroy {
    public sale: ISale;
    public clients: IClient[];
    public clientSelection: number;
    public products: IProduct[];
    public productSelection: number;
    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(protected activatedRoute: ActivatedRoute, private saleService: SaleService, private toastr: ToastrService, private productService:ProductService, private clientservice:ClientService ) {}

    public ngOnInit(): void {
        this.activatedRoute.data.subscribe(({sale}) => {
            this.sale = sale;
            this.loadProducts();
            this.loadClients();
        });
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public saveSale(): void {
        if (this.sale.id === undefined) {
            this.saleService.create(this.sale).subscribe(
                res => {
                  this.addClient();
                  this.sale = res;
                    this.saveSucess();
                },
                error => {
                    this.throwError();
                }
            );
        } else {
            this.saleService.update(this.sale).subscribe(
                res => {
                    this.sale = res;
                    this.saveSucess();
                },
                error => {
                    this.throwError();
                }
            );
        }
    }


   public addProductList(): void {
      if (isNullOrUndefined(this.sale.products)) {
        this.sale.products = [];
      }

     const product: IProduct = this.products.find(p => p.id == this.productSelection);
      if (!isNullOrUndefined(product)) {
        this.sale.idProduct = product.id;
        this.sale.idSales = this.sale.id;
       if (this.sale.total == null) {
         this.sale.total = product.price;
         this.sale.products.push(product);
       }
       else {
         this.sale.total = this.sale.total + product.price;
         this.sale.products.push(product);
       }
      }
    }
    public addClient(): void {
      const client: IClient = this.clients.find(p => p.id == this.clientSelection);
      if (!isNullOrUndefined(client)) {
        this.sale.client = client.id;
      }
    }
  public deleteProductPrecaution(productPrecaution: IProductPrecautions): void {
    const index = this.sale.products.indexOf(productPrecaution);
    this.sale.products.splice(index, 1);
    this.sale.total = 0;
    for ( let i = 0; i < this.sale.products.length; i++) {
      this.sale.total = this.sale.total + this.sale.products[i].price;
    }
  }

    private loadProducts() {
      this.productService.getAll().subscribe(
        res => {
          this.products = res;
        },
          error => {
            this.throwError();
          }
      );
    }
    private loadClients() {
      this.clientservice.getAll().subscribe(
        res => {
          this.clients = res;
        },
        error => {
          this.throwError();
        }
      );
    }
    private saveSucess(): void {
        this.toastr.success('Information saved successfully', 'Sucess');
    }

    private throwError(): void {
        this.toastr.error('An error occurred on the system. Please contact the system administrator ', 'Error');
    }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbModalRef, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SaleService} from './sale.service';
import {ISale} from './sale.model';
import {IProduct} from "@/layouts/product/product.model";
import {ProductDeleteDialogComponent} from "@/layouts/product";
import {SaleDeleteDialogComponent} from "@/layouts/sale/sale-delete-dialog.component";

@Component({
    selector: 'app-sale-list',
    templateUrl: './sale-list.component.html',
    styleUrls: ['./sale.scss'],
})
export class SaleListComponent implements OnInit, OnDestroy {
    public sales: ISale[];
    protected ngbModalRef: NgbModalRef;

    constructor(private saleService: SaleService, private modalService: NgbModal) {}

    public ngOnInit(): void {
        this.loadAll();
    }

    public ngOnDestroy(): void {
        this.ngbModalRef = null;
    }

  public deleteSale(sale: ISale): void {
    this.ngbModalRef = this.modalService.open(SaleDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    this.ngbModalRef.componentInstance.sale = sale;
    this.ngbModalRef.result.then(
      result => {
        this.loadAll();
        this.ngbModalRef = null;
      },
      reason => {
        this.loadAll();
        this.ngbModalRef = null;
      }
    );
  }

    private loadAll(): void {
        this.saleService.getAll().subscribe(res => {
            this.sales = res;
        });
    }
}

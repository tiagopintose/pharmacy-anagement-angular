import {Component} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SaleService} from './sale.service';
import {ISale} from './sale.model';

@Component({
  selector: 'app-sale-delete-dialog',
  templateUrl: './sale-delete-dialog.component.html',
})
export class SaleDeleteDialogComponent {
  sale: ISale;

  constructor(protected saleService: SaleService, public activeModal: NgbActiveModal, private toastr: ToastrService) {}

  public clear() {
    this.activeModal.dismiss('cancel');
  }

  public confirmDelete(id: number) {
    this.saleService.delete(id).subscribe(
      response => {
        this.saveSucess();
        this.activeModal.dismiss(true);
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

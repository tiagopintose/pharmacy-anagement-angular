import {Moment} from 'moment';
import {IClient} from '@/layouts/client/client.model';
import {IProduct, IProductPrecautions, PrecautionType} from '@/layouts/product/product.model';

export interface ISale {
    id?: number;
    description?: string;
    client?: number;
    total ?: number;
    products ?: IProduct[];
}

export class Sale implements ISale {
    constructor(
        public id?: number,
        public description?: string,
        public client?: number,
        public total ?: number,
        public products ?: IProduct[]
    ) {}
}
export interface ISale {
  idSales?: number;
  idProduct?: number;
}
export class SaleProduct implements ISale {
  constructor(public idSales?: number, public idProduct?: number) {}
}

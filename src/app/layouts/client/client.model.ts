import {Moment} from 'moment';

export interface IClient {
    id?: number;
    lastName?: string;
    firstName?: string;
    dateOfBirth?: Date;
    contacts?: IContacts[];
    addresses?: IAddresses[];
}

export class Client implements IClient {
    constructor(
        public id?: number,
        public lastName?: string,
        public firstName?: string,
        public dateOfBirth?: Date,
        public contacts?: IContacts[],
        public addresses?: IAddresses[]
    ) {}
}

export const enum  ContactType{
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    MOBILE = 'MOBILE',
}

export interface IContacts {
    id?: number;
    contactType?: ContactType;
    contact ?: string;
}

export class Contacts implements IContacts {
    constructor(public id?: number, public contactType?: ContactType, public contact ?: string) {}
}

export interface IAddresses{
    id?: number;
    address?: string;
    postalCode?: string;
}
export class Address implements IAddresses {
    constructor(public id?: number, public address?: string, public postalCode?: string) {}
}

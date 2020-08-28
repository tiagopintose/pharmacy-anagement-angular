import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {isNullOrUndefined} from 'util';
import {ClientService} from './client.service';
import {IClient, IContacts, Contacts, IAddresses, Address} from './client.model';

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client.scss'],
})
export class ClientFormComponent implements OnInit, OnDestroy {
    public client: IClient;
    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(protected activatedRoute: ActivatedRoute, private clientService: ClientService, private toastr: ToastrService) {}

    public ngOnInit(): void {
        this.activatedRoute.data.subscribe(({client}) => {
            this.client = client;
        });
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public saveClient(): void {
        if (this.client.id === undefined) {
            this.clientService.create(this.client).subscribe(
                res => {
                    this.client = res;
                    this.saveSucess();
                },
                error => {
                    this.throwError();
                }
            );
        } else {
            this.clientService.update(this.client).subscribe(
                res => {
                    this.client = res;
                    this.saveSucess();
                },
                error => {
                    this.throwError();
                }
            );
        }
    }

    public addClientContact(): void {
        if (isNullOrUndefined(this.client.contacts)) {
            this.client.contacts = [];
        }

        this.client.contacts.push(new Contacts());
    }

    public deleteClientContact(contact: IContacts): void {
        const index = this.client.contacts.indexOf(contact);
        this.client.contacts.splice(index, 1);
    }
    public addClientAddress(): void {
        if (isNullOrUndefined(this.client.addresses)) {
            this.client.addresses = [];
        }

        this.client.addresses.push(new Address());
    }

    public deleteClientAddress(address: IAddresses): void {
        const index = this.client.addresses.indexOf(address);
        this.client.addresses.splice(index, 1);
    }

    private saveSucess(): void {
        this.toastr.success('Information saved successfully', 'Sucess');
    }

    private throwError(): void {
        this.toastr.error('An error occurred on the system. Please contact the system administrator ', 'Error');
    }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiHelperService } from '../api-helper.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  dataSource: {
    id: string;
    lastname: string;
    firstname: string;
    age: string;
  }[] = [];

  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(150),
  ]);
  password = new FormControl('', [Validators.required]);
  loadingCreate = false;
  errorCreate = '';
  modalOpen = false;

  constructor(private api: ApiHelperService) {}

  async addUser(event: SubmitEvent) {
    try {
      this.loadingCreate = true;
      this.errorCreate = '';
      event.preventDefault();
      const user = {
        firstname: this.firstname.value,
        lastname: this.lastname.value,
        age: this.age.value,
        password: this.password.value,
      };
      await this.api.post({ endpoint: '/users', data: user });
      this.dataSource = await this.api.get({ endpoint: '/users' });
      // clear form
      this.firstname.setValue('');
      this.lastname.setValue('');
      this.age.setValue('');
      this.password.setValue('');
      this.modalOpen = false; // close modal
    } catch (e) {
      this.errorCreate = 'Error while creating user';
    } finally {
      this.loadingCreate = false;
    }
  }

  async ngOnInit(): Promise<void> {
    this.dataSource = await this.api.get({ endpoint: '/users' });
  }

  get meanAge(): number {
    return (
      this.dataSource.reduce((acc, user) => acc + Number(user.age), 0) /
      this.dataSource.length
    );
  }

  get minAge(): number {
    return this.dataSource.reduce(
      (acc, user) => Math.min(acc, Number(user.age)),
      Number.MAX_SAFE_INTEGER
    );
  }

  get maxAge(): number {
    return this.dataSource.reduce(
      (acc, user) => Math.max(acc, Number(user.age)),
      0
    );
  }
}

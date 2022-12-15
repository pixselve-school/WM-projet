import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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

  createUserForm = this.fb.group({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loadingCreate = false;
  errorCreate = '';
  modalOpen = false;

  constructor(private api: ApiHelperService, private fb: FormBuilder) {}

  async addUser(event: SubmitEvent) {
    try {
      this.loadingCreate = true;
      this.errorCreate = '';
      event.preventDefault();
      await this.api.post({
        endpoint: '/users',
        data: this.createUserForm.value,
      });
      this.dataSource = await this.api.get({ endpoint: '/users' });
      // clear form
      this.createUserForm.reset();
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

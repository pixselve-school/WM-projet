import { Component, inject } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiHelperService } from '../../api-helper.service';

interface Data {}

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css'],
})
export class NewUserModalComponent {
  ref: DialogRef<Data> = inject(DialogRef);
  loadingCreate = false;
  errorCreate = '';
  createUserForm = this.fb.group({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private api: ApiHelperService) {}

  close() {
    this.ref.close();
  }

  async addUser(event: SubmitEvent) {
    try {
      this.loadingCreate = true;
      this.errorCreate = '';
      event.preventDefault();
      const newUser = await this.api.post({
        endpoint: '/users',
        data: this.createUserForm.value,
      });
      this.ref.close(newUser);
    } catch (e) {
      this.errorCreate = 'Error while creating user';
    } finally {
      this.loadingCreate = false;
    }
  }
}

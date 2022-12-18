import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiHelperService } from '../api-helper.service';
import { DialogService } from '@ngneat/dialog';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';

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

  private dialog = inject(DialogService);

  newUser() {
    const newUserDialog = this.dialog.open(NewUserModalComponent);
    newUserDialog.afterClosed$.subscribe((result) => {
      if (result) {
        this.dataSource.push(result);
      }
    });
  }

  constructor(private api: ApiHelperService, private fb: FormBuilder) {}

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

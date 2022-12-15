import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { RolesService } from '../../roles.service';

interface Data {
  username: string;
  role: string;

  userId: number;
  associationId: number;
}

@Component({
  selector: 'app-edit-role-modal',
  templateUrl: './edit-role-modal.component.html',
  styleUrls: ['./edit-role-modal.component.css'],
})
export class EditRoleModalComponent implements OnInit {
  ref: DialogRef<Data> = inject(DialogRef);

  // event for role name change
  @Output() roleNameChange = new EventEmitter<string>();

  newRoleName = this.fb.control(this.ref.data.role, [Validators.required]);
  loading = false;

  constructor(private fb: FormBuilder, private roleService: RolesService) {}

  ngOnInit(): void {}

  close() {
    this.ref.close(null);
  }

  async save(event: SubmitEvent) {
    try {
      event.preventDefault();
      this.loading = true;

      const data = await this.roleService
        .editRole({
          idAssociation: this.ref.data.associationId,
          idUser: this.ref.data.userId,
          name: this.newRoleName.value ?? '',
        })
        .toPromise();
      if (data === undefined) throw new Error('Role not found');
      this.ref.close(data);
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }
}

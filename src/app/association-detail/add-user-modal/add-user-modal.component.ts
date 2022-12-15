import { Component, inject } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import {
  AssociationMember,
  AssociationsService,
} from '../../associations.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User, UsersService } from '../../users.service';
import { RolesService } from '../../roles.service';

interface Data {
  idAssociation: number;

  members: AssociationMember[];
}

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent {
  ref: DialogRef<Data> = inject(DialogRef);

  userID = this.fb.control('', [Validators.required]);

  foundUser: User | null = null;

  searched = false;

  loading = false;

  loadingSearch = false;
  roleName = this.fb.control('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private associationsService: AssociationsService,
    private rolesService: RolesService
  ) {}

  foundUserIsMember() {
    return (
      this.foundUser !== null &&
      this.ref.data.members
        .map((member) => member.id)
        .includes(this.foundUser.id)
    );
  }

  async search(event: SubmitEvent) {
    try {
      event.preventDefault();
      this.loadingSearch = true;
      const user = await this.usersService
        .getOneUser(+(this.userID.value ?? '-1'))
        .toPromise();
      if (user === undefined) throw new Error('User not found');
      this.foundUser = user;
    } catch (e) {
      this.foundUser = null;
    } finally {
      this.loadingSearch = false;
      this.searched = true;
    }
  }

  async save(event: SubmitEvent) {
    try {
      event.preventDefault();
      this.loading = true;
      if (this.foundUser === null) throw new Error('User not found');
      const newMembersListIds = this.ref.data.members.map(
        (member) => member.id
      );
      newMembersListIds.push(this.foundUser.id);
      const association = await this.associationsService
        .updateMembers(this.ref.data.idAssociation, newMembersListIds)
        .toPromise();
      if (association === undefined) throw new Error('Association not found');
      const role = await this.rolesService
        .createRole({
          name: this.roleName.value ?? 'Member',
          idAssociation: this.ref.data.idAssociation,
          idUser: this.foundUser.id,
        })
        .toPromise();
      if (role === undefined) throw new Error('Role not found');
      // replace the old member with the new one
      association.members = association.members.map((member) => {
        if (member.id === role.userId) {
          member.role = role.name;
        }
        return member;
      });
      this.ref.close(association);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.ref.close(null);
  }
}

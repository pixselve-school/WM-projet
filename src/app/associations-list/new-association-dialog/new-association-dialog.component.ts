import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UsersService } from '../../users.service';
import { Association, AssociationsService } from '../../associations.service';
import { RolesService } from '../../roles.service';

enum FormStep {
  Basics,
  Roles,
  Members,
  Review,
}

@Component({
  selector: 'app-new-association-dialog',
  templateUrl: './new-association-dialog.component.html',
  styleUrls: ['./new-association-dialog.component.css'],
})
export class NewAssociationDialogComponent implements OnInit {
  modalOpen = false;
  loadingCreate = false;

  step = FormStep.Basics;
  invalidMemberID = false;
  @Output() associationCreate = new EventEmitter<Association>();
  associationBasicsForm = this.fb.group({
    name: ['', Validators.required],
  });
  associationRolesForm = this.fb.group({
    roles: this.fb.array([]),
    roleName: ['', Validators.required],
  });
  addMemberInput = this.fb.control('', Validators.required);
  membersToUsers = this.fb.array<FormGroup>([]);

  constructor(
    private fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly associationsService: AssociationsService,
    private readonly rolesService: RolesService
  ) {}

  resetForm(): void {
    this.associationBasicsForm.reset();
    this.associationRolesForm.reset();
    this.membersToUsers.reset();
    this.step = FormStep.Basics;
  }

  async addAssociation(): Promise<void> {
    try {
      this.loadingCreate = true;
      console.log('⚙️ Creating association');
      const association = await this.associationsService
        .newAssociation({
          name: this.associationBasicsForm.get('name')?.value ?? '',
          idUsers: this.membersToUsers.value.map((u: User) => u.id),
        })
        .toPromise();
      if (association === undefined) throw new Error('Association not created');
      this.associationCreate.emit(association);
      console.log('🎉 Association created', association);

      // add roles
      // format {  associationId: number; userId: number; name: string;}

      const roles = this.membersToUsers.value.map(
        (u: User & { role: string }) => ({
          idAssociation: association.id,
          idUser: u.id,
          name: u.role,
        })
      );

      console.log('⚙️ Creating roles', roles);
      const createdRoles = await this.rolesService
        .createRoles(roles)
        .toPromise();
      if (createdRoles === undefined) throw new Error('Roles not created');
      console.log('🎉 Roles created', createdRoles);

      this.modalOpen = false;
      this.resetForm();
    } catch (e) {
      console.error(e);
    } finally {
      this.loadingCreate = false;
    }
  }

  finishBasics(event: SubmitEvent): void {
    event.preventDefault();
    this.step = FormStep.Roles;
  }

  addRole(): void {
    this.associationRolesForm
      .get('roles')
      ?.value.push(this.associationRolesForm.get('roleName')?.value);
    this.associationRolesForm.get('roleName')?.reset();
  }

  removeRole(index: number): void {
    this.associationRolesForm.get('roles')?.value.splice(index, 1);
  }

  finishRoles(event: SubmitEvent): void {
    event.preventDefault();
    this.step = FormStep.Members;
  }

  finishMembers(): void {
    this.step = FormStep.Review;
  }

  async addMember(event: SubmitEvent): Promise<void> {
    this.invalidMemberID = false;
    console.log(event);
    event.preventDefault();
    // find user by id
    try {
      const user = await this.usersService
        .getOneUser(+(this.addMemberInput.value ?? '-1'))
        .toPromise();
      if (user === undefined) throw new Error('User not found');
      console.log(user);

      // check if user is already in list
      if (this.membersToUsers.value.find((u: User) => u.id === user.id)) {
        throw new Error('User already in list');
      }

      const group: FormGroup = this.fb.group({
        name: [user.firstname + ' ' + user.lastname],
        id: [user.id],
        role: ['Member', Validators.required],
      });

      this.membersToUsers.push(group);
      this.addMemberInput.reset();
    } catch (e) {
      this.invalidMemberID = true;
      console.error(e);
    }
  }

  removeMember(index: number): void {
    this.membersToUsers.removeAt(index);
  }

  ngOnInit(): void {}
}

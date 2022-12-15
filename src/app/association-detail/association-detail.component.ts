import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Association,
  AssociationMember,
  AssociationsService,
  Minute,
} from '../associations.service';
import { Role } from '../roles.service';
import { DialogService } from '@ngneat/dialog';
import { EditRoleModalComponent } from './edit-role-modal/edit-role-modal.component';

@Component({
  selector: 'app-association-detail',
  templateUrl: './association-detail.component.html',
  styleUrls: ['./association-detail.component.css'],
})
export class AssociationDetailComponent implements OnInit {
  association!: Association;
  roles!: Role[];

  minutes: Minute[] = [];
  id: string = this.route.snapshot.paramMap.get('id') ?? '';

  loadingDelete = false;

  loadingRemoveMemberId: number | null = null;

  private dialog = inject(DialogService);

  constructor(
    private route: ActivatedRoute,
    private associationService: AssociationsService,
    private router: Router
  ) {}

  openEditRoleModal(member: AssociationMember) {
    const dialogRef = this.dialog.open(EditRoleModalComponent, {
      // data is typed based on the passed generic
      data: {
        username: member.firstname + ' ' + member.lastname,
        role: member.role,
        userId: member.id,
        associationId: this.association.id,
      },
    });
    dialogRef.afterClosed$.subscribe((data) => {
      if (data === null) return;
      this.association.members = this.association.members.map((member) => {
        if (member.id === data.userId) {
          member.role = data.name;
        }
        return member;
      });
    });
  }

  localDate = new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  parseDate(date: string): string {
    return this.localDate.format(new Date(date));
  }

  async ngOnInit(): Promise<void> {
    try {
      const [association, roles, minutes] = await Promise.all([
        this.associationService.getAssociation(Number(this.id)).toPromise(),
        this.associationService.getRoles(parseInt(this.id)).toPromise(),
        this.associationService.getMinutes(parseInt(this.id)).toPromise(),
      ]);

      if (association === undefined) throw new Error('Association not found');
      if (roles === undefined) throw new Error('Roles not found');
      if (minutes === undefined) throw new Error('Minutes not found');

      this.association = association;
      this.roles = roles;
      this.minutes = minutes;
    } catch (e) {
      this.router.navigate(['/associations']);
    }
  }

  async deleteAssociation(): Promise<void> {
    try {
      this.loadingDelete = true;
      await this.associationService
        .deleteAssociation(parseInt(this.id))
        .toPromise();
      this.router.navigate(['/associations']);
    } catch (e) {
      alert('Error deleting association');
    } finally {
      this.loadingDelete = false;
    }
  }

  /**
   * Remove a member from the association
   * @param id The id of the member to remove
   * @returns A promise that resolves when the member has been removed
   * @throws An error if the member could not be removed
   */
  async removeMember(id: number): Promise<void> {
    try {
      this.loadingRemoveMemberId = id;
      const newMembers = this.association.members
        .filter((member) => member.id !== id)
        .map((member) => member.id);
      const association = await this.associationService
        .updateMembers(this.association.id, newMembers)
        .toPromise();
      if (association === undefined) throw new Error('Association not found');
      this.association = association;
    } catch (e) {
      alert('Error removing member');
    } finally {
      this.loadingRemoveMemberId = null;
    }
  }
}

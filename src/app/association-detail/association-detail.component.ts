import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Association, AssociationsService } from '../associations.service';
import { Role } from '../roles.service';

@Component({
  selector: 'app-association-detail',
  templateUrl: './association-detail.component.html',
  styleUrls: ['./association-detail.component.css'],
})
export class AssociationDetailComponent implements OnInit {
  association!: Association;
  roles!: Role[];
  id: string = this.route.snapshot.paramMap.get('id') ?? '';

  loadingDelete = false;

  loadingRemoveMemberId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private associationService: AssociationsService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const association = await this.associationService
        .getAssociation(parseInt(this.id))
        .toPromise();

      const roles = await this.associationService
        .getRoles(parseInt(this.id))
        .toPromise();

      if (association === undefined) throw new Error('Association not found');
      if (roles === undefined) throw new Error('Roles not found');

      this.association = association;
      this.roles = roles;
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

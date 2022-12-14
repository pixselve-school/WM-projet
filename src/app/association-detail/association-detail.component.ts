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
}

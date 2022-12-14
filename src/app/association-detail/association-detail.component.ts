import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Association, AssociationsService } from '../associations.service';

@Component({
  selector: 'app-association-detail',
  templateUrl: './association-detail.component.html',
  styleUrls: ['./association-detail.component.css'],
})
export class AssociationDetailComponent implements OnInit {
  association!: Association;
  id: string = this.route.snapshot.paramMap.get('id') ?? '';

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
      if (association === undefined) throw new Error('Association not found');
      this.association = association;
    } catch (e) {
      this.router.navigate(['/associations']);
    }
  }
}

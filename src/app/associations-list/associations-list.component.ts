import { Component, OnInit } from '@angular/core';
import { Association, AssociationsService } from '../associations.service';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.css'],
})
export class AssociationsListComponent implements OnInit {
  associations: Association[] = [];

  constructor(private readonly associationsService: AssociationsService) {}

  ngOnInit(): void {
    this.getAssociations();
  }

  addAssociation(association: Association): void {
    this.associations.push(association);
  }

  getAssociations(): void {
    console.log(this.associationsService);
    this.associationsService.getAssociations().subscribe((associations) => {
      this.associations = associations;
    });
  }

  async findAssociation(id: string): Promise<{ text: string; link: string }> {
    console.log(this.associationsService);
    const association = await this.associationsService
      .getAssociation(+id)
      .toPromise();
    if (association === undefined) throw new Error('Association not found');
    return { text: association.name, link: `/associations/${id}` };
  }
}

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
    this.associationsService.getAssociations().subscribe((associations) => {
      this.associations = associations;
    });
  }
}

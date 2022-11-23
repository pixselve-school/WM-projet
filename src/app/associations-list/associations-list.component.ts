import { Component, OnInit } from '@angular/core';
import { Association, AssociationsService } from '../associations.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.css'],
})
export class AssociationsListComponent implements OnInit {
  associations: Association[] = [];
  modalOpen = true;
  loadingCreate = false;
  formGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private readonly associationsService: AssociationsService) {}

  ngOnInit(): void {
    this.getAssociations();
  }

  getAssociations(): void {
    this.associationsService.getAssociations().subscribe((associations) => {
      this.associations = associations;
    });
  }

  async addAssociation(event: SubmitEvent): Promise<void> {}
}

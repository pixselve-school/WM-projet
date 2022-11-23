import { Injectable } from '@angular/core';

export type Association = {
  name: string;
  members: AssociationMember[];
};

export type AssociationMember = {
  lastname: string;
  firstname: string;
  age: number;
  role: string;
};

@Injectable({
  providedIn: 'root',
})
export class AssociationsService {
  constructor() {}

  getAssociations(): Association[] {
    return [
      {
        name: 'Association 1',
        members: [
          {
            lastname: 'Doe',
            firstname: 'John',
            age: 42,
            role: 'president',
          },
        ],
      },
    ];
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';

interface Data {
  title: string;
}

@Component({
  selector: 'app-edit-role-modal',
  templateUrl: './edit-role-modal.component.html',
  styleUrls: ['./edit-role-modal.component.css'],
})
export class EditRoleModalComponent implements OnInit {
  ref: DialogRef<Data> = inject(DialogRef);

  constructor() {}

  ngOnInit(): void {}
}

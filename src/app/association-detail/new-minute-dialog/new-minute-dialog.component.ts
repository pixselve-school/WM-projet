import { Component, inject, OnInit } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AssociationMember } from '../../associations.service';
import { MinutesService } from '../../minutes.service';

interface Data {
  members: AssociationMember[];
  idAssociation: number;
}

@Component({
  selector: 'app-new-minute-dialog',
  templateUrl: './new-minute-dialog.component.html',
  styleUrls: ['./new-minute-dialog.component.css'],
})
export class NewMinuteDialogComponent implements OnInit {
  ref: DialogRef<Data> = inject(DialogRef);

  minuteForm = this.fb.group({
    date: ['', [Validators.required]],
    voters: [[], [Validators.required]],
    content: ['', [Validators.required]],
  });

  loading = false;

  constructor(
    private fb: FormBuilder,
    private minutesService: MinutesService
  ) {}

  get data() {
    return this.ref.data;
  }

  ngOnInit(): void {}

  async submit(event: SubmitEvent) {
    try {
      this.loading = true;
      event.preventDefault();
      if (this.minuteForm.invalid) throw new Error('Invalid form');
      const data = await this.minutesService
        .createMinute({
          date: this.minuteForm.value.date ?? '',
          idVoters: this.minuteForm.value.voters ?? [],
          content: this.minuteForm.value.content ?? '',
          idAssociation: this.data.idAssociation.toString(),
        })
        .toPromise();
      this.ref.close(data);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.ref.close(null);
  }
}

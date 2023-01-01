import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DialogRef } from "@ngneat/dialog";
import { EventsService } from "../../events.service";

interface Data {
  idAssociation: number;
}

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.css']
})
export class AddEventModalComponent implements OnInit {

  ref: DialogRef<Data> = inject(DialogRef);

  eventForm = this.fb.group({
    name: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]]
  });

  loading = false;

  get data() {
    return this.ref.data;
  }

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService
  ) {}
  ngOnInit(): void {}

  async submit(event: SubmitEvent) {
    try {
      this.loading = true;
      event.preventDefault();
      if (this.eventForm.invalid) throw new Error('Invalid form');
      const data = await this.eventsService
        .createEvent({
          name: this.eventForm.value.name ?? '',
          start: this.eventForm.value.start ?? '',
          end: this.eventForm.value.end ?? '',
          association: this.data.idAssociation,
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

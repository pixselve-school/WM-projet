import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Association,
  AssociationMember,
  AssociationsService,
  Minute,
} from '../associations.service';
import { Role } from '../roles.service';
import { DialogService } from '@ngneat/dialog';
import { EditRoleModalComponent } from './edit-role-modal/edit-role-modal.component';
import { NewMinuteDialogComponent } from './new-minute-dialog/new-minute-dialog.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { Event, EventsService } from '../events.service';

@Component({
  selector: 'app-association-detail',
  templateUrl: './association-detail.component.html',
  styleUrls: ['./association-detail.component.css'],
})
export class AssociationDetailComponent implements OnInit {
  association!: Association;
  roles!: Role[];

  minutes: Minute[] = [];

  events: Event[] = [];
  id: string = this.route.snapshot.paramMap.get('id') ?? '';

  loadingDelete = false;

  loadingRemoveMemberId: number | null = null;
  loadingRemoveEventId: number | null = null;

  private dialog = inject(DialogService);

  constructor(
    private route: ActivatedRoute,
    private associationService: AssociationsService,
    private eventService: EventsService,
    private router: Router
  ) {}

  openEditRoleModal(member: AssociationMember) {
    const dialogRef = this.dialog.open(EditRoleModalComponent, {
      // data is typed based on the passed generic
      data: {
        username: member.firstname + ' ' + member.lastname,
        role: member.role,
        userId: member.id,
        associationId: this.association.id,
      },
    });
    dialogRef.afterClosed$.subscribe((data) => {
      if (data === null) return;
      this.association.members = this.association.members.map((member) => {
        if (member.id === data.userId) {
          member.role = data.name;
        }
        return member;
      });
    });
  }

  openAddUserModal() {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      // data is typed based on the passed generic
      data: {
        members: this.association.members,
        idAssociation: this.association.id,
      },
    });

    dialogRef.afterClosed$.subscribe((data) => {
      if (data === null) return;
      this.association = data;
    });
  }

  localDate = new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  parseDate(date: string): string {
    return this.localDate.format(new Date(date));
  }

  getStatus(date: string, dateEnd: string): string {
    const eventDate = new Date(date);
    const now = new Date();
    if (eventDate < now) {
      const eventDateEnd = new Date(dateEnd);
      if (eventDateEnd < now) {
        return 'Ended';
      }
      return 'Ongoing';
    } else {
      return 'Upcoming';
    }
  }

  getEventBadge(event: Event): string {
    switch (this.getStatus(event.start.toString(), event.end.toString())) {
      case 'Ended':
        return 'badge-error';
      case 'Ongoing':
        return 'badge-warning';
      case 'Upcoming':
        return 'badge-success';
    }
    return "badge-success";
  }

  getEventDuration(date: string, dateEnd: string): string {
    const eventDate = new Date(date);
    const eventDateEnd = new Date(dateEnd);
    const diff = eventDateEnd.getTime() - eventDate.getTime();
    const diffMinutes = Math.ceil(diff / (1000));
    if(diffMinutes < 60) { return diffMinutes + " mins";}
    const diffHours = Math.ceil(diff / (1000 * 60 * 60));
    if(diffHours < 24) { return diffHours + " hours";}
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays + ' days';
  }

  async ngOnInit(): Promise<void> {
    try {
      const [association, roles, minutes, events] = await Promise.all([
        this.associationService.getAssociation(Number(this.id)).toPromise(),
        this.associationService.getRoles(parseInt(this.id)).toPromise(),
        this.associationService.getMinutes(parseInt(this.id)).toPromise(),
        this.eventService.getEvents(parseInt(this.id)).toPromise(),
      ]);

      if (association === undefined) throw new Error('Association not found');
      if (roles === undefined) throw new Error('Roles not found');
      if (minutes === undefined) throw new Error('Minutes not found');
      if (events === undefined) throw new Error('Events not found');

      this.association = association;
      this.roles = roles;
      this.minutes = minutes;
      this.events = events;
      this.events.sort(function(e1,e2){ return new Date(e2.start).getTime() - new Date(e1.start).getTime(); });
    } catch (e) {
      this.router.navigate(['/associations']);
    }
  }

  openNewMinuteDialog() {
    const dialogRef = this.dialog.open(NewMinuteDialogComponent, {
      // data is typed based on the passed generic
      data: {
        members: this.association.members,
        idAssociation: this.association.id,
      },
    });

    dialogRef.afterClosed$.subscribe((data) => {
      if (data === null) return;
      this.minutes = [data, ...this.minutes];
    });
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

  async removeEvent(id: number): Promise<void> {
    try {
      this.loadingRemoveEventId = id;
      const events = await this.eventService
        .deleteEvent(id)
        .toPromise();
      if (events === undefined) throw new Error('Events not found');
      this.events = this.events.filter((event) => event.id !== id);
    } catch (e) {
      alert('Error removing event');
    } finally {
      this.loadingRemoveEventId = null;
    }
  }

  openAddEventDialog() {
    /*const dialogRef = this.dialog.open(NewMinuteDialogComponent, {
      // data is typed based on the passed generic
      data: {
        members: this.association.members,
        idAssociation: this.association.id,
      },
    });

    dialogRef.afterClosed$.subscribe((data) => {
      if (data === null) return;
      this.minutes = [data, ...this.minutes];
    });*/
  }
}

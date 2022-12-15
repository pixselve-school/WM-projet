import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMinuteDialogComponent } from './new-minute-dialog.component';

describe('NewMinuteDialogComponent', () => {
  let component: NewMinuteDialogComponent;
  let fixture: ComponentFixture<NewMinuteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMinuteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewMinuteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

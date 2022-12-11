import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssociationDialogComponent } from './new-association-dialog.component';

describe('NewAssociationDialogComponent', () => {
  let component: NewAssociationDialogComponent;
  let fixture: ComponentFixture<NewAssociationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAssociationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAssociationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAssociationComponent } from './search-association.component';

describe('SearchAssociationComponent', () => {
  let component: SearchAssociationComponent;
  let fixture: ComponentFixture<SearchAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchAssociationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

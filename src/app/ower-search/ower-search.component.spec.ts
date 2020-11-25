import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwerSearchComponent } from './ower-search.component';

describe('OwerSearchComponent', () => {
  let component: OwerSearchComponent;
  let fixture: ComponentFixture<OwerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

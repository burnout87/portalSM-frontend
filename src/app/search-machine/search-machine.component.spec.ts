import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMachineComponent } from './search-machine.component';

describe('SearchMachineComponent', () => {
  let component: SearchMachineComponent;
  let fixture: ComponentFixture<SearchMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

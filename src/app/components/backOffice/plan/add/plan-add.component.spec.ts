import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAddComponent } from './plan-add.component';

describe('CategoryEditComponent', () => {
  let component: PlanAddComponent;
  let fixture: ComponentFixture<PlanAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

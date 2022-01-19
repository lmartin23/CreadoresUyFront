import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorAddComponent } from './creator-add.component';

describe('UserEditComponent', () => {
  let component: CreatorAddComponent;
  let fixture: ComponentFixture<CreatorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatorAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

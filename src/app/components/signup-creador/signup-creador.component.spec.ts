import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Script } from 'vm';

import { SignupCreadorComponent } from './signup-creador.component';

describe('SignupCreadorComponent', () => {
  let component: SignupCreadorComponent;
  let fixture: ComponentFixture<SignupCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupCreadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

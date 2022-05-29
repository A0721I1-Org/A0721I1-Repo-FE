import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuOderComponent } from './create-menu-oder.component';

describe('CreateMenuOderComponent', () => {
  let component: CreateMenuOderComponent;
  let fixture: ComponentFixture<CreateMenuOderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMenuOderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMenuOderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

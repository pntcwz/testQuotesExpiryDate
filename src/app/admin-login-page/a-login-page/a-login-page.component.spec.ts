import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ALoginPageComponent } from './a-login-page.component';

describe('ALoginPageComponent', () => {
  let component: ALoginPageComponent;
  let fixture: ComponentFixture<ALoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ALoginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ALoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

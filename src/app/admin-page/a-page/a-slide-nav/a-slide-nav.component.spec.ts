import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASlideNavComponent } from './a-slide-nav.component';

describe('ASlideNavComponent', () => {
  let component: ASlideNavComponent;
  let fixture: ComponentFixture<ASlideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASlideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASlideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

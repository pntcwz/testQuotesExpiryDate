import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSendComponent } from './log-send.component';

describe('LogSendComponent', () => {
  let component: LogSendComponent;
  let fixture: ComponentFixture<LogSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryExpriyDateComponent } from './query-expriy-date.component';

describe('QueryExpriyDateComponent', () => {
  let component: QueryExpriyDateComponent;
  let fixture: ComponentFixture<QueryExpriyDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryExpriyDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryExpriyDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

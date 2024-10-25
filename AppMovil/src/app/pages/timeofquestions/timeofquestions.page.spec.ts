import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeofquestionsPage } from './timeofquestions.page';

describe('TimeofquestionsPage', () => {
  let component: TimeofquestionsPage;
  let fixture: ComponentFixture<TimeofquestionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeofquestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

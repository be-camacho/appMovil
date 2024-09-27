import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionpagePage } from './questionpage.page';

describe('QuestionpagePage', () => {
  let component: QuestionpagePage;
  let fixture: ComponentFixture<QuestionpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

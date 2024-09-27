import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudythemepagePage } from './studythemepage.page';

describe('StudythemepagePage', () => {
  let component: StudythemepagePage;
  let fixture: ComponentFixture<StudythemepagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudythemepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

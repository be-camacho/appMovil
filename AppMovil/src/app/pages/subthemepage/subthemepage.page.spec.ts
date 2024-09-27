import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubthemepagePage } from './subthemepage.page';

describe('SubthemepagePage', () => {
  let component: SubthemepagePage;
  let fixture: ComponentFixture<SubthemepagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubthemepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

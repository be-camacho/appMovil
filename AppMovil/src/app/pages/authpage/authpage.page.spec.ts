import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthpagePage } from './authpage.page';

describe('AuthpagePage', () => {
  let component: AuthpagePage;
  let fixture: ComponentFixture<AuthpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

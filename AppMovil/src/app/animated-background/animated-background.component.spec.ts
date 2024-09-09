import { ComponentFixture, TestBed, } from '@angular/core/testing';

import { BackgroundAnimationComponent } from './animated-background.component';

describe('BackgroundAnimationComponent', () => {
  let component: BackgroundAnimationComponent;
  let fixture: ComponentFixture<BackgroundAnimationComponent>;

  beforeEach((() => {
    fixture = TestBed.createComponent(BackgroundAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

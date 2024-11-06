import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewQuestionsRoundComponent } from './new-questions-round.component';

describe('NewQuestionsRoundComponent', () => {
  let component: NewQuestionsRoundComponent;
  let fixture: ComponentFixture<NewQuestionsRoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuestionsRoundComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewQuestionsRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

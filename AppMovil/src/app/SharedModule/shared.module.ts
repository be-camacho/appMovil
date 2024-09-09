import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundAnimationComponent } from '../animated-background/animated-background.component';


@NgModule({
  declarations: [BackgroundAnimationComponent],
  imports: [CommonModule],
  exports: [BackgroundAnimationComponent]  // Si necesitas exportar el componente
})
export class SharedModule { }

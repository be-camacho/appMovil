import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'theme-modal',
  templateUrl: './thememodal.component.html',
  styleUrls: ['./thememodal.component.scss'],
})
export class ThememodalComponent implements OnInit {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() themeName: string;
  themeForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder) {
    this.themeForm = this.formBuilder.group({
      themeName: ['', Validators.required]
    });
  }
  ngOnInit() {
    if (this.themeName) {
      this.themeForm.patchValue({ themeName: this.themeName });
    }
  }
  
  dismiss() {
    this.modalController.dismiss();
  }

  submit() {
    if (this.themeForm.valid) {
      this.modalController.dismiss({
        themeName: this.themeForm.value.themeName
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SQLiteService } from 'src/app/services/SQLite.service';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  photos: { id: string, image: string }[] = [];

  constructor(private sqliteService: SQLiteService, private modalController: ModalController) {}

  async ngOnInit() {
    await this.sqliteService.initializeDatabase(); // Asegúrate de que la base de datos esté inicializada
    this.photos = await this.loadPhotos();
  }

  async loadPhotos() {
    const photos = await this.sqliteService.getAllPhotos();
    return photos.map(photo => ({
      id: photo.id,
      image: photo.image
    }));
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
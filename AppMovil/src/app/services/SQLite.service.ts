import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'questions.db',
        location: 'default'
      });

      await this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS questions (
          id TEXT PRIMARY KEY,
          image BLOB
        )
      `, []);
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async addQuestionImage(id: string, image: string) {
    try {
      if (!this.dbInstance) {
        throw new Error('Database not initialized');
      }
      await this.dbInstance.executeSql(`
        INSERT OR REPLACE INTO questions (id, image)
        VALUES (?, ?)
      `, [id, image]);
    } catch (error) {
      console.error('Error adding question image:', error);
    }
  }

  async getAllPhotos() {
    try {
      if (!this.dbInstance) {
        throw new Error('Database not initialized');
      }
      const res = await this.dbInstance.executeSql('SELECT id, image FROM questions', []);
      const photos = [];
      for (let i = 0; i < res.rows.length; i++) {
        photos.push(res.rows.item(i));
        console.log(photos)
      }
      
      return photos;
    } catch (error) {
      console.error('Error getting photos:', error);
      return [];
    }
  }
}
import { Injectable } from '@angular/core';
import emailjs,{ EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private userID = 'AOv464aOY78snU_3g';

  constructor() {
    emailjs.init(this.userID);
  }
  sendEmail(templateParams: any): Promise<EmailJSResponseStatus> {
    const serviceID = 'service_9rat4oo'; 
    const templateID = 'template_hq6md7n'; 

    return emailjs.send(serviceID, templateID, templateParams);
  }
}

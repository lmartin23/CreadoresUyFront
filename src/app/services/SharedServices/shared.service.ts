import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  addWelcomeV: Subject<boolean>;
  addWelcomeM: Subject<boolean>;
  welcomeV:boolean = false;
  welcomeM:boolean = false;

  constructor() {
  }
}

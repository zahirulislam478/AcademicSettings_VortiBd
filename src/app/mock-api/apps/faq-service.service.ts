import { Injectable } from '@angular/core';
import * as FaqData from './faq'

@Injectable({
  providedIn: 'root'
})
export class FaqServiceService {

  constructor() { }
  getFaqData() {
    return FaqData;
  }
}

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarCollaped = new Subject();

  constructor() { }

  setSidebarStatus(status: boolean) {
    this.sidebarCollaped.next(status);
  }

  getSidebarStatus(): Observable<any> {
    return this.sidebarCollaped.asObservable();
  }
}
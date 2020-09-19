import { Injectable } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

constructor() { }

private sidenav: MatDrawer;


    public setSidenav(sidenav: MatDrawer) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }


    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
    this.sidenav.toggle();
   }

}

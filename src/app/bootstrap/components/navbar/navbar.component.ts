import { Component } from '@angular/core'
import { menuOptions } from '../../utils/menu-options'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuTitle = 'Digital Workshop'
  readonly menuOptions = menuOptions

  onActivateRouter(): void {
    window.scroll(0, 0)
  }
}

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

}

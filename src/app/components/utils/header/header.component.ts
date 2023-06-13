import { Component } from '@angular/core';

// The intention of this component is to handle all components that should go inside the header of the app.
// It was developed in this way, so that the project can be scalable in the future by adding new features to the header.
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}

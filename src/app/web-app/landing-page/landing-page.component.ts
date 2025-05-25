import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, ProjectComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}

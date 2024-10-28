import { Component, Input, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'home-card',
  standalone: true,
  imports: [],
  templateUrl: './homecard.component.html',
  // styleUrl: './app.component.css'
})
export class HomeCard {
  // title = 'quiz-app';
  @Input({
    required: true,
  })
  title!: string;
  @Input({
    required: true,
  })
  caption!: string;
}

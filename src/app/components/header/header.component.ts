import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: []
})

export class HeaderComponent {

  @Input({ required: true}) title!: string;

}
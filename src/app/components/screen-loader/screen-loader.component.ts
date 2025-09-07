import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-screen-loader',
  templateUrl: './screen-loader.component.html',
  styleUrl: './screen-loader.component.scss',
  imports: [CommonModule],
})

export class ScreenLoaderComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this._setupScreenLoaderPage();
  }

  private _setupScreenLoaderPage() {
    
  }
}
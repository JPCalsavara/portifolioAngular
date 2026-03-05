import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  readonly socialLinks = [
    { icon: 'images/social/github-icon.svg', url: 'https://github.com/JPCalsavara', label: 'GitHub' },
    { icon: 'images/social/linkedin-icon.svg', url: 'https://www.linkedin.com/in/joao-pedro-calsavara/', label: 'LinkedIn' },
    { icon: 'images/social/email-icon.svg', url: 'mailto:jpcalsavara@gmail.com', label: 'Email' },
  ];
}

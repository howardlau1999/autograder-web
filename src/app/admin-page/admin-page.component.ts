import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  links: { link: string; label: string }[] = [
    {
      link: 'graders',
      label: '评测机管理',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

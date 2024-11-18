import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  protected showContent: boolean = false;

  constructor(private metaService: Meta) {
    this.metaService.updateTag({
      name: 'viewport',
      content:
        'width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0; viewport-fit=cover'
    });
  }

  ngOnInit(): void {
    document.body.classList.add('landing-body');
    document.documentElement.classList.add('landing-html');
  }

  ngOnDestroy() {
    document.body.classList.remove('landing-body');
    document.documentElement.classList.remove('landing-html');
    this.metaService.updateTag({
      name: 'viewport',
      content:
        'width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0'
    });
  }


  protected scrollToSection(sectionId: string): void {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({behavior: 'smooth'});
    }
  }
}

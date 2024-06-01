import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gallery',  // This should match what you use in your HTML
  standalone: true,  // Standalone component
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterViewInit {
  activeFilter: HTMLElement | null = null;  // Initialize with null
  images: NodeListOf<HTMLElement> | null = null;  // Initialize with null
  filtersSelector = '.cs-button';
  imagesSelector = '.cs-listing';
  activeClass = 'cs-active';
  hiddenClass = 'cs-hidden';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const filters = this.el.nativeElement.querySelectorAll(this.filtersSelector) as NodeListOf<HTMLElement>;
    this.activeFilter = filters[0];
    this.images = this.el.nativeElement.querySelectorAll(this.imagesSelector) as NodeListOf<HTMLElement>;

    if (this.activeFilter) {
      this.activeFilter.classList.add(this.activeClass);
    }

    filters.forEach((filter: HTMLElement) => {
      filter.addEventListener('click', () => this.onClick(filter));
    });
  }

  onClick(filter: HTMLElement) {
    const filterValue = filter.dataset['filter'] || 'all'; // Provide a default value
    this.filter(filterValue);
    this.activeFilter?.classList.remove(this.activeClass);
    filter.classList.add(this.activeClass);
    this.activeFilter = filter;
  }

  filter(filter: string) {
    const showAll = filter === 'all';
    if (this.images) {
      this.images.forEach((image: HTMLElement) => {
        const show = showAll || image.dataset['category'] === filter;
        image.classList.toggle(this.hiddenClass, !show);
      });
    }
  }
}

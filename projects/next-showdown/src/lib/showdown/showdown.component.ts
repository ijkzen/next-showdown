import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {MermaidService} from '../service/mermaid.service';
import {HtmlService} from '../service/html.service';

@Component({
  selector: 'next-showdown',
  templateUrl: './showdown.component.html',
  styleUrls: ['./showdown.component.scss']
})
export class ShowdownComponent implements OnInit, OnChanges {
  @Input()
  md: string;

  @Input()
  isMermaid = false;

  @Input()
  isSanitizer = false;

  @Output()
  rendering = new EventEmitter<boolean>();

  constructor(
    private elementRef: ElementRef,
    private mermaidService: MermaidService,
    private htmlService: HtmlService,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.renderView();
  }

  renderView() {
    const result = this.htmlService.getHtml(this.md);
    if (result !== undefined && result !== '' && result !== null) {
      this.elementRef.nativeElement.innerHTML = this.isSanitizer ? this.sanitizer.sanitize(SecurityContext.HTML, result) : result;
      this.isMermaid ? this.mermaidService.renderMermaid(this.elementRef.nativeElement) : this.renderedView();
      this.renderedView();
    }
  }

  renderedView() {
    this.rendering.emit(false);
  }

}

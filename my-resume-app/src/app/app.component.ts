import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  mobileMenuOpen = false;
  activeSection = 'home';
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.updateActiveSectionOnScroll();
    this.setupEventListeners();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      this.activeSection = sectionId;
      this.updateActiveNavLinks();
      
      if (this.mobileMenuOpen) {
        this.toggleMobileMenu();
      }
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  updateActiveNavLinks() {
    document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    document.querySelectorAll(`.nav-link[data-section="${this.activeSection}"]`).forEach(link => {
      link.classList.add('active');
    });
    document.querySelectorAll(`.mobile-nav-link[data-section="${this.activeSection}"]`).forEach(link => {
      link.classList.add('active');
    });
    document.querySelectorAll(`.footer-nav-link[data-section="${this.activeSection}"]`).forEach(link => {
      link.classList.add('active');
    });
  }

  @HostListener('window:scroll')
  updateActiveSectionOnScroll() {
    const sections = ['home', 'courses', 'projects', 'coursework', 'practice', 'practice2', 'social', 'self-development', 'about'];
    const scrollPosition = window.scrollY + 100;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          if (this.activeSection !== section) {
            this.activeSection = section;
            this.updateActiveNavLinks();
          }
          break;
        }
      }
    }
  }

  setupEventListeners() {
    document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-nav-link, .scroll-btn').forEach(el => {
      el.addEventListener('click', (event) => {
        const target = event.currentTarget as HTMLElement;
        const sectionId = target.getAttribute('data-section');
        if (sectionId) {
          this.scrollToSection(sectionId);
        }
      });
    });

    const menuBtn = document.getElementById('mobileMenuBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => this.toggleMobileMenu());
    }

    document.addEventListener('click', (event) => {
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      
      if (this.mobileMenuOpen && mobileMenu && mobileMenuBtn) {
        if (!mobileMenu.contains(event.target as Node) && !mobileMenuBtn.contains(event.target as Node)) {
          this.toggleMobileMenu();
        }
      }
    });
  }
}
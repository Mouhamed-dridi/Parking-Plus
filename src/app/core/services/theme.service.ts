import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'parkingplus-theme';
  isDark = false;

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark') {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }

  toggleTheme(): void {
    this.isDark ? this.enableLight() : this.enableDark();
  }

  private enableDark(): void {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    this.isDark = true;
    localStorage.setItem(this.storageKey, 'dark');
  }

  private enableLight(): void {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    this.isDark = false;
    localStorage.setItem(this.storageKey, 'light');
  }

  isDarkMode(): boolean {
    return this.isDark;
  }
}

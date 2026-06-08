import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'admin' | 'driver';

export interface User {
  username: string;
  password: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

const USERS: User[] = [
  { username: 'admin', password: 'admin', role: 'admin', name: 'Admin User', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { username: 'drv123', password: 'drv123', role: 'driver', name: 'Driver', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  login(username: string, password: string): User | null {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userAvatar', user.avatar || '');
      return user;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatar');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getRole(): UserRole {
    return (localStorage.getItem('role') as UserRole) || 'admin';
  }

  getUserName(): string {
    return localStorage.getItem('userName') || 'User';
  }

  getUserAvatar(): string {
    return localStorage.getItem('userAvatar') || '';
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isDriver(): boolean {
    return this.getRole() === 'driver';
  }
}

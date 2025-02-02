import { Component, EventEmitter, inject, Input, Output, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Component1Component } from '../component1/component1.component';
import { ComponentComponent } from '../component/component.component';
import { StudentProfileComponent } from '../student-profile/student-profile.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    Component1Component,
    ComponentComponent
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  opened = false;
  collapsed = false;
  screenWidth = window.innerWidth;

  auth = inject(AuthService);
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')!);
  Name: string = this.loggedInUser?.name || '';
  profileimg: string = this.loggedInUser?.picture || '';
  Email: string = this.loggedInUser?.email || '';

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  @Input() userimg: string = '';
  @Input() name: string = '';

  activeComponent: string | null = 'dashboard'; // Default view

  constructor(private renderer: Renderer2) {}

  showComponent(component: string) {
    this.activeComponent = component;
  }
  
  ngOnInit(): void {
    this.addGlobalClickListener();
    this.extractStudentDetails(this.Email);
    this.fetchQueryStats();
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  }

  addGlobalClickListener() {
    this.renderer.listen('window', 'click', (event: Event) => {
      const dropdown = document.querySelector('.dropdown');
      const target = event.target as HTMLElement;
      if (dropdown && !dropdown.contains(target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  studentName: string = '';
  studentDepartment: string = '';
  studentYear: string = '';
  studentRollNumber: string = '';

  queryCount: number = 0;
  processedQueries: number = 0;
  solvedQueries: number = 0;
  rejectedQueries: number = 0;

  extractStudentDetails(email: string) {
    const emailParts = email.split('@')[0];
    const [name, roll] = emailParts.split('.');
    const departmentCode = roll.slice(0, 2);
    const yearCode = roll.slice(2, 4);

    this.studentName = name.charAt(0).toUpperCase() + name.slice(1);
    this.studentDepartment = this.getDepartmentName(departmentCode);
    this.studentYear = `20${yearCode}`;
    this.studentRollNumber = roll;
  }

  getDepartmentName(code: string): string {
    const departments: { [key: string]: string } = {
      'ec': 'Electronics and Communication',
      'cs': 'Computer Science',
      'it': 'Information Technology',
      'ee': 'Electrical Engineering',
      'me': 'Mechanical Engineering',
    };
    return departments[code.toLowerCase()] || 'Unknown Department';
  }

  fetchQueryStats() {
    // Mock query stats
    this.queryCount = 15;
    this.processedQueries = 10;
    this.solvedQueries = 8;
    this.rejectedQueries = 2;
  }
}
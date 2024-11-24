import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatTableDataSource } from '@angular/material/table'; 
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { faEdit, faTrash, faPlus, faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, AfterViewInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faUnlock = faUnlock;
  faLock = faLock;
  displayedColumns: string[] = ['id', 'nom', 'email', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addUser() {
    this.router.navigate(['/utilisateurs/ajouter']);
  }

  editUser(userId: number) {
    this.router.navigate(['/edit-user', userId]);
  }

  blockUser(id: number): void {
    if (confirm('Voulez-vous vraiment bloquer cet utilisateur ?')) {
      this.userService.blockUser(id).subscribe(() => {
        const user = this.dataSource.data.find((u) => u.id === id);
        if (user) user.is_active = false; // Mise à jour de l'état dans la table
      });
    }
  }

  unblockUser(id: number): void {
    if (confirm('Voulez-vous vraiment débloquer cet utilisateur ?')) {
      this.userService.unblockUser(id).subscribe(() => {
        const user = this.dataSource.data.find((u) => u.id === id);
        if (user) user.is_active = true; // Mise à jour de l'état dans la table
      });
    }
  }
}

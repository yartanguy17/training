import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalService } from 'src/app/services/swal.service';
import { User } from '../models/user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {

  user: User;
  constructor(
      public dialogRef: MatDialogRef<DeleteUserComponent>,
      // private service: NoteService,
      private swalService: SwalService,
      @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
      this.user = data.user;
  }

  delete() {
      const idUser: any = this.user.id
      // this.service.delete(idUser).subscribe((res) => {
      //     this.swalService.toastSuccess("Utilisateur supprimé avec succès");
      //     this.dialogRef.close(true);
      // })
  }

  close() {
      this.dialogRef.close(true);
  }
}

import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
})
export class DeleteDialogComponent {
  name: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: { name: string },
    private readonly dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {
    this.name = data.name;
  }

  close(isDelete: boolean = false) {
    this.dialogRef.close(isDelete);
  }
}

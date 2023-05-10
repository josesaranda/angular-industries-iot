import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { DeleteDialogComponent } from "./delete-dialog.component";

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [DeleteDialogComponent],
})
export class DeleteDialogModule {}

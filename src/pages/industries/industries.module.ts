import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DeleteDialogModule } from "@components/delete-dialog/delete-dialog.module";
import { IndustriesComponent } from "./industries.component";
import { IndustriesRoutingModule } from "./industries.routing";

@NgModule({
  imports: [
    CommonModule,
    IndustriesRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    DeleteDialogModule,
  ],
  declarations: [IndustriesComponent],
})
export class IndustriesModule {}

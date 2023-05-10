import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DeleteDialogComponent } from "@components/delete-dialog/delete-dialog.component";
import { Industry } from "@services/industries/industry.interface";
import { IndustriesService } from "@services/industries/industries.service";
import { switchMap } from "rxjs";

@Component({
  selector: "app-industries",
  templateUrl: "./industries.component.html",
  styleUrls: ["./industries.component.scss"],
})
export class IndustriesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  datasource = new MatTableDataSource<Industry>([]);
  formGroup: FormGroup;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly industriesService: IndustriesService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [""],
    });
  }

  ngOnInit(): void {
    this.getAllIndustries();
    this.formGroup.valueChanges
      .pipe(switchMap((industry) => this.industriesService.getAll(industry)))
      .subscribe((industries) => {
        this.datasource.data = industries;
      });
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  openDeleteDialog(Industry: Industry) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: { name: Industry.name },
      width: "400px",
    });
    dialog.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.industriesService.deleteOne(Industry.id).subscribe(() => {
          this.snackBar.open("Industry successfully deleted", undefined, {
            duration: 2000,
            verticalPosition: "top",
          });
          this.formGroup.reset();
          this.getAllIndustries();
        });
      }
    });
  }

  private getAllIndustries() {
    this.industriesService.getAll().subscribe((industries) => {
      this.datasource.data = industries;
    });
  }
}

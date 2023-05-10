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
import { IndustriesService } from "@services/industries/industries.service";
import { Industry } from "@services/industries/industry.interface";
import { IoT } from "@services/iots/iot.interface";
import { IotsService } from "@services/iots/iots.service";
import { Observable, switchMap } from "rxjs";

@Component({
  selector: "app-iots",
  templateUrl: "./iots.component.html",
  styleUrls: ["./iots.component.scss"],
})
export class IotsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  datasource = new MatTableDataSource<IoT>([]);
  formGroup: FormGroup;

  industries$: Observable<Industry[]>;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly iotsService: IotsService,
    private readonly industriesService: IndustriesService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [""],
      industryId: [""],
    });
    this.industries$ = this.industriesService.getAll();
  }

  ngOnInit(): void {
    this.getAllIots();
    this.formGroup.valueChanges
      .pipe(switchMap((iot) => this.iotsService.getAll(iot)))
      .subscribe((industries) => {
        this.datasource.data = industries;
      });
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  openDeleteDialog(iot: IoT) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: { name: iot.name },
      width: "400px",
    });
    dialog.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.iotsService.deleteOne(iot.id).subscribe(() => {
          this.snackBar.open("IoT successfully deleted", undefined, {
            duration: 2000,
            verticalPosition: "top",
          });
          this.formGroup.reset();
          this.getAllIots();
        });
      }
    });
  }

  private getAllIots() {
    this.iotsService.getAll().subscribe((industries) => {
      this.datasource.data = industries;
    });
  }
}

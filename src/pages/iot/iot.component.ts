import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { IndustriesService } from "@services/industries/industries.service";
import { Industry } from "@services/industries/industry.interface";
import { IotsService } from "@services/iots/iots.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-iot",
  templateUrl: "./iot.component.html",
})
export class IotComponent implements OnInit {
  id: number;
  isNew = false;

  formGroup: FormGroup;

  industries$: Observable<Industry[]>;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly iotsService: IotsService,
    private readonly industriesService: IndustriesService
  ) {
    this.id = +this.activatedRoute.snapshot.params["id"];
    this.isNew = isNaN(this.id);
    this.formGroup = this.formBuilder.group({
      name: [undefined, [Validators.required]],
      warehouseAdditionTime: [undefined, [Validators.required]],
      numOfDevices: [
        undefined,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      fee: [undefined, [Validators.required, Validators.min(0)]],
      industryId: [undefined, [Validators.required]],
    });
    this.industries$ = this.industriesService.getAll();
  }

  ngOnInit(): void {
    if (!this.isNew) {
      this.iotsService.getOne(this.id).subscribe((iot) => {
        if (iot) {
          const { id, ...iotWithoutId } = iot;
          this.formGroup.setValue(iotWithoutId);
        }
      });
    }
  }

  onClickSubmit(): void {
    this.isNew ? this.createIot() : this.updateIot();
  }

  private createIot(): void {
    this.iotsService.createOne(this.formGroup.value).subscribe(() => {
      this.snackBar.open("IoT successfully created", undefined, {
        duration: 2000,
        verticalPosition: "top",
      });
      this.router.navigate(["/iots"]);
    });
  }

  private updateIot(): void {
    this.iotsService.updateOne(this.id, this.formGroup.value).subscribe(() => {
      this.snackBar.open("IoT succesfully saved", undefined, {
        duration: 2000,
        verticalPosition: "top",
      });
      this.router.navigate(["/iots"]);
    });
  }
}

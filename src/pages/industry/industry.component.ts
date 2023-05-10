import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { IndustriesService } from "@services/industries/industries.service";

@Component({
  selector: "app-industry",
  templateUrl: "./industry.component.html",
})
export class IndustryComponent implements OnInit {
  id: number;
  isNew = false;

  formGroup: FormGroup;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly industriesService: IndustriesService
  ) {
    this.id = +this.activatedRoute.snapshot.params["id"];
    this.isNew = isNaN(this.id);
    this.formGroup = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (!this.isNew) {
      this.industriesService.getOne(this.id).subscribe((industry) => {
        if (industry) {
          const { id, ...industryWithoutId } = industry;
          this.formGroup.setValue(industryWithoutId);
        }
      });
    }
  }

  onClickSubmit(): void {
    this.isNew ? this.createIndustry() : this.updateIndustry();
  }

  private createIndustry(): void {
    this.industriesService.createOne(this.formGroup.value).subscribe(() => {
      this.snackBar.open("Industry successfully created", undefined, {
        duration: 2000,
        verticalPosition: "top",
      });
      this.router.navigate(["/industries"]);
    });
  }

  private updateIndustry(): void {
    this.industriesService
      .updateOne(this.id, this.formGroup.value)
      .subscribe(() => {
        this.snackBar.open("Industry succesfully saved", undefined, {
          duration: 2000,
          verticalPosition: "top",
        });
        this.router.navigate(["/industries"]);
      });
  }
}

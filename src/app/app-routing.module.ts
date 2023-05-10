import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "industries",
    pathMatch: "full",
  },
  {
    path: "industries",
    loadChildren: () =>
      import("@pages/industries/industries.module").then(
        (m) => m.IndustriesModule
      ),
  },
  {
    path: "industries/:id",
    loadChildren: () =>
      import("@pages/industry/industry.module").then((m) => m.IndustryModule),
  },
  {
    path: "iots",
    loadChildren: () =>
      import("@pages/iots/iots.module").then((m) => m.IotsModule),
  },
  {
    path: "iots/:id",
    loadChildren: () =>
      import("@pages/iot/iot.module").then((m) => m.IotModule),
  },
  {
    path: "**",
    redirectTo: "industries",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IotsComponent } from "./iots.component";

const routes: Routes = [
  {
    path: "",
    component: IotsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IotsRoutingModule {}

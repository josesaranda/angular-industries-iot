import { HttpClientModule } from "@angular/common/http";
import { render, screen, within } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";

describe("AppComponent", () => {
  it("should render", async () => {
    await render(AppComponent, {
      componentProperties: {},
      imports: [AppModule, HttpClientModule],
    });

    expect(screen.getByText("Industries & IoT")).toBeInTheDocument();
    const navigation = screen.getByRole("navigation")
    expect(navigation).toBeInTheDocument()
    expect(within(navigation).getByText("Industries")).toBeInTheDocument()
    expect(within(navigation).getByText("IoTs")).toBeInTheDocument()
  });
});

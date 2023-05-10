import { HttpClientModule } from "@angular/common/http";
import { IndustriesService } from "@services/industries/industries.service";
import { render, screen, within } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { of } from "rxjs";
import { instance, mock, when } from "ts-mockito";
import { IndustriesComponent } from "./industries.component";
import { IndustriesModule } from "./industries.module";

describe("IndustriesComponent", () => {
  const mockedIndustriesService = mock(IndustriesService);
  it("should render", async () => {
    when(mockedIndustriesService.getAll()).thenReturn(
      of([
        {
          id: 1,
          name: "Industry 1",
        },
      ])
    );
    await render(IndustriesComponent, {
      componentProperties: {},
      imports: [IndustriesModule, HttpClientModule],
      providers: [
        {
          provide: IndustriesService,
          useValue: instance(mockedIndustriesService),
        },
      ],
    });

    expect(screen.getByText("Industries")).toBeInTheDocument();
    const textbox = screen.getByRole("searchbox") as HTMLInputElement;
    expect(textbox.placeholder).toBe("Search by name");
    expect(screen.getByText("Add")).toBeInTheDocument();

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // table headers
    expect(within(table).getByText("ID")).toBeInTheDocument();
    expect(within(table).getByText("Name")).toBeInTheDocument();
    expect(within(table).getByText("Actions")).toBeInTheDocument();

    // table rows
    expect(within(table).getByText("1")).toBeInTheDocument();
    expect(within(table).getByText("Industry 1")).toBeInTheDocument();
    expect(within(table).getByText("Edit")).toBeInTheDocument();
    expect(within(table).getByText("Delete")).toBeInTheDocument();
  });
});

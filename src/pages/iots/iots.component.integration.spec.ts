import { HttpClientModule } from "@angular/common/http";
import { IotsService } from "@services/iots/iots.service";
import { render, screen, within } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { of } from "rxjs";
import { instance, mock, when } from "ts-mockito";
import { IotsComponent } from "./iots.component";
import { IotsModule } from "./iots.module";

describe("IotsComponent", () => {
  const mockedIotsService = mock(IotsService);
  it("should render", async () => {
    when(mockedIotsService.getAll()).thenReturn(
      of([
        {
          id: 1,
          name: "IoT 1",
          numOfDevices: 2,
          fee: 3,
          industryId: 4,
          warehouseAdditionTime: "test",
        },
      ])
    );
    await render(IotsComponent, {
      componentProperties: {},
      imports: [IotsModule, HttpClientModule],
      providers: [
        {
          provide: IotsService,
          useValue: instance(mockedIotsService),
        },
      ],
    });

    expect(screen.getByText("IoTs")).toBeInTheDocument();
    expect(screen.getByText("Industry")).toBeInTheDocument();
    const textbox = screen.getByRole("searchbox") as HTMLInputElement;
    expect(textbox.placeholder).toBe("Search by name");
    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // table headers
    expect(within(table).getByText("ID")).toBeInTheDocument();
    expect(within(table).getByText("Name")).toBeInTheDocument();
    expect(within(table).getByText("AdditionTime")).toBeInTheDocument();
    expect(within(table).getByText("Num. Devices")).toBeInTheDocument();
    expect(within(table).getByText("Fee")).toBeInTheDocument();
    expect(within(table).getByText("Actions")).toBeInTheDocument();

    // table rows
    expect(within(table).getByText("IoT 1")).toBeInTheDocument();
    expect(within(table).getByText("1")).toBeInTheDocument();
    expect(within(table).getByText("2")).toBeInTheDocument();
    expect(within(table).getByText("3")).toBeInTheDocument();
    expect(within(table).getByText("test")).toBeInTheDocument();
    expect(within(table).getByText("Edit")).toBeInTheDocument();
    expect(within(table).getByText("Delete")).toBeInTheDocument();
  });
});

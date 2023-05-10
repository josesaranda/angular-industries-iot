import { HttpClientModule } from "@angular/common/http";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from "@angular/router";
import { IndustriesService } from "@services/industries/industries.service";
import { IotsService } from "@services/iots/iots.service";
import { render, screen } from "@testing-library/angular";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { of } from "rxjs";
import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { IotComponent } from "./iot.component";
import { IotModule } from "./iot.module";

describe("IotComponent", () => {
  const mockedIotsService = mock(IotsService);
  const mockedIndustriesService = mock(IndustriesService);
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
    await render(IotComponent, {
      imports: [IotModule, HttpClientModule],
      providers: [
        {
          provide: IotsService,
          useValue: instance(mockedIotsService),
        },
      ],
    });

    expect(screen.getByText("IoT")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByText("Warehouse Addition Time")).toBeInTheDocument();
    expect(screen.getByText("Num of devices")).toBeInTheDocument();
    expect(screen.getByText("Fee")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should render given iot and update it", async () => {
    const mockedActivatedRoute = mock(ActivatedRoute);
    const mockedRouter = mock(Router);
    when(mockedActivatedRoute.snapshot).thenReturn({
      params: { id: 1 },
    } as unknown as ActivatedRouteSnapshot);
    when(mockedIndustriesService.getAll()).thenReturn(
      of([
        {
          id: 1,
          name: "Industry 1",
        },
        {
          id: 1,
          name: "Industry 2",
        },
      ])
    );
    when(mockedIotsService.getOne(1)).thenReturn(
      of({
        id: 1,
        name: "IoT 1",
        fee: 1,
        industryId: 1,
        numOfDevices: 1,
        warehouseAdditionTime: "test",
      })
    );
    when(
      mockedIotsService.updateOne(
        1,
        deepEqual({
          name: "IoT 2",
          fee: 2,
          industryId: 1,
          numOfDevices: 2,
          warehouseAdditionTime: "test2",
        })
      )
    ).thenReturn(
      of({
        id: 1,
        name: "IoT 2",
        fee: 2,
        industryId: 1,
        numOfDevices: 2,
        warehouseAdditionTime: "test2",
      })
    );
    when(mockedRouter.navigate(deepEqual(["/iots"]))).thenReturn();

    await render(IotComponent, {
      imports: [IotModule, HttpClientModule],
      providers: [
        {
          provide: IotsService,
          useValue: instance(mockedIotsService),
        },
        {
          provide: IndustriesService,
          useValue: instance(mockedIndustriesService),
        },
        {
          provide: Router,
          useValue: instance(mockedRouter),
        },
        {
          provide: ActivatedRoute,
          useValue: instance(mockedActivatedRoute),
        },
      ],
    });

    expect(screen.getByText("IoT")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByText("Warehouse Addition Time")).toBeInTheDocument();
    expect(screen.getByText("Num of devices")).toBeInTheDocument();
    expect(screen.getByText("Fee")).toBeInTheDocument();

    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeInTheDocument();

    const inputName = screen.getByRole("textbox", {
      name: "Name",
    }) as HTMLInputElement;
    expect(inputName.value).toBe("IoT 1");

    const inputIndustry = screen.getByRole("listbox", {
      name: "Industry",
    }) as HTMLSelectElement;
    expect(
      inputIndustry.children[inputIndustry.selectedIndex].textContent
    ).toBe(" Industry 1 ");

    const inputWarehouse = screen.getByRole("textbox", {
      name: "Warehouse Addition Time",
    }) as HTMLInputElement;
    expect(inputWarehouse.value).toBe("test");

    const inputNumOfDevices = screen.getByRole("textbox", {
      name: "Num of devices",
    }) as HTMLInputElement;
    expect(inputNumOfDevices.value).toBe("1");

    const inputFee = screen.getByRole("textbox", {
      name: "Fee",
    }) as HTMLInputElement;
    expect(inputFee.value).toBe("1");

    await userEvent.clear(inputName);
    await userEvent.type(inputName, "IoT 2");
    expect(inputName.value).toBe("IoT 2");

    await userEvent.clear(inputFee);
    await userEvent.type(inputFee, "2");
    expect(inputFee.value).toBe("2");

    await userEvent.clear(inputNumOfDevices);
    await userEvent.type(inputNumOfDevices, "2");
    expect(inputNumOfDevices.value).toBe("2");

    await userEvent.clear(inputWarehouse);
    await userEvent.type(inputWarehouse, "test2");
    expect(inputWarehouse.value).toBe("test2");

    await userEvent.click(saveButton);

    verify(mockedRouter.navigate(deepEqual(["/iots"]))).once();
  });
});

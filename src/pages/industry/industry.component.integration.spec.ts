import { HttpClientModule } from "@angular/common/http";
import { IndustriesService } from "@services/industries/industries.service";
import { render, screen, waitFor } from "@testing-library/angular";
import "@testing-library/jest-dom";
import { of } from "rxjs";
import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { IndustryComponent } from "./industry.component";
import { IndustryModule } from "./industry.module";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import userEvent from "@testing-library/user-event";

describe("IndustryComponent", () => {
  const mockedIndustriesService = mock(IndustriesService);
  it("should render", async () => {
    await render(IndustryComponent, {
      imports: [IndustryModule, HttpClientModule],
      providers: [
        {
          provide: IndustriesService,
          useValue: instance(mockedIndustriesService),
        },
      ],
    });

    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should render given industry and update it", async () => {
    const mockedActivatedRoute = mock(ActivatedRoute);
    const mockedRouter = mock(Router)
    when(mockedActivatedRoute.snapshot).thenReturn({
      params: { id: 1 },
    } as unknown as ActivatedRouteSnapshot);
    when(mockedIndustriesService.getOne(1)).thenReturn(
      of({
        id: 1,
        name: "Industry 1",
      })
    );
    when(
      mockedIndustriesService.updateOne(1, deepEqual({ name: "Industry 2" }))
    ).thenReturn(of({ id: 1, name: "Industry 2" }))
    when(mockedRouter.navigate(deepEqual(["/industries"]))).thenReturn();
    await render(IndustryComponent, {
      imports: [IndustryModule, HttpClientModule],
      providers: [
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

    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();

    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeInTheDocument();

    const inputName = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputName.value).toBe("Industry 1");

    await userEvent.clear(inputName);
    await userEvent.type(inputName, "Industry 2");

    expect(inputName.value).toBe("Industry 2");

    await userEvent.click(saveButton);

    verify(mockedRouter.navigate(deepEqual(["/industries"]))).once()
  });
});

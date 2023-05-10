import { MatDialogRef } from "@angular/material/dialog";
import { instance, mock, verify } from "ts-mockito";
import { DeleteDialogComponent } from "./delete-dialog.component";

describe("DeleteDialogComponent", () => {
  const mockedDialogRef = mock(MatDialogRef);
  const deleteDialogComponent = new DeleteDialogComponent(
    { name: "superman" },
    instance(mockedDialogRef)
  );

  it("Should be defined", () => {
    expect(deleteDialogComponent).toBeDefined();
    expect(deleteDialogComponent.name).toBe("superman");
  });

  describe("#close", () => {
    it("Should call dialog close method", () => {
      deleteDialogComponent.close(true)
      verify(mockedDialogRef.close(true)).once()
    })
  })
});

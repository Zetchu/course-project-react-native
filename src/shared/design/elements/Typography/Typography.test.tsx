import { render, userEvent } from "@testing-library/react-native";
import { Typography } from "./Typography";

describe("Design > Elements > Typography", () => {
  // Requirement: Smoke test
  it("works", () => {
    render(<Typography>Hello World</Typography>);
  });

  // Requirement: Unit test using a mock function and a user action
  it("handles user press actions correctly", async () => {
    const mockOnPress = jest.fn(); // Mock function

    const { getByText } = render(
      <Typography onPress={mockOnPress}>Click Me</Typography>,
    );

    const textElement = getByText("Click Me");

    // User action
    await userEvent.press(textElement);

    // Verify the mock was called
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

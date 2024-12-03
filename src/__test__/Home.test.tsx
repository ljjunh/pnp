import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

test("jest 작동 테스트", () => {
  render(<Home />);
  const welcomeElement = screen.getByText(/started/i);
  expect(welcomeElement).toBeInTheDocument();
});

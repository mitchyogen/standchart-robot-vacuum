import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
    render(<App />);
    const origin0 = screen.getByText(/x:0, y:0/i);
    expect(origin0).toBeInTheDocument();
});

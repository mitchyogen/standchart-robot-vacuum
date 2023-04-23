import React from "react";
import { render, screen } from "@testing-library/react";
import Robot from "./Robot";

describe("renders Robot.tsx", () => {
    test("robot should exist", () => {
        render(<Robot direction="north" />);
        const robot = screen.getByTestId(/robot/i);
        expect(robot).toBeInTheDocument();
    });

    test("robot should face north", () => {
        render(<Robot direction="north" />);
        const robot = screen.getByTestId(/robot/i);
        expect(robot).toHaveStyle(`transform: rotate(0)`);
    });

    test("robot should face east", () => {
        render(<Robot direction="east" />);
        const robot = screen.getByTestId(/robot/i);
        expect(robot).toHaveStyle(`transform: rotate(90deg)`);
    });

    test("robot should face west", () => {
        render(<Robot direction="west" />);
        const robot = screen.getByTestId(/robot/i);
        expect(robot).toHaveStyle(`transform: rotate(-90deg)`);
    });

    test("robot should face south", () => {
        render(<Robot direction="south" />);
        const robot = screen.getByTestId(/robot/i);
        expect(robot).toHaveStyle(`transform: rotate(180deg)`);
    });
});

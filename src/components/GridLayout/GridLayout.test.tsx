import React from "react";
import { act, render, screen } from "@testing-library/react";
import GridLayout from "./GridLayout";
import userEvent from "@testing-library/user-event";

describe("renders Grid", () => {
    test("robot should not exist on load", () => {
        render(<GridLayout />);
        const robot = screen.queryByTestId("robot");
        expect(robot).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "X: 0, Y: 0, F: NORTH" })).not.toBeInTheDocument();
    });

    test.each([
        ["0", "0"],
        ["0", "1"],
        ["0", "2"],
        ["0", "3"],
        ["0", "4"],
        ["1", "0"],
        ["1", "1"],
        ["1", "2"],
        ["1", "3"],
        ["1", "4"],
        ["2", "0"],
        ["2", "1"],
        ["2", "2"],
        ["2", "3"],
        ["2", "4"],
        ["3", "0"],
        ["3", "1"],
        ["3", "2"],
        ["3", "3"],
        ["3", "4"],
        ["4", "0"],
        ["4", "1"],
        ["4", "2"],
        ["4", "3"],
        ["4", "4"],
    ])("set robot at %p,%p,N", async (xCoor, yCoor) => {
        render(<GridLayout />);
        const xCoorInput = await screen.getByRole("spinbutton", { name: "X Coordinate" });
        const yCoorInput = await screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });
        const reportBtn = await screen.getByRole("button", { name: "REPORT" });
        act(() => {
            userEvent.type(xCoorInput, xCoor);
            userEvent.type(yCoorInput, yCoor);
            userEvent.click(placeBtn);
        });

        const robot = await screen.getByTestId("robot");
        expect(robot).toBeInTheDocument();

        act(() => {
            userEvent.click(reportBtn);
        });

        expect(await screen.getByRole("heading", { name: `X: ${xCoor}, Y: ${yCoor}, F: NORTH` }));
    });

    test("move robot at 0,2,E", async () => {
        render(<GridLayout />);
        const xCoorInput = await screen.getByRole("spinbutton", { name: "X Coordinate" });
        const yCoorInput = await screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });
        act(() => {
            userEvent.type(xCoorInput, "0");
            userEvent.type(yCoorInput, "0");
            userEvent.click(placeBtn);
        });
        const rightBtn = await screen.getByRole("button", { name: "RIGHT" });
        const moveBtn = await screen.getByRole("button", { name: "MOVE" });
        const reportBtn = await screen.getByRole("button", { name: "REPORT" });
        act(() => {
            userEvent.click(rightBtn);
        });
        act(() => {
            userEvent.click(moveBtn);
        });
        act(() => {
            userEvent.click(moveBtn);
        });
        act(() => {
            userEvent.click(reportBtn);
        });
        expect(await screen.getByRole("heading", { name: "X: 2, Y: 0, F: EAST" }));
    });

    test("move robot at 3,4,S", async () => {
        render(<GridLayout />);
        const xCoorInput = await screen.getByRole("spinbutton", { name: "X Coordinate" });
        const yCoorInput = await screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });
        act(() => {
            userEvent.type(xCoorInput, "4");
            userEvent.type(yCoorInput, "4");
            userEvent.click(placeBtn);
        });
        const leftBtn = await screen.getByRole("button", { name: "LEFT" });
        const moveBtn = await screen.getByRole("button", { name: "MOVE" });
        const reportBtn = await screen.getByRole("button", { name: "REPORT" });
        act(() => {
            userEvent.click(leftBtn);
        });
        act(() => {
            userEvent.click(leftBtn);
        });
        act(() => {
            userEvent.click(moveBtn);
        });
        act(() => {
            userEvent.click(reportBtn);
        });
        expect(await screen.getByRole("heading", { name: "X: 4, Y: 3, F: SOUTH" }));
    });

    test("move robot at 2,1,W", async () => {
        render(<GridLayout />);
        const xCoorInput = await screen.getByRole("spinbutton", { name: "X Coordinate" });
        const yCoorInput = await screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });
        act(() => {
            userEvent.type(xCoorInput, "2");
            userEvent.type(yCoorInput, "2");
            userEvent.click(placeBtn);
        });
        const leftBtn = await screen.getByRole("button", { name: "LEFT" });
        const moveBtn = await screen.getByRole("button", { name: "MOVE" });
        const reportBtn = await screen.getByRole("button", { name: "REPORT" });
        act(() => {
            userEvent.click(leftBtn);
        });
        act(() => {
            userEvent.click(moveBtn);
        });
        act(() => {
            userEvent.click(reportBtn);
        });
        expect(await screen.getByRole("heading", { name: "X: 1, Y: 2, F: WEST" }));
    });

    test("move robot at 3,2,N", async () => {
        render(<GridLayout />);
        const xCoorInput = await screen.getByRole("spinbutton", { name: "X Coordinate" });
        const yCoorInput = await screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });
        act(() => {
            userEvent.type(xCoorInput, "2");
            userEvent.type(yCoorInput, "2");
            userEvent.click(placeBtn);
        });
        const moveBtn = await screen.getByRole("button", { name: "MOVE" });
        const reportBtn = await screen.getByRole("button", { name: "REPORT" });
        act(() => {
            userEvent.click(moveBtn);
        });
        act(() => {
            userEvent.click(reportBtn);
        });
        expect(await screen.getByRole("heading", { name: "X: 2, Y: 3, F: NORTH" }));
    });

    test("move button is disabled at boundaries", async () => {
        render(<GridLayout />);
        const xCoorInput = await screen.getByRole("spinbutton", { name: "X Coordinate" });
        const yCoorInput = await screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });
        act(() => {
            userEvent.type(xCoorInput, "0");
            userEvent.type(yCoorInput, "0");
            userEvent.click(placeBtn);
        });
        const leftBtn = await screen.getByRole("button", { name: "LEFT" });
        act(() => {
            userEvent.click(leftBtn);
        });
        expect(await screen.getByRole("button", { name: "MOVE" })).toBeDisabled();
    });

    test("move, left, right and report button is enabled after robot is placed", async () => {
        render(<GridLayout />);
        const xCoorInput = await screen.getByRole("spinbutton", { name: "X Coordinate" });
        const yCoorInput = await screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });
        act(() => {
            userEvent.type(xCoorInput, "0");
            userEvent.type(yCoorInput, "0");
            userEvent.click(placeBtn);
        });

        expect(await screen.getByRole("button", { name: "LEFT" })).not.toBeDisabled();
        expect(await screen.getByRole("button", { name: "RIGHT" })).not.toBeDisabled();
        expect(await screen.getByRole("button", { name: "MOVE" })).not.toBeDisabled();
        expect(await screen.getByRole("button", { name: "REPORT" })).not.toBeDisabled();
    });

    test("show error message when robot has no x and y coordinates", async () => {
        const { container } = render(<GridLayout />);
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });
        act(() => {
            userEvent.click(placeBtn);
        });
        expect(container.querySelector("#xCoordinate-helper-text")).toBeInTheDocument();
        expect(container.querySelector("#yCoordinate-helper-text")).toBeInTheDocument();
    });

    test("show error message when robot has no x coordinates", async () => {
        const { container } = render(<GridLayout />);
        const yCoorInput = await screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });

        act(() => {
            userEvent.type(yCoorInput, "0");
            userEvent.click(placeBtn);
        });

        expect(container.querySelector("#xCoordinate-helper-text")).toBeInTheDocument();
        expect(container.querySelector("#yCoordinate-helper-text")).not.toBeInTheDocument();
    });

    test("show error message when robot has no y coordinates", async () => {
        const { container } = render(<GridLayout />);
        const xCoorInput = await screen.getByRole("spinbutton", { name: "X Coordinate" });
        const placeBtn = await screen.getByRole("button", { name: "PLACE" });

        act(() => {
            userEvent.type(xCoorInput, "0");
            userEvent.click(placeBtn);
        });

        expect(container.querySelector("#xCoordinate-helper-text")).not.toBeInTheDocument();
        expect(container.querySelector("#yCoordinate-helper-text")).toBeInTheDocument();
    });

    test.each([
        ["North", "NORTH"],
        ["South", "SOUTH"],
        ["East", "EAST"],
        ["West", "WEST"],
    ])("place robot at 0,0,%p", async (selectedDirection, expectedDirection) => {
        render(<GridLayout />);
        const xCoorInput = screen.getByRole("spinbutton", { name: "X Coordinate" });
        const yCoorInput = screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = screen.getByRole("button", { name: "PLACE" });
        const reportBtn = screen.getByRole("button", { name: "REPORT" });
        const selectDirectionInput = screen.getByRole("button", { name: "North" });

        act(() => {
            userEvent.type(xCoorInput, "0");
            userEvent.type(yCoorInput, "0");
            userEvent.click(selectDirectionInput);
        });

        act(() => {
            userEvent.click(screen.getByRole("option", { name: selectedDirection }));
        });

        act(() => {
            userEvent.click(placeBtn);
        });

        act(() => {
            userEvent.click(reportBtn);
        });

        expect(screen.getByRole("heading", { name: `X: 0, Y: 0, F: ${expectedDirection}` }));
    });

    test.each([
        ["North", "WEST"],
        ["East", "NORTH"],
        ["South", "EAST"],
        ["West", "SOUTH"],
    ])(
        "robot placed at 2,3,%p should face %p when left button is clicked",
        async (selectedDirection, expectedDirection) => {
            render(<GridLayout />);
            const xCoorInput = screen.getByRole("spinbutton", { name: "X Coordinate" });
            const yCoorInput = screen.getByRole("spinbutton", { name: "Y Coordinate" });
            const placeBtn = screen.getByRole("button", { name: "PLACE" });
            const leftBtn = screen.getByRole("button", { name: "LEFT" });
            const reportBtn = screen.getByRole("button", { name: "REPORT" });
            const selectDirectionInput = screen.getByRole("button", { name: "North" });

            act(() => {
                userEvent.type(xCoorInput, "2");
                userEvent.type(yCoorInput, "3");
                userEvent.click(selectDirectionInput);
            });

            act(() => {
                userEvent.click(screen.getByRole("option", { name: selectedDirection }));
            });

            act(() => {
                userEvent.click(placeBtn);
            });

            act(() => {
                userEvent.click(leftBtn);
            });

            act(() => {
                userEvent.click(reportBtn);
            });

            expect(screen.getByRole("heading", { name: `X: 2, Y: 3, F: ${expectedDirection}` }));
        }
    );

    test.each([
        ["North", "EAST"],
        ["East", "SOUTH"],
        ["South", "WEST"],
        ["West", "NORTH"],
    ])(
        "robot placed at 2,3,%p should face %p when right button is clicked",
        async (selectedDirection, expectedDirection) => {
            render(<GridLayout />);
            const xCoorInput = screen.getByRole("spinbutton", { name: "X Coordinate" });
            const yCoorInput = screen.getByRole("spinbutton", { name: "Y Coordinate" });
            const placeBtn = screen.getByRole("button", { name: "PLACE" });
            const rightBtn = screen.getByRole("button", { name: "RIGHT" });
            const reportBtn = screen.getByRole("button", { name: "REPORT" });
            const selectDirectionInput = screen.getByRole("button", { name: "North" });

            act(() => {
                userEvent.type(xCoorInput, "2");
                userEvent.type(yCoorInput, "3");
                userEvent.click(selectDirectionInput);
            });

            act(() => {
                userEvent.click(screen.getByRole("option", { name: selectedDirection }));
            });

            act(() => {
                userEvent.click(placeBtn);
            });

            act(() => {
                userEvent.click(rightBtn);
            });

            act(() => {
                userEvent.click(reportBtn);
            });

            expect(screen.getByRole("heading", { name: `X: 2, Y: 3, F: ${expectedDirection}` }));
        }
    );

    test.each([
        ["2", "3", "North", "NORTH"],
        ["1", "2", "West", "WEST"],
        ["2", "1", "South", "SOUTH"],
        ["3", "2", "East", "EAST"],
    ])("move robot to %p,%p,%p", async (expectedXCoor, expectedYCoor, selectedDirection, expectedDirection) => {
        render(<GridLayout />);
        const xCoorInput = screen.getByRole("spinbutton", { name: "X Coordinate" });
        const yCoorInput = screen.getByRole("spinbutton", { name: "Y Coordinate" });
        const placeBtn = screen.getByRole("button", { name: "PLACE" });
        const moveBtn = screen.getByRole("button", { name: "MOVE" });
        const reportBtn = screen.getByRole("button", { name: "REPORT" });
        const selectDirectionInput = screen.getByRole("button", { name: "North" });

        act(() => {
            userEvent.type(xCoorInput, "2");
            userEvent.type(yCoorInput, "2");
            userEvent.click(selectDirectionInput);
        });

        act(() => {
            userEvent.click(screen.getByRole("option", { name: selectedDirection }));
        });

        act(() => {
            userEvent.click(placeBtn);
        });

        act(() => {
            userEvent.click(moveBtn);
        });

        act(() => {
            userEvent.click(reportBtn);
        });

        expect(
            screen.getByRole("heading", { name: `X: ${expectedXCoor}, Y: ${expectedYCoor}, F: ${expectedDirection}` })
        );
    });
});

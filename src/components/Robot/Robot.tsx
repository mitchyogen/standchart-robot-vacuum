import React, { useEffect } from "react";
import { Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Direction } from "../GridLayout/GridLayout";

interface RobotProps {
    direction: Direction;
}

const defaultRobotStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#2D2D2D",
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
};

const Robot = ({ direction }: RobotProps) => {
    useEffect(() => {
        changeDirection();
    }, [direction]);

    const changeDirection = () => {
        switch (direction) {
            case "north":
                return {
                    ...defaultRobotStyle,
                    transform: "rotate(0)",
                };
            case "east":
                return {
                    ...defaultRobotStyle,
                    transform: "rotate(90deg)",
                };
            case "south":
                return {
                    ...defaultRobotStyle,
                    transform: "rotate(180deg)",
                };
            case "west":
                return {
                    ...defaultRobotStyle,
                    transform: "rotate(-90deg)",
                };
        }
    };

    return (
        <Box sx={changeDirection()} data-testid="robot">
            <KeyboardArrowUpIcon
                sx={{
                    fontSize: "60px",
                    color: "#fff",
                }}
            />
        </Box>
    );
};

export default Robot;

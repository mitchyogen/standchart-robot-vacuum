import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import Robot from "../Robot/Robot";

export type Direction = "north" | "south" | "east" | "west";

interface CoordinatesProps {
    x: number;
    y: number;
    direction: Direction;
}

const GridStyle = {
    width: 100,
    height: 100,
    backgroundColor: "primary.dark",
    border: "1px solid #000000",
};

const defaultCoordinates: CoordinatesProps = {
    x: 0,
    y: 0,
    direction: "north",
};

const defaultButtonStyle = {
    width: "200px",
    height: "50px",
};

const Grid = () => {
    const [coordinates, setCoordinates] = useState(defaultCoordinates);
    const [xCoordinate, setXCoordinate] = useState("");
    const [yCoordinate, setYCoordinate] = useState("");
    const [robotDirection, setRobotDirection] = useState<Direction>("north");
    const [reportCoordinates, setReportCoordinates] = useState(false);
    const [showRobot, setShowRobot] = useState(false);
    const [showXCoordinateErrorMessage, setShowXCoordinateErrorMessage] = useState(false);
    const [showYCoordinateErrorMessage, setShowYCoordinateErrorMessage] = useState(false);

    const handleDirection = (direction: string) => {
        setReportCoordinates(false);
        if (direction === "left") {
            if (coordinates.direction === "north") {
                setCoordinates({ ...coordinates, direction: "west" });
            } else if (coordinates.direction === "east") {
                setCoordinates({ ...coordinates, direction: "north" });
            } else if (coordinates.direction === "south") {
                setCoordinates({ ...coordinates, direction: "east" });
            } else if (coordinates.direction === "west") {
                setCoordinates({ ...coordinates, direction: "south" });
            }
        } else {
            if (coordinates.direction === "north") {
                setCoordinates({ ...coordinates, direction: "east" });
            } else if (coordinates.direction === "east") {
                setCoordinates({ ...coordinates, direction: "south" });
            } else if (coordinates.direction === "south") {
                setCoordinates({ ...coordinates, direction: "west" });
            } else if (coordinates.direction === "west") {
                setCoordinates({ ...coordinates, direction: "north" });
            }
        }
    };

    const handleRobotPlacement = () => {
        if (!xCoordinate && !yCoordinate) {
            setShowXCoordinateErrorMessage(true);
            setShowYCoordinateErrorMessage(true);
        } else if (!xCoordinate) {
            setShowXCoordinateErrorMessage(true);
            setShowYCoordinateErrorMessage(false);
        } else if (!yCoordinate) {
            setShowYCoordinateErrorMessage(true);
            setShowXCoordinateErrorMessage(false);
        } else {
            setCoordinates({
                x: Number(xCoordinate),
                y: Number(yCoordinate),
                direction: robotDirection,
            });
            setShowRobot(true);
            // reset input fields
            setReportCoordinates(false);
            setShowXCoordinateErrorMessage(false);
            setShowYCoordinateErrorMessage(false);
            setXCoordinate("");
            setYCoordinate("");
            setRobotDirection("north");
        }
    };

    const handleRobotDirection = (event: SelectChangeEvent<typeof coordinates.direction>) => {
        setRobotDirection(event.target.value as Direction);
    };

    const handleRobotMovement = () => {
        if (coordinates.direction === "north") {
            if (coordinates.y < 4) {
                setCoordinates({ ...coordinates, y: Number(coordinates.y) + 1 });
            }
        } else if (coordinates.direction === "east") {
            if (coordinates.x < 4) {
                setCoordinates({ ...coordinates, x: Number(coordinates.x) + 1 });
            }
        } else if (coordinates.direction === "south") {
            if (coordinates.y > 0) {
                setCoordinates({ ...coordinates, y: Number(coordinates.y) - 1 });
            }
        } else if (coordinates.direction === "west") {
            if (coordinates.x > 0) {
                setCoordinates({ ...coordinates, x: Number(coordinates.x) - 1 });
            }
        }
    };

    const isRobotWithinGrid = () => {
        if (
            (coordinates.y === 4 && coordinates.direction == "north") ||
            (coordinates.y === 0 && coordinates.direction === "south") ||
            (coordinates.x === 0 && coordinates.direction === "west") ||
            (coordinates.x === 4 && coordinates.direction === "east")
        ) {
            return false;
        }

        return true;
    };

    return (
        <Container sx={{ mt: 8, ml: 4 }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
                {/* Displays the 5x5 grid */}
                <Box gridColumn="span 6">
                    <Box sx={{ display: "flex" }}>
                        <Box sx={GridStyle}>
                            {coordinates.x === 0 && coordinates.y === 4 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 1 && coordinates.y === 4 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 2 && coordinates.y === 4 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 3 && coordinates.y === 4 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 4 && coordinates.y === 4 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Typography variant="subtitle2" gutterBottom sx={{ ml: -2, mt: -4 }}>
                            x:4, y:4
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={GridStyle}>
                            {coordinates.x === 0 && coordinates.y === 3 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 1 && coordinates.y === 3 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 2 && coordinates.y === 3 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 3 && coordinates.y === 3 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 4 && coordinates.y === 3 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={GridStyle}>
                            {coordinates.x === 0 && coordinates.y === 2 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 1 && coordinates.y === 2 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 2 && coordinates.y === 2 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 3 && coordinates.y === 2 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 4 && coordinates.y === 2 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={GridStyle}>
                            {coordinates.x === 0 && coordinates.y === 1 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 1 && coordinates.y === 1 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 2 && coordinates.y === 1 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 3 && coordinates.y === 1 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 4 && coordinates.y === 1 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={GridStyle}>
                            {coordinates.x === 0 && coordinates.y === 0 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 1 && coordinates.y === 0 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 2 && coordinates.y === 0 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 3 && coordinates.y === 0 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                        <Box sx={GridStyle}>
                            {coordinates.x === 4 && coordinates.y === 0 && showRobot && (
                                <Robot direction={coordinates.direction} />
                            )}
                        </Box>
                    </Box>
                </Box>
                {/* Display the input boxes and buttons */}
                <Box
                    gridColumn="span 6"
                    sx={{
                        display: "flex",
                        alignItems: "end",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2,
                        mr: 8,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                        }}
                    >
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 1, width: "15ch" },
                            }}
                            autoComplete="off"
                        >
                            <TextField
                                id="xCoordinate"
                                type="number"
                                label="X Coordinate"
                                variant="outlined"
                                sx={{ height: "50px" }}
                                inputProps={{
                                    inputMode: "numeric",
                                    max: 4,
                                    min: 0,
                                }}
                                error={showXCoordinateErrorMessage}
                                helperText={showXCoordinateErrorMessage && "Enter a value between 0 - 4"}
                                value={xCoordinate}
                                onChange={(event) => {
                                    setXCoordinate(event.target.value);
                                }}
                            />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 1, width: "15ch" },
                            }}
                            autoComplete="off"
                        >
                            <TextField
                                id="yCoordinate"
                                type="number"
                                label="Y Coordinate"
                                variant="outlined"
                                sx={{ height: "50px" }}
                                error={showYCoordinateErrorMessage}
                                helperText={showYCoordinateErrorMessage && "Enter a value between 0 - 4"}
                                inputProps={{
                                    inputMode: "numeric",
                                    max: 4,
                                    min: 0,
                                }}
                                value={yCoordinate}
                                onChange={(event) => {
                                    setYCoordinate(event.target.value);
                                }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="direction-label">Direction</InputLabel>
                                <Select
                                    labelId="robotDirection-label"
                                    id="robotDirection"
                                    value={robotDirection}
                                    label="Direction"
                                    onChange={handleRobotDirection}
                                    data-testid="robotDirection"
                                >
                                    <MenuItem value={"north"}>North</MenuItem>
                                    <MenuItem value={"south"}>South</MenuItem>
                                    <MenuItem value={"east"}>East</MenuItem>
                                    <MenuItem value={"west"}>West</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Button
                        sx={[defaultButtonStyle]}
                        variant="contained"
                        color="success"
                        onClick={() => {
                            handleRobotPlacement();
                        }}
                    >
                        PLACE
                    </Button>
                    <Button
                        sx={defaultButtonStyle}
                        variant="contained"
                        disabled={!showRobot || !isRobotWithinGrid()}
                        onClick={handleRobotMovement}
                    >
                        MOVE
                    </Button>
                    <Button
                        sx={defaultButtonStyle}
                        variant="contained"
                        onClick={() => handleDirection("left")}
                        disabled={!showRobot}
                    >
                        LEFT
                    </Button>
                    <Button
                        sx={defaultButtonStyle}
                        variant="contained"
                        onClick={() => handleDirection("right")}
                        disabled={!showRobot}
                    >
                        RIGHT
                    </Button>
                    <Button
                        sx={defaultButtonStyle}
                        variant="contained"
                        color="secondary"
                        disabled={!showRobot}
                        onClick={() => setReportCoordinates(true)}
                    >
                        REPORT
                    </Button>
                    {reportCoordinates && (
                        <Typography variant="subtitle2">{`X: ${coordinates.x}, Y: ${
                            coordinates.y
                        }, F: ${coordinates.direction.toUpperCase()}`}</Typography>
                    )}
                </Box>
            </Box>
            {/* Display the x,y,F values */}
            <Typography variant="subtitle2" sx={{ mt: 2, ml: -3 }}>
                x:0, y:0
            </Typography>
        </Container>
    );
};

export default Grid;

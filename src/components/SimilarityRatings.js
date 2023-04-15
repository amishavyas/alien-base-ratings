import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, LinearProgress } from "@mui/material";
import { StyledButton, StyledSlider } from "../StyledElements";
import styled from "styled-components";

const Img = styled.img`
    height: 350px;
    width: 250px;
    padding: 15px;
`;

function SimilarityRatings({
    label,
    stimOrder,
    nextPage,
    responses,
    setResponses,
}) {
    const [trialNum, setTrialNum] = useState(0);
    const [currStim, setCurrStim] = useState([]);
    const [RT, setRT] = useState(0);
    const [slider, setSlider] = useState({
        value: -50,
        moved: false,
    });

    const setTrial = () => {
        /* Resetting states (RT, new stim, slider values) for the new trial */
        setRT(Date.now());
        setSlider({ value: -50, moved: false });
        setCurrStim(["blank", "blank"]);
        setTimeout(() => {
            setCurrStim(stimOrder[trialNum]);
        }, 500);
    };

    const nextTrial = () => {
        /*
            Record responses and move to the next trial only if the ratings slider has been moved
            If not, display an alert 
        */
        if (slider.moved) {
            setResponses({
                ...responses,
                [label]: [
                    ...responses[label],
                    {
                        trial: trialNum,
                        stim: currStim,
                        rating: slider.value,
                        RT: Date.now() - RT,
                    },
                ],
            });
            setTrialNum(trialNum + 1);
        } else {
            alert(
                "Please move the slider from its default position to continue, even if your response is 0."
            );
        }
    };

    const handleSlider = (_, newValue) => {
        /* 
            Record new slider value and that it has been interacted with
            Users cannot proceed to the next trial without moving the slider
            from its default position 
        */
        setSlider({ value: newValue, moved: true });
    };

    useEffect(() => {
        /* Runs only when trialNum updates */
        if (trialNum === stimOrder.length) {
            nextPage();
        } else {
            setTrial();
        }
    }, [trialNum]);

    return (
        <div>
            <LinearProgress
                variant="determinate"
                value={(trialNum / stimOrder.length) * 100}
                sx={{
                    height: 10,
                    backgroundColor: `#c7d1bc`,
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: `#165806`,
                    },
                }}
            />
            <Typography
                align="center"
                fontSize="23px"
                padding="1%"
                marginTop="20px"
            >
                <strong>
                    Using the slider below, please indicate how similar you
                    think the aliens are.
                </strong>
            </Typography>
            <Container component="main" maxWidth="md" align="center">
                <Grid container direction="row" justifyContent="center">
                    <Img
                        src={`http://scraplab.org/alien_test/images/${currStim[0]}`}
                    />
                    <Img
                        src={`http://scraplab.org/alien_test/images/${currStim[1]}`}
                    />
                </Grid>
                <StyledSlider
                    value={slider.value}
                    valueLabelDisplay="auto"
                    onChange={handleSlider}
                    min={-50}
                    max={50}
                    style={{ marginTop: "20px" }}
                />
                <Typography
                    style={{
                        fontSize: "20px",
                        paddingTop: "1%",
                    }}
                >
                    <span style={{ float: "left" }}>Very Different</span>
                    <span style={{ float: "right" }}>Very Similar</span>
                </Typography>
                <StyledButton handleClick={nextTrial} text="Next" />
            </Container>
        </div>
    );
}

export default SimilarityRatings;

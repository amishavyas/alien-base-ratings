import React, { useState, useEffect } from "react";
import { Container, Typography, LinearProgress } from "@mui/material";
import { StyledButton, StyledSlider } from "../StyledElements";
import styled from "styled-components";

const Img = styled.img`
    height: 400px;
    width: 300px;
    display: block;
    margin: auto;
`;

function Ratings({ imgOrder, label, dimensions, nextPage, responses, setResponses }) {
    
    const [currImg, setCurrImg] = useState(imgOrder[0]);
    const [trialNum, setTrialNum] = useState(0);
    const [dimNum, setDimNum] = useState(0);
    const [currDim, setCurrDim] = useState(Object.keys(dimensions)[dimNum]); 
    const [RT, setRT] = useState(0);
    const [slider, setSlider] = useState({
        value: 0,
        moved: false,
    });

    const setTrial = () => {
        /* Resetting states (RT, new stim, slider values) for the new trial */
        setRT(Date.now());
        setSlider({ value: 0, moved: false });
    };

    const handleDim = () => {
        if (dimNum == 2) {
            setDimNum(0); 
            setCurrImg(imgOrder[imgOrder.indexOf(currImg) + 1]);
        }
        else {
            setDimNum(dimNum + 1);
        }
    }

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
                        dimension: currDim,
                        img: currImg,
                        rating: slider.value,
                        RT: Date.now() - RT,
                    },
                ],
            });
            setTrialNum(trialNum + 1);
            handleDim(); 
            
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
        /* Runs only when currImg updates */
        if (trialNum === (imgOrder.length * Object.keys(dimensions).length)) {
            nextPage();
        } else {
            setTrial();
        }
    }, [trialNum]);

    useEffect(() => {
        /* Runs only when dimNum updates */
        setCurrDim(Object.keys(dimensions)[dimNum]);
    }, [dimNum]);

    return (
        <div>
            <LinearProgress
                variant="determinate"
                value={(trialNum / 12) * 100}
                sx={{
                    height: 10,
                    backgroundColor: `#c7d1bc`,
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: `#165806`,
                    },
                }}
            />
            
            <Container component="main" maxWidth="lg" align="center">
                <Typography fontSize="25px" padding="2%" align="center">
                    {dimensions[currDim].prompt}
                </Typography>
                <Img src={`../../images/${currImg}.png`} />
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
                        color: "rgb(33,37,40)",
                        textAlign: "left",
                        fontSize: "25px",
                        paddingTop: "1%",
                    }}
                    component="h4"
                    variant="h5"
                >
                    <strong>
                        <span style={{ float: "left" }}>{dimensions[currDim].scale[0]}</span>
                        <span style={{ float: "right" }}>{dimensions[currDim].scale[1]}</span>
                    </strong>
                </Typography>
                <StyledButton handleClick={nextTrial} text="Next" />
            </Container>
        </div>
    );
}

export default Ratings;

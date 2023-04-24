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

function Ratings({
    imgOrder,
    label,
    dimensions,
    nextPage,
    responses,
    setResponses,
}) {
    const [showInstructions, setShowInstructions] = useState(true); 
    const [randomizedImages] = useState([...imgOrder]);
    const [dimKeys] = useState(Object.keys(dimensions));
    const [dimNum, setDimNum] = useState(0);
    const [currImg, setCurrImg] = useState("");
    const [trialNum, setTrialNum] = useState(0);
    const [currDim, setCurrDim] = useState(dimKeys[dimNum]);
    const [RT, setRT] = useState(0);
    const [slider, setSlider] = useState({
        value: -50,
        moved: false,
    });

    const setTrial = () => {
        /* Resetting states (RT, new stim, slider values) for the new trial */
        setRT(Date.now());
        setSlider({ value: -50, moved: false });
    };

    const delayedStimDisplay = (imgIndex) => {
        /* Display blank image for 500 ms before displaying stim */
        setCurrImg("blank.png");
        setTimeout(() => {
            setCurrImg(randomizedImages[imgIndex]);
        }, 500);
    };

    const setRandomizedImages = () => {
        randomizedImages.sort(() => Math.random() - 0.5);
        delayedStimDisplay(0);
    };

    const handleDim = () => {
        /* Move to next dimension after all trials for the given dim are done */ 
        if (trialNum % imgOrder.length === 0 && trialNum !== 0) {
            setRandomizedImages();
            setDimNum(dimNum + 1);
        } else {
            delayedStimDisplay(randomizedImages.indexOf(currImg) + 1);
        }
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
                        dimension: currDim,
                        img: currImg,
                        rating: slider.value,
                        RT: Date.now() - RT,
                    },
                ],
            });
            window.scrollTo(0, 0);
            setTrialNum(trialNum + 1);
        } else {
            alert(
                "Please enter your response by clicking on the slider to continue."
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
        /*  Runs only when trialNum updates. 
            Check if new dimension needs to be displayed.
            Move to demo survey if all trials are over. */
        handleDim();
        if (trialNum === imgOrder.length * dimKeys.length) {
            nextPage();
        } else {
            setTrial();
        }
    }, [trialNum]);

    useEffect(() => {
        /*  Runs only when dimNum updates.
            If new dimension is ready to start, show instructions. */
        setCurrDim(dimKeys[dimNum]);
        setShowInstructions(true); 
    }, [dimNum]);

    useEffect(() => {
        /* When component loads, randomize stim order & order in which dimensions will appear */
        setRandomizedImages();
        dimKeys.sort(() => Math.random() - 0.5);
        setCurrDim(dimKeys[dimNum]);
    }, []);

    const displayTrialContent = () => {
        if (!showInstructions) {
            return (
                <Container component="main" maxWidth="xl" align="center">
                    <Typography fontSize="23px" padding="2%" align="center">
                        {dimensions[currDim].prompt[0]}
                    </Typography>
                    <Img src={`./images/${currImg}`} />
                    <Container maxWidth="md" align="center">
                        <br />

                        <StyledSlider
                            value={slider.value}
                            valueLabelDisplay="auto"
                            onChange={handleSlider}
                            min={-50}
                            max={50}
                            style={{ marginTop: "20px" }}
                        />

                        <Typography fontSize="20px">
                            <span style={{ float: "left" }}>
                                {dimensions[currDim].scale[0]}
                            </span>
                            <span style={{ float: "right" }}>
                                {dimensions[currDim].scale[1]}
                            </span>
                        </Typography>
                    </Container>
                    <StyledButton handleClick={nextTrial} text="Next" />
                </Container>
            );
        }
        else {
            return (
                <>
                    <Container maxWidth="lg" align="center">
                        <Typography fontSize="20px" align="center">
                            <br />
                            <br />
                            You will now rate the aliens on their{" "}
                            <strong> {currDim}</strong>. Please read the description below carefully.
                            <br />
                            <br />
                            {dimensions[currDim].prompt[1]}
                            <br />
                            <br />
                            Press the button below to begin trials.
                        </Typography>
                        <StyledButton
                            handleClick={() => setShowInstructions(false)}
                            text="Next"
                        />
                    </Container>
                </>
            );
        }
    }

    return (
        <div>
            <LinearProgress
                variant="determinate"
                value={(trialNum / (imgOrder.length * 3)) * 100}
                sx={{
                    height: 10,
                    backgroundColor: `#c7d1bc`,
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: `#165806`,
                    },
                }}
            />
            {displayTrialContent()}
        </div>
    );
}

export default Ratings;

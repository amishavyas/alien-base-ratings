import React from "react";
import { Container, Typography } from "@mui/material";
import { StyledButton, Title } from "../StyledElements";
import styled from "styled-components";

const Img = styled.img`
    height: 300px;
    width: 200px;
    margin-left: 30px;
    margin-right: 30px;
`;

function Instructions({ page, nextPage }) {
    const displayInstructions = (page) => {
        switch (page) {
            case 2:
                return (
                    <Typography fontSize="22px">
                        <br />
                        Welcome to the experiment!
                        <br />
                        <br />
                        In this experiment, you will play the role of an
                        intrepid alien psychologist. Err... that's a
                        psychologist <strong>of</strong> aliens, not a
                        psychologist who happens to be one. You get it, right?
                        Great!
                        <br />
                        <br />
                        As an alien psychologist, you are part of a team of
                        explorers and scientists that are being sent to survey a
                        new planet. A small advance team was sent ahead of you
                        to lay the groundwork for the main expedition. They
                        reported that the planet that you will soon be arriving
                        at is populated by multiple, curious species of alien
                        animals.
                        <br />
                        <br />
                        Understanding what the creature is thinking and feeling
                        will help keep the expedition members safe as they
                        explore the rest of the planet. Your research may also
                        help you avoid inadvertently harming the aliens as you
                        and the others continue to explore. Who knows - you may
                        even be able to make friends with them.
                    </Typography>
                );
            case 3:
                return (
                    <Typography fontSize="22px">
                        <br />
                        Your expedition team aims to study how different species
                        interact with each other and behave individually.
                        <br /> <br />
                        You haven’t quite reached the planet yet, but your
                        colleagues in the advance team sent along some photos of
                        the aliens. They want to hear your first impressions
                        about these creatures. Specifically, they are interested
                        in which alien species you think are more similar to
                        each other, and which ones you think are more different.
                        <br /> <br />
                        <strong>
                            Using your finely honed xenopsychologist’s
                            intuitions, examine how the creatures look in the
                            photos you are about to see, and rate how similar
                            you think they are to each other.
                        </strong>
                    </Typography>
                );
            case 5:
                return (
                    <Typography fontSize="22px">
                        <br />
                        You have finished rating all pairs of alien species on
                        their similarity! <br />
                        Now that the advance team has your appraisal of how
                        similar the aliens are to each other, they want to learn
                        more about which traits you think the aliens might have.
                        <br /> <br />
                        For example, one alien might be more intelligent and
                        others might be less so. The advance team realizes it
                        may be hard to judge these complex traits from
                        appearance alone, but for now they just want your best
                        guess.
                        <br /> <br />
                        <strong>
                            In the following trials, please rate the aliens on
                            the different traits shown on the screen.
                        </strong>
                    </Typography>
                );
            case 7:
                return (
                    <Typography fontSize="22px">
                        <br />
                        You have finished rating all alien species on their
                        traits! The final ingredient to learn how an alien
                        species behaves is to understand the mental states they
                        tend to experience. Mental states refer to how an alien
                        is feeling at the moment.
                        <br /> <br />
                        For example, one alien may tend to experience happiness
                        more than others. As in the previous task, please use
                        your expert intuition to provide your best guess about
                        the alien's state.
                        <br /> <br />
                        <strong>
                            In the following trials, please rate the aliens on
                            the different states shown on the screen.
                        </strong>
                    </Typography>
                );
        }
    };
    return (
        <div>
            <Container component="main" maxWidth="md" align="center">
                <Title text="INSTRUCTIONS" />
                {displayInstructions(page)}
                <StyledButton handleClick={nextPage} text="CONTINUE" />
            </Container>
        </div>
    );
}

export default Instructions;

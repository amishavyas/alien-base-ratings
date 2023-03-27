import React, { useState, useEffect } from "react";
import Consent from "./Consent";
import DemoSurvey from "./DemoSurvey";
import Ratings from "./Ratings";
import SimilarityRatings from "./SimilarityRatings";
import Debrief from "./Debrief";

function Experiment() {
    const [page, setPage] = useState(1);
    const [responses, setResponses] = useState({
        trait: [],
        state: [],
        similarity: [],
    });
    const imgOrder = ["alien_1_v1", "alien_1_v2", "alien_2_v1", "alien_2_v2"];
    const [stimOrder, setStimOrder] = useState([]);
    const trait = {
        power: {
            scale: ["Very Powerless", "Very Powerful"],
            prompt: [
                "Powerful people tend to be in control of any situation, influence what others think and do, and are seen as dominant, conscientious, and agentic by other people. Powerless people are rarely in control of their situation, have little influence over others, and are seen as subordinates or followers.",
                <br />,
                <strong>Using the slider below, rate the alien on its power.</strong>,
            ],
        },
        sociality: {
            scale: ["Very Nonsocial", "Very Social"],
            prompt: [
                "Social people are extraverted, feel positively about their social position, are confident when leading or addressing groups of people, and enjoy and feel energized by social gatherings and interactions. Nonsocial people are introverted, consider themselves unpopular, feel awkward when they are the center of social attention, and are indifferent to social activities or feel drained by participating in them.",
                <br />,
                <strong>Using the slider below, rate the alien on its sociality.</strong>,
            ],
        },
        valence: {
            scale: ["Very Negative", "Very Positive"],
            prompt: [
                "Positive people are kind to others, tend to get along well with people, and are perceived to be trustworthy, open-minded, and emotionally stable. Negative people may be cold towards others and rarely get along well with people; they are perceived as dishonest, close-minded, and neurotic.",
                <br />,
                <strong>Using the slider below, rate the alien on its positivity /. </strong>,
            ],
        },
    };
    const state = {
        rationality: {
            scale: ["Very Emotional", "Very Rational"],
            prompt: [
                "Low rationality (or high emotionality) refers to states of feeling and emotional states (ex. happiness, sorrow). High rationality refers to states related to making decision or inferences, or thinking in orderly, rational ways (ex. reason, planning).",
                <br />,
                <strong>
                    Using the slider below, rate the alien on its rationality.
                </strong>,
            ],
        },
        impact: {
            scale: ["Low Social Impact", "High Social Impact"],
            prompt: [
                "Low social impact refers to states that are NOT likely to affect anybody beyond the person experiencing the state, because they are not at all intense or a type of state not directed towards other people (ex. tiredness, boredom). High social impact refers to states that are likely to affect people beyond the person experiencing the state, because they are very intense or a type of state inherently directed towards other people (ex. excitement, outrage).",
                <br />,
                <strong>
                    Using the slider below, rate the alien on its social impact.
                </strong>,
            ],
        },
        valence: {
            scale: ["Very Negative", "Very Positive"],
            prompt: [
                "Negative states refer to disagreeable or unpleasant states (ex. distress, terror). Positive states refer to agreeable or pleasant states (ex. affection, pleasure).",
                <br />,
                <strong>
                    Using the slider below, rate the alien on its positivity /
                    negativity.
                </strong>,
            ],
        },
    };
    const [demoData, setDemoData] = useState({
        age: "",
        education: "",
        gender: "",
        sex: "",
        ethnicity: "",
        race: [],
    });

    const nextPage = () => setPage(page + 1);

    useEffect(() => {
        /* Runs when component mounts */
        console.log(Object.keys(trait)[0]);
        setStimOrder(getPairwiseCombos(imgOrder));
    }, []);

    const getPairwiseCombos = (stimList) => {
        if (stimList.length < 2) {
            return [];
        }
        var first = stimList[0],
            rest = stimList.slice(1),
            pairs = rest.map(function (x) {
                return [first, x];
            });
        return pairs.concat(getPairwiseCombos(rest));
    };

    const conditionalComponent = () => {
        switch (page) {
            case 1:
                return <Consent nextPage={nextPage} />;
            case 2:
                return (
                    <SimilarityRatings
                        nextPage={nextPage}
                        responses={responses}
                        label="similarity"
                        setResponses={setResponses}
                        stimOrder={stimOrder}
                    />
                );
            case 3:
                return (
                    <Ratings
                        nextPage={nextPage}
                        responses={responses}
                        label="trait"
                        key="trait"
                        setResponses={setResponses}
                        dimensions={trait}
                        imgOrder={imgOrder}
                    />
                );
            case 4:
                return (
                    <Ratings
                        nextPage={nextPage}
                        responses={responses}
                        label="state"
                        key="state"
                        setResponses={setResponses}
                        dimensions={state}
                        imgOrder={imgOrder}
                    />
                );
            case 5:
                return (
                    <DemoSurvey
                        nextPage={nextPage}
                        demoData={demoData}
                        setDemoData={setDemoData}
                    />
                );
            case 6:
                return <Debrief />;
            default:
        }
    };

    return <div>{conditionalComponent()}</div>;
}

export default Experiment;

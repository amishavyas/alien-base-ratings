import React, { useState, useEffect } from "react";
import Consent from "./Consent";
import DemoSurvey from "./DemoSurvey";
import Instructions from "./Instructions";
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
    const [similarityStimOrder, setStimOrder] = useState([]);

    const trait = {
        power: {
            scale: ["Very Powerless", "Very Powerful"],
            prompt: [
                <strong>
                    Using the slider below, please indicate how powerful or
                    powerless you think this alien species is.
                </strong>,
                "Powerful aliens tend to be in control of any situation, influence what others think and do, and are seen as intelligent, conscientious, and dominant by other aliens. Powerless aliens are rarely in control of their situation, have little influence over others, and are seen as subordinates or followers.",
            ],
        },
        sociality: {
            scale: ["Very Nonsocial", "Very Social"],
            prompt: [
                <strong>
                    Using the slider below, please indicate how social or
                    nonsocial you think this alien species is.
                </strong>,
                "Social aliens are extraverted, feel positively about their social position, are confident when leading or addressing groups of aliens, and enjoy and feel energized by social gatherings and interactions. Nonsocial aliens are introverted, consider themselves unpopular, feel awkward when they are the center of social attention, and are indifferent to social activities or feel drained by participating in them.",
            ],
        },
        valence: {
            scale: ["Very Negative", "Very Positive"],
            prompt: [
                <strong>
                    Using the slider below, please indicate how positive or
                    negative you think this alien species is.
                </strong>,
                "Positive aliens are kind to others, tend to get along well with aliens, and are perceived to be trustworthy, warm, open-minded, and emotionally stable. Negative aliens may be cold towards others and rarely get along well with aliens; they are perceived as dishonest, hostile, close-minded, and neurotic.",
            ],
        },
    };
    const state = {
        rationality: {
            scale: ["Very Emotional", "Very Rational"],
            prompt: [
                <strong>
                    Using the slider below, please indicate how rational or
                    emotional you think this alien species' states are.
                </strong>,
                "Low rationality (or high emotionality) refers to states of feeling and emotional states (ex. happiness, sorrow). High rationality refers to states related to making decisions or inferences, or thinking in orderly, rational ways (ex. reason, planning).",
            ],
        },
        impact: {
            scale: ["Low Social Impact", "High Social Impact"],
            prompt: [
                <strong>
                    Using the slider below, please indicate the social impact of
                    this alien species' states are.
                </strong>,
                "Low social impact refers to states that are NOT likely to affect anybody beyond the alien experiencing the state, because they are not at all intense or a type of state not directed towards other aliens (ex. tiredness, boredom). High social impact refers to states that are likely to affect aliens beyond the alien experiencing the state, because they are very intense or a type of state inherently directed towards other aliens (ex. excitement, outrage).",
            ],
        },
        valence: {
            scale: ["Very Negative", "Very Positive"],
            prompt: [
                <strong>
                    Using the slider below, please indicate how positive or
                    negative you think this alien species' states are.
                </strong>,
                "Negative states refer to disagreeable or unpleasant states (ex. distress, terror). Positive states refer to agreeable or pleasant states (ex. affection, pleasure).",
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

    const nextPage = () => {
        window.scrollTo(0, 0);
        setPage(page + 1);
    };

    async function preloader(){
        /* Create new Video object for each video. Forces the browser to load all videos. */
        imgOrder.forEach((media) => {
            var img = document.createElement("img");
            img.setAttribute(
                "src",
                "http://scraplab.org/alien_test/images/" + media + ".png"
            );
        });
    }

    useEffect(() => {
        /* Runs when component mounts */
        setStimOrder(getPairwiseCombos(imgOrder));
        preloader(); 
    }, []);

    const randomizeSimilarityStim = (stimList) => {
        /* Shuffle trials */
        stimList.sort(() => Math.random() - 0.5);

        /* Shuffle mental state words within a trial */
        for (var trialN = 0; trialN < stimList.length; trialN++) {
            stimList[trialN].sort(() => Math.random() - 0.5);
        }
        return stimList;
    };

    const getPairwiseCombos = (stimList) => {
        if (stimList.length < 2) {
            return [];
        }
        var first = stimList[0],
            rest = stimList.slice(1),
            pairs = rest.map(function (x) {
                return [first, x];
            });
        return randomizeSimilarityStim(pairs.concat(getPairwiseCombos(rest)));
    };

    const conditionalComponent = () => {
        switch (page) {
            case 1:
                return <Consent nextPage={nextPage} />;
            case 2:
                return <Instructions nextPage={nextPage} page={page} />;
            case 3:
                return <Instructions nextPage={nextPage} page={page} />;
            case 4:
                return (
                    <SimilarityRatings
                        nextPage={nextPage}
                        responses={responses}
                        label="similarity"
                        setResponses={setResponses}
                        stimOrder={similarityStimOrder}
                    />
                );
            case 5:
                return <Instructions nextPage={nextPage} page={page} />;
            case 6:
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
            case 7:
                return <Instructions nextPage={nextPage} page={page} />;
            case 8:
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
            case 9:
                return (
                    <DemoSurvey
                        nextPage={nextPage}
                        demoData={demoData}
                        setDemoData={setDemoData}
                    />
                );
            case 10:
                return <Debrief />;
            default:
        }
    };

    return <div>{conditionalComponent()}</div>;
}

export default Experiment;

import { useState, useEffect } from "react";

export function useQuizEngine(quiz) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState({});
    const [completed, setCompleted] = useState(false);
    const [result, setResult] = useState(null);

    const selectAnswer = (answer) => {
        setScores((prev) => {
            const updatedScores = {
                ...prev,
                [answer.style]: (prev[answer.style] || 0) + (answer.points || 0),
            };
            console.log("Updated Scores:", updatedScores);
            return updatedScores;
        });

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCompleted(true);
        }
    };

    useEffect(() => {
        if (quiz) {
            setCurrentQuestionIndex(0);
            setScores(() => {
                if (quiz.type === "style-based") {
                    const initialScores = {};
                    Object.keys(quiz.outcomes).forEach((key) => {
                        initialScores[key] = 0;
                    });
                    return initialScores;
                }
                if (quiz.type === "points-based") {
                    return { points: 0 }; // Default points tracker
                }
                return {};
            });
            setCompleted(false);
            setResult(null);
            console.log("State reset for new quiz:", quiz.title);
        }
    }, [quiz]);
    
    useEffect(() => {
        if (completed) {
            const calculateResult = () => {
                console.log("Calculating Result...");
                console.log("Scores:", scores);
                console.log("Quiz Type:", quiz.type);
            
                if (!quiz || !quiz.outcomes) {
                    return null;
                }
            
                if (quiz.type === "style-based") {
                    // Handle style-based quizzes (e.g., Love Language Quiz)
                    const topCategory = Object.entries(scores).reduce(
                        (max, entry) => (entry[1] > max[1] ? entry : max),
                        ["", 0]
                    )[0];
            
                    const resultData = quiz.outcomes[topCategory];
                    if (!resultData) {
                        console.error("No result found for category:", topCategory);
                        return null;
                    }
            
                    return {
                        category: topCategory,
                        description: resultData.description,
                        feedback: {
                            idealPartnerTraits: resultData.idealPartnerTraits,
                            suggestions: resultData.suggestionsForPartner,
                            recommendations: resultData.recommendations,
                        },
                    };
                } else if (quiz.type === "points-based") {
                    // Handle points-based quizzes (e.g., Emotional Intimacy Quiz)
                    const totalPoints = Object.values(scores).reduce((sum, points) => sum + points, 0);
            
                    const resultData = Object.entries(quiz.outcomes).find(([_, outcome]) => {
                        const range = outcome.range || [0, Infinity];
                        return totalPoints >= range[0] && totalPoints <= range[1];
                    });
            
                    if (!resultData) {
                        console.error("No result found for total points:", totalPoints);
                        return null;
                    }
            
                    const [category, outcome] = resultData;
                    return {
                        category,
                        description: outcome.description,
                        feedback: {
                            idealPartnerTraits: outcome.idealPartnerTraits,
                            suggestions: outcome.suggestionsForPartner,
                            recommendations: outcome.recommendations,
                        },
                    };
                }
            
                console.error("Unsupported quiz type:", quiz.type);
                return null;
            };
            

            setResult(calculateResult());
        }
    }, [completed, scores, quiz]);

    return {
        currentQuestion: quiz?.questions[currentQuestionIndex],
        currentQuestionIndex,
        totalQuestions: quiz?.questions.length || 0,
        completed,
        result,
        selectAnswer,
    };
}

import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { Text, View, TouchableOpacity, FlatList, StyleSheet, SafeAreaView,ScrollView } from "react-native";
import QuizList from "../../../quizzes/loveLanguage"; // Import your quiz data
import { useQuizEngine } from "../../../hooks/useQuizEngine"; // Use the reusable quiz hook

export default function QuizItem() {
    const { id } = useGlobalSearchParams(); // Get the quiz id
    const quiz = QuizList[id]; // Fetch the quiz data based on id

    const {
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        completed,
        result,
        selectAnswer,
    } = useQuizEngine(quiz);

    if (!quiz) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Quiz not found!</Text>
            </SafeAreaView>
        );
    }

    if (completed && result) {
        return (
          

            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Your Result</Text>
                    <View style={styles.resultCard}>
                        <Text style={styles.resultText}>{result.category}</Text>
                        <Text style={styles.descriptionText}>{result.description}</Text>
            
                        <Text style={styles.subheading}>Ideal Partner Traits</Text>
                        <Text style={styles.text}>{result.feedback.idealPartnerTraits}</Text>
            
                        <Text style={styles.subheading}>Suggestions for Your Partner</Text>
                        <FlatList
                            data={result.feedback.suggestions}
                            keyExtractor={(item, index) => `suggestion-${index}`}
                            renderItem={({ item }) => <Text style={styles.text}>- {item}</Text>}
                            scrollEnabled={false} // Prevent nested scrolling
                        />
            
                        <Text style={styles.subheading}>Recommendations</Text>
                        <FlatList
                            data={result.feedback.recommendations}
                            keyExtractor={(item, index) => `recommendation-${index}`}
                            renderItem={({ item }) => <Text style={styles.text}>- {item}</Text>}
                            scrollEnabled={false} // Prevent nested scrolling
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{quiz.title}</Text>

            <View style={styles.questionCard}>
                <Text style={styles.questionText}>
                    {currentQuestionIndex + 1}. {currentQuestion.question}
                </Text>
                <FlatList
                    data={currentQuestion.answers}
                    keyExtractor={(item, index) => `answer-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.answerButton}
                            onPress={() => selectAnswer(item)}
                        >
                            <Text style={styles.answerText}>{item.text}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <Text style={styles.progressText}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
            </Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1C1C1E", // Dark background
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        padding: 20
    },
    scrollContainer: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#E3B9BC", // Accent color for title
        textAlign: "center",
        marginBottom: 30,
    },
    questionCard: {
        width: "90%",
        backgroundColor: "#2C2C2E", // Slightly lighter dark for contrast
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 20,
    },
    questionText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff", // White text
        marginBottom: 20,
        textAlign: "center",
    },
    answerButton: {
        width: "100%",
        backgroundColor: "#3A3A3C", // Button background
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    answerText: {
        fontSize: 18,
        color: "#E3B9BC", // Accent color for text
        textAlign: "center",
    },
    progressText: {
        fontSize: 18,
        color: "#B3B3B3", // Subtle color for progress text
        marginTop: 20,
        textAlign: "center",
    },
    resultCard: {
        width: "90%",
        backgroundColor: "#2C2C2E", // Result card background
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    resultText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#E3B9BC", // Accent color for result text
        marginBottom: 10,
        textAlign: "center",
    },
    descriptionText: {
        fontSize: 18,
        lineHeight:30,
        color: "#fff", // White text for description
        textAlign: "center",
    },
    subheading: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#E3B9BC", // Accent color for subheadings
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
    },
    text: {
        fontSize: 18,
        lineHeight:30,
        color: "#fff", // White text for feedback
        textAlign: "center",
        marginBottom: 5,
    },
    errorText: {
        fontSize: 18,
        color: "#FF5A5F", // Red error text
        textAlign: "center",
    },
});

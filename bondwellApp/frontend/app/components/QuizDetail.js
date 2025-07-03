import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import QuizList from "../quizzes/loveLanguage.json";

export default function QuizDetail({ route, handleResults }) {
    const { quizKey } = route.params; // Get the selected quiz key
    const quiz = QuizList[quizKey]; // Access the quiz object from JSON

    const handleAnswerSelection = (questionIndex, answer) => {
        // Custom logic to handle answer selection
        console.log(`Question ${questionIndex + 1}: Selected answer`, answer);

        // Call the callback with the selected answer
        if (handleResults) {
            handleResults(questionIndex, answer);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{quiz.title}</Text>
            <FlatList
                data={quiz.questions}
                keyExtractor={(item, index) => `question-${index}`}
                renderItem={({ item, index }) => (
                    <View style={styles.questionCard}>
                        <Text style={styles.questionText}>
                            {index + 1}. {item.question}
                        </Text>
                        <FlatList
                            data={item.answers}
                            keyExtractor={(answer, idx) => `answer-${index}-${idx}`}
                            renderItem={({ item: answer }) => (
                                <TouchableOpacity
                                    style={styles.answerButton}
                                    onPress={() => handleAnswerSelection(index, answer)}
                                >
                                    <Text style={styles.answerText}>{answer.text}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    questionCard: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    questionText: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
    },
    answerButton: {
        padding: 10,
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        marginBottom: 5,
    },
    answerText: {
        fontSize: 14,
        color: "#555",
    },
});

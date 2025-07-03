import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import QuizList from "../quizzes/loveLanguage.json";

export default function Quizzes() {
    const quizzes = Object.keys(QuizList).map((quizKey) => ({
        key: quizKey,
        title: QuizList[quizKey].title,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select a Quiz</Text>
            <FlatList
                data={quizzes}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <Link href={`/quizzes/quizdetail/${item.key}`} asChild>
                        <TouchableOpacity style={styles.quizLink}>
                            <Text style={styles.quizTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        backgroundColor: "#1C1C1E", // Dark background
    
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#E3B9BC", // Accent color for header
        marginBottom: 30,
        textAlign: "center",
    },
    listContainer: {
        width: "100%", // Use the full width of the container
        alignItems: "center", // Center the items horizontally
    },
    quizLink: {
        width: "100%", // Make the container wider to fit longer text
        maxWidth: 600, // Optional: Limit maximum width for larger screens
        padding: 20,
        backgroundColor: "#2C2C2E", // Slightly lighter dark for links
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        alignItems: "center", // Center the content horizontally
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#E3B9BC", // Accent color for text
        textAlign: "center",
    },
});

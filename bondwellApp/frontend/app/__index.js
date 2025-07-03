import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import io from 'socket.io-client';
import Login from './login';
import Layout from './_layout';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [socket, setSocket] = useState(null);
  const [enterRoom, setEnterRoom] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [isNewResponse, setIsNewResponse] = useState(true);
  const [responder,setResonder] = useState({});

  const [userMessage,setUserMessage] = useState("")
  const [aiResponse,setAiResponse] = useState("")
  const [conversation,setConversation] = useState([])
  const [isDone,setIsDone] = useState(false)

  // https://bondwell-441003.appspot.com

  useEffect(() => {
    if(isDone){
      console.log("conversation is over")
      console.log(`user message: ${userMessage}`)
      setConversation((prev) => {
        console.log("previous convo")
        console.log(`user message ${userMessage}`)
        let user = {role:"user", content:userMessage}
        let ai = {role:"assistant",content:aiResponse}
        return [...prev,user,ai]
      })

      setAiResponse("")
      setUserMessage("")
    }
  },[isDone])

  useEffect(() => {
      console.log(`is new response ${isNewResponse}`)
  },[isNewResponse])

  // useEffect(() => {
  //   console.log(`the current message is ${currentMessage}`)
  // },[currentMessage])

  useEffect(() => {
    const newSocket = io('https://bondwell-441003.appspot.com', { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.on('message', (message) => { // message from AI
      setAiResponse((prev) => prev + message.content);
      setIsNewResponse(false)
      setIsTyping(true)
    });

    newSocket.on('done', () => {
      setIsNewResponse(true)
      setIsDone(true)


      // setConversation((prev) => {
      //   console.log("previous convo")
      //   console.log(`user message ${userMessage}`)
      //   let user = {role:"user", content:userMessage}
      //   let ai = {role:"assistant",content:aiResponse}
      //   console.log({...prev,...user,...ai})
      // })
      // finalizeCurrentMessage();
      // console.log(`The message is done and Completed`)
      setIsTyping(false);

    });

    newSocket.on('previousMessages', (previousMessages = []) => {
      const formattedMessages = previousMessages.map((msg) => ({
        text: msg.content,
        user: msg.role === 'user',
        fadeAnim: new Animated.Value(1),
      }));
      setMessages(formattedMessages);
    });

    return () => newSocket.disconnect();
  }, []);

  const finalizeCurrentMessage = () => {
    // if (currentMessage.trim()) {
    //   addMessageWithFade(currentMessage, false);
    //   setCurrentMessage('');
    //   setIsNewResponse(true); // Prepare fodr the next AI response
    // }
  };

  useEffect(() => {
    if (socket && enterRoom) {
      socket.emit('join', username);
    }
  }, [enterRoom, socket]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    const userMessage = {
      text: input,
      user: true,
      fadeAnim: new Animated.Value(1),
    };

    setUserMessage(userMessage.text)
    // setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsDone(false)
    socket.emit('message', input);
    setInput('');
  };

  useEffect(() => {
    if (isTyping) {
      const typingInterval = setInterval(() => {
        setTypingDots((prevDots) => (prevDots === '...' ? '' : prevDots + '.'));
      }, 500);

      return () => clearInterval(typingInterval);
    }
  }, [isTyping]);
  

  const addMessageWithFade = (text, isUser) => {
    // const fadeAnim = new Animated.Value(0);
    // const newMessage = { text, user: isUser, fadeAnim };
    // setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();
  };


  //login

  if (!enterRoom) {
    return (
      <Layout/>
      
      // <Login callback={(success, uname) => {
      //   setEnterRoom(success);
      //   setUsername(uname);
      // }}/>
    );
  }
  //end login
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.introText}>Hello {username}, I am Lisa Bondwell, your intimacy guide. new response {isNewResponse ? "true" : "false"}</Text>

      <ScrollView style={styles.messagesContainer}>

      {
        conversation.map(convo => {
           let msg = convo.content;
           let container = styles.aiMessageContainer;
           let messageStyle = styles.aiMessage

            if(convo.role === "user"){
              container =  styles.userMessageContainer
              messageStyle = styles.userMessage
            }

            return (
              <View key={Math.random() **9 } style={container}>
              <Text style={messageStyle}>
                {msg}
              </Text>
            </View>
            )
        })
      }

      {
        userMessage !== "" && 
      
        <View style={styles.userMessageContainer}>
          <Text style={styles.userMessage}>
            {userMessage}
          </Text>
        </View>
      }

      {isTyping && (
          <View style={styles.typingContainer}>
            <Text style={styles.typingText}>Lisa is typing{typingDots}</Text>
          </View>
        )}
        {
        aiResponse !== "" && 
        <View style={styles.aiMessageContainer}>
          <Text style={styles.aiMessage}>{aiResponse}</Text>
        </View>
        }
        {/* {messages.map((msg, index) => (
          <Animated.View
            key={index}
            style={[
              msg.user ? styles.userMessageContainer : styles.aiMessageContainer,
              { opacity: msg.fadeAnim },
            ]}
          >
            <Text style={msg.user ? styles.userMessage : styles.aiMessage}>
             {msg.text}
            </Text>
          </Animated.View>
        ))}

        {isNewResponse && currentMessage && msg (
          <View style={styles.aiMessageContainer}>
            <Text style={styles.aiMessage}>{currentMessage}</Text>
          </View>
        )} */}


      </ScrollView>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Ask for advice..."
        placeholderTextColor="#B8868B"
      />
      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C1C1E',
  },
  introText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#E3B9BC',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
    padding: 20,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    color: '#FFDAB9',
    fontSize: 18,
    lineHeight: 30,
  },
  aiMessage: {
    color: '#E6E6FA',
    fontSize: 18,
    lineHeight: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#2D2D2D',
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 10,
    color: '#E3B9BC',
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFDAB9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  typingText: {
    fontSize: 18,
    color: '#FFDAB9',
  },
});

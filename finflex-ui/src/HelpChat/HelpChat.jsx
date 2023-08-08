import { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'
import './HelpChat.css'



function HelpChat() {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am ChatGPT!",
            sender: "ChatGPT"

        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing'
        }

        const newMessages = [...messages, newMessage]
        // update our messages state
        setMessages(newMessages);
        // set a typing indicator 
        setTyping(true);
        //process message to ChatGPT
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages) {
        // chatMessages {sender: "user" or "chatGPT", message: "The message content here"}
        // apiMessages {role: "user" or "assistant", content: "The message content here"}

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if(messageObject.sender === "ChatGPT") {
                role="assistant"
            } else {
                role="user"
            }
            return {role: role, content: messageObject.message}

        });


        const systemMessage = {
            role: "system",
            content: "Speak like a financial advisor and explain all concepts as if I had no previous knowledge. Make the messages concise."
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + import.meta.env.VITE_CHAT_API_KEY,

                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((parsedData) => {
            console.log(parsedData);
            console.log(parsedData.choices[0].message.content);
            setMessages (
                [...chatMessages, {
                    message: parsedData.choices[0].message.content,
                    sender: "ChatGPT"
                }]
            );
            setTyping(false);
        });
    }
  return (
    <div className = 'help-chat'>
        <div style = {{position: 'relative', height: "800px", width: "700px"}}>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        scrollBehavior="smooth"
                        typingIndicator = {typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
                    >
                        {messages.map((message, i) => {
                            return <Message key={i} model={message} />
                        })}
                    </MessageList>
                    <MessageInput placeholder = "Type message here" onSend={handleSend} />
                </ChatContainer>
            </MainContainer>
        </div>
    </div>
  )
}

export default HelpChat
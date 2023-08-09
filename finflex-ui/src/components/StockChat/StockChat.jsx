// import { useState } from "react";
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'
// import './StockChat.css'




// function StockChat({ onClose }) {
//     const [typing, setTyping] = useState(false)
//     const [messages, setMessages] = useState([
//         {
//             message: "Generate a notification about the latest stock market trend  🚀",
//             sender: "System"

//         }
//     ])

//     const handleSend = async (message) => {
//         const newMessage = {
//             message: message,
//             sender: 'user',
//             direction: 'outgoing'
//         }

//         const newMessages = [...messages, newMessage]
//         // update our messages state
//         setMessages(newMessages);
//         // set a typing indicator 
//         setTyping(true);
//         //process message to ChatGPT
//         await processMessageToChatGPT(newMessages);
//     }

//     async function processMessageToChatGPT(chatMessages) {
//         // chatMessages {sender: "user" or "chatGPT", message: "The message content here"}
//         // apiMessages {role: "user" or "assistant", content: "The message content here"}

//         let apiMessages = chatMessages.map((messageObject) => {
//             let role = "";
//             if(messageObject.sender === "FinFlexAI") {
//                 role="assistant"
//             } else {
//                 role="user"
//             }
//             return {role: role, content: messageObject.message}

//         });


//         const systemMessage = {
//             role: "system",
//             content: "You are a help assistant that can provide advice on finances and updates about the latest stock market trends"
//         }

//         const apiRequestBody = {
//             "model": "gpt-3.5-turbo",
//             "messages": [
//                 systemMessage,
//                 ...apiMessages
//             ]
//         }

//         await fetch("https://api.openai.com/v1/chat/completions", {
//             method: 'POST',
//             headers: {
//                 "Authorization": "Bearer " + import.meta.env.VITE_CHAT_API_KEY,

//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(apiRequestBody)
//         }).then((data) => {
//             return data.json();
//         }).then((parsedData) => {
//             console.log(parsedData);
//             console.log(parsedData.choices[0].message.content);
//             setMessages (
//                 [...chatMessages, {
//                     message: parsedData.choices[0].message.content,
//                     sender: "FinFlexAI"
//                 }]
//             );
//             setTyping(false);
//         });
//     }



    
//   return (
//     <div className = 'stock-chat'>
//         <button className="close-chat-btn" onClick={onClose}>Close Chat</button>
//         <div style = {{position: 'relative', height: "600px", width: "1000px"}}>
//             <MainContainer>
//                 <ChatContainer>
//                     <MessageList
//                         scrollBehavior="smooth"
//                         typingIndicator = {typing ? <TypingIndicator content="FinFlexAI is typing" /> : null}
//                     >
//                         {messages.map((message, i) => {
//                             return <Message key={i} model={message} />
//                         })}
//                     </MessageList>
//                     <MessageInput placeholder = "Type message here" onSend={handleSend} />
//                 </ChatContainer>
//             </MainContainer>
//         </div>
//     </div>
//   )
// }

// export default StockChat



import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'
import './StockChat.css'
import { useState, useEffect } from "react";




function StockChat({ onClose }) {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        
        const generateInitialNotification = async () => {
            const systemMessage = {
                message: "Generate a notification about the latest stock market trend, use emojis",
                sender: "System"
            };
            
            
            await processMessageToChatGPT([systemMessage]);
        }
    
        generateInitialNotification();
    }, []);
    
    

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
            if(messageObject.sender === "FinFlexAI") {
                role="assistant"
            } else {
                role="user"
            }
            return {role: role, content: messageObject.message}

        });


        const systemMessage = {
            role: "system",
            content: "You are a help assistant that can provide advice on finances and updates about the latest stock market trends"
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
    
            
            if(parsedData.choices[0].message.role === "assistant") {
                setMessages(prevMessages => [
                    ...prevMessages, 
                    {
                        message: parsedData.choices[0].message.content,
                        sender: "FinFlexAI"
                    }
                ]);
            }
    
            setTyping(false);
        });
    }



    
  return (
    <div className = 'stock-chat'>
        <button className="close-chat-btn" onClick={onClose}>Close Chat</button>
        <div style = {{position: 'relative', height: "600px", width: "1000px"}}>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        scrollBehavior="smooth"
                        typingIndicator = {typing ? <TypingIndicator content="FinFlexAI is typing" /> : null}
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

export default StockChat
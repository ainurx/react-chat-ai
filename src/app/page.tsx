'use client'
import React, { useState } from 'react'
import { Container, Placeholder } from "react-bootstrap";
import { GoogleGenAI } from '@google/genai'
import 'dotenv/config'
import styles from "./page.module.css";
import Chatbox from "@/components/Chatbox";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_AI_API_KEY as string
})

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chat, setChat] = useState<Array<{isUser: boolean, message: string}>>([])

  const sendMessage = async (newChat: { isUser: boolean, message: string}) => {
    setChat((prevChat)=> [...prevChat, newChat])
    setIsLoading(true)
    const response = await ai.models.generateContent({
      model: process.env.NEXT_PUBLIC_AI_MODEL as string,
      contents: newChat.message
    })
    setChat((prevChat)=> [...prevChat, { isUser: false, message: response.text as string}])
    setIsLoading(false)
  }

  return (
    <div className={styles.page}>
      <Container>
        <div className="w-100 overflow-auto pt-4" style={{ height: '75dvh', backgroundColor: '#44444E', borderRadius: '12px'}}>
          { chat.length === 0 && <h1 className='text-center align-middle text-white'>What topic for today 🙌</h1> }
          
          {
            chat.map((c, index)=>( 
              <div key={index} className={`d-flex ${c.isUser ? 'justify-content-end' : ''} px-4 py-1`}>
                <div style={c.isUser ? {backgroundColor: '#1C352D', padding: '8px', width: 'max-content', color: 'white', borderRadius: '8px', maxWidth: '600px'} : 
                {backgroundColor: '#280A3E', padding: '8px', width: 'max-content', color: 'white', borderRadius: '8px', maxWidth: '600px'}}>
                  {c.message}
                </div>
              </div>
            ))
          }
          {
            isLoading && 
            <div className='mx-4 py-4' style={{backgroundColor: '#280A3E', padding: '8px', color: 'white', borderRadius: '8px', maxWidth: '600px'}}>
              <Placeholder animation='glow' striped variant='info' className='mb-2'>
                <Placeholder md={12} />
              </Placeholder>
            </div>
          }
        </div>
        <Chatbox sendMessage={sendMessage} isLoading={isLoading}/>
      </Container>
    </div>
  );
}

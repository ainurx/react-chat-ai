'use client'
import React from 'react'
import { Button, Form } from 'react-bootstrap'

interface chatBoxInterface {
    sendMessage: (params: {isUser: boolean, message: string})=> void,
    isLoading: boolean
}

const Chatbox: React.FC<chatBoxInterface> = ({sendMessage, isLoading}) => {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const message = formData.get('message') as string;
        sendMessage({ isUser: true, message })
        e.currentTarget.reset()
    }

  return (
    <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} name="message"/>
        </Form.Group>
        <div className='d-flex justify-content-end'>
            <Button type='submit' disabled={isLoading}>Send</Button>
        </div>
    </Form>  
  )
}

export default Chatbox
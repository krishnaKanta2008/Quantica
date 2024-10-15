import React, { useState, useEffect, useRef } from 'react';
import {
    CornerDownLeft,
    Mic,
    Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Sidebar from "../Sidebar/Sidebar";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import Typewriter from 'typewriter-effect';
import ReactMarkdown from 'react-markdown';
interface ChatMessage {
    role: 'user' | 'model';
    message: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Chat() {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
    const [isTypingFinished, setIsTypingFinished] = useState<boolean>(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            console.error('Username not found in localStorage');
        }

        const fetchChatHistory = async () => {
            if (!storedUsername) return;
            try {
                const response = await fetch(`${BACKEND_URL}/chat_history?username=${storedUsername}`);
                if (response.ok) {
                    const data = await response.json();
                    setChatHistory(data.chat_history);
                    setIsNewMessage(false); // No typewriter effect for previously loaded messages
                } else {
                    console.error('Failed to fetch chat history');
                }
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchChatHistory();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message || !username) return;

        const response = await fetch(`${BACKEND_URL}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: message, username }),
        });

        const data = await response.json();
        if (response.ok) {
            const newChat: ChatMessage[] = [...chatHistory, { role: 'user', message }, { role: 'model', message: data.solution }];
            setChatHistory(newChat);
            setMessage('');
            setIsNewMessage(true); 
        } else {
            console.error(data.error);
        }
    };

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col h-screen">
                <header className="sticky top-0 z-10 bg-background border-b">
                    <MobileSidebar />
                </header>
                <main className="flex flex-col flex-grow p-4 overflow-hidden">
                    <Card className="flex flex-col flex-grow overflow-hidden">
                        <CardContent className="flex-grow overflow-y-auto p-4" ref={chatContainerRef}>
                            <div className="space-y-4">
                                {chatHistory.map((chat, index) => (
                                    <div key={index} className={`flex gap-3 ${chat.role === 'user' ? 'justify-end' : ''}`}>
                                        <div className="grid gap-1.5">
                                            <div className="text-sm font-medium">{chat.role === 'user' ? '' : 'Quantica'}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {chat.role === 'model' && isNewMessage && index === chatHistory.length - 1 ? (
                                                    !isTypingFinished ? (
                                                        <Typewriter
                                                            onInit={(typewriter) => {
                                                                typewriter.typeString(chat.message)
                                                                    .callFunction(() => {
                                                                        setIsTypingFinished(true);
                                                                    })
                                                                    .pauseFor(500)
                                                                    .start();
                                                            }}
                                                            options={{
                                                                delay: 2,
                                                            }}
                                                        />
                                                    ) : (
                                                        <ReactMarkdown>{chat.message}</ReactMarkdown>
                                                    )
                                                ) : (
                                                    <ReactMarkdown>{chat.message}</ReactMarkdown>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </main>
                <div className="p-4">
                    <form
                        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                        onSubmit={handleSendMessage}
                    >
                        <Label htmlFor="message" className="sr-only">Message</Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                        />
                        <div className="flex items-center p-3 pt-0">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Paperclip className="size-4" />
                                            <span className="sr-only">Attach file</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">Attach File</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Mic className="size-4" />
                                            <span className="sr-only">Use Microphone</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">Use Microphone</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                Send Message
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

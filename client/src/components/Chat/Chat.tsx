import React, { useState, useEffect } from 'react';
import {
    CornerDownLeft,
    Mic,
    Paperclip,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Sidebar from "../Sidebar/Sidebar"
import MobileSidebar from "../MobileSidebar/MobileSidebar"

// Define types for chat messages
interface ChatMessage {
    role: 'user' | 'model';
    message: string;
}



export default function Chat() {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        // Retrieve username from localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            // Handle case where username is not found (e.g., redirect to login)
            console.error('Username not found in localStorage');
            // You might want to redirect to the login page here
        }

        // Fetch chat history from the server
        const fetchChatHistory = async () => {
            if (!storedUsername) return;
            try {
                const response = await fetch(`http://localhost:5000/chat_history?username=${storedUsername}`);
                if (response.ok) {
                    const data = await response.json();
                    setChatHistory(data.chat_history);
                } else {
                    console.error('Failed to fetch chat history');
                }
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchChatHistory();
    }, []);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message || !username) return;

        // Send message to the server
        const response = await fetch('http://localhost:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: message, username }),
        });

        const data = await response.json();
        if (response.ok) {
            // Update chat history
            const newChat: ChatMessage[] = [...chatHistory, { role: 'user', message }, { role: 'model', message: data.solution }];
            setChatHistory(newChat);
            setMessage(''); // Clear input
        } else {
            console.error(data.error);
        }
    };


    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <MobileSidebar />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8">
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Chat</CardTitle>
                        </CardHeader>
                        <CardContent className="h-96 overflow-y-auto">
                            <div className="space-y-4">
                                {chatHistory.map((chat, index) => (
                                    <div key={index} className={`flex gap-3 ${chat.role === 'user' ? 'justify-end' : ''}`}>
                                        <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                            <img
                                                className="aspect-square h-full w-full"
                                                alt={chat.role === 'user' ? 'User' : 'AI'}
                                                src="/placeholder.svg?height=32&width=32"
                                                width={32}
                                                height={32}
                                            />
                                        </span>
                                        <div className="grid gap-1.5">
                                            <div className="text-sm font-medium">{chat.role === 'user' ? 'You' : 'AI Assistant'}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {chat.message}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </main>
                <div className="flex items-center gap-2 p-4">
                    <form
                        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring flex-1"
                        onSubmit={handleSendMessage}
                    >
                        <Label htmlFor="message" className="sr-only">
                            Message
                        </Label>
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

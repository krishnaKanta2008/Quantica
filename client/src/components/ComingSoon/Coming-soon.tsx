'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/toaster"
import Footer from '@/components/Footer/Footer';

export default function ComingSoon() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Submitted email:', email)
        toast.success("Success !", {
            description: "You've been added to our waitlist.",
        })
        setEmail('')
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full space-y-8 text-center">
                    <h1 className="text-4xl font-bold text-primary">Quantica</h1>
                    <h2 className="text-2xl font-semibold">Coming Soon</h2>
                    <p className="text-muted-foreground">
                        We're working hard to bring you something amazing. Sign up to be notified when we launch!
                    </p>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                        />
                        <Button type="submit" className="w-full">
                            Notify Me
                        </Button>
                    </form>
                    <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">What to expect:</h3>
                        <ul className="space-y-2 text-left">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Cutting-edge quantum computing solutions
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Something amazing is coming 💫
                            </li>
                        </ul>
                    </div>
                </div>
                <Toaster />
            </div>
            <Footer />

        </>
    )
}
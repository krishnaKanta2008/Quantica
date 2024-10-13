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

// import { Input } from "@/components/ui/input"
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


export default function Chat() {
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
                                <div className="flex gap-3">
                                    <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                        <img
                                            className="aspect-square h-full w-full"
                                            alt="AI"
                                            src="/placeholder.svg?height=32&width=32"
                                            width={32}
                                            height={32}
                                        />
                                    </span>
                                    <div className="grid gap-1.5">
                                        <div className="text-sm font-medium">Welcome</div>
                                        <div className="text-sm text-muted-foreground">
                                            {/* Chat message content */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                        <img
                                            className="aspect-square h-full w-full"
                                            alt="AI"
                                            src="/placeholder.svg?height=32&width=32"
                                            width={32}
                                            height={32}
                                        />
                                    </span>
                                    <div className="grid gap-1.5">
                                        <div className="text-sm font-medium">AI Assistant</div>
                                        <div className="text-sm text-muted-foreground">
                                            {/* Chat message content */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
                <div className="flex items-center gap-2 p-4">

                    <form
                        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring flex-1"
                    >
                        <Label htmlFor="message" className="sr-only">
                            Message
                        </Label>
                        <Textarea
                            id="message"
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
    )
}
import {
    Bird,
    CornerDownLeft,
    Mic,
    Paperclip,
    Rabbit,
    Turtle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="col-span-2 grid gap-4 lg:col-span-1">
                            <Card className="hidden md:block">
                                <CardHeader>
                                    <CardTitle>Configuration</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="model-desktop">Model</Label>
                                        <Select defaultValue="genesis">
                                            <SelectTrigger id="model-desktop">
                                                <SelectValue placeholder="Select a model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="genesis">
                                                    <div className="flex items-center gap-2">
                                                        <Rabbit className="h-4 w-4" />
                                                        <span>Neural Genesis</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="explorer">
                                                    <div className="flex items-center gap-2">
                                                        <Bird className="h-4 w-4" />
                                                        <span>Neural Explorer</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="quantum">
                                                    <div className="flex items-center gap-2">
                                                        <Turtle className="h-4 w-4" />
                                                        <span>Neural Quantum</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="temperature-desktop">Temperature</Label>
                                        <Input
                                            id="temperature-desktop"
                                            placeholder="Enter temperature"
                                            type="number"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="max-tokens-desktop">Max Tokens</Label>
                                        <Input
                                            id="max-tokens-desktop"
                                            placeholder="Enter max tokens"
                                            type="number"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            
                        </div>
                        <div className="col-span-2 grid gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Chat</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4 h-[45vh] overflow-y-auto">
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
                                                 
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                    </div>
                    
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
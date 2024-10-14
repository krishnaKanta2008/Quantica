"use client"

import { useState, useEffect, useRef } from "react"
import MobileSidebar from "../MobileSidebar/MobileSidebar"
import Sidebar from "../Sidebar/Sidebar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import functionPlot from "function-plot"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Settings } from "lucide-react"

export default function GraphPlotter() {
    const [functionInput, setFunctionInput] = useState("x^2")
    const [functions, setFunctions] = useState([{ fn: "x^2", color: "blue" }])
    const [error, setError] = useState("")
    const plotRef = useRef<HTMLDivElement>(null) // Updated

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF"
        let color = "#"
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    const updatePlot = () => {
        if (plotRef.current) {
            const width = plotRef.current.clientWidth;
            const height = plotRef.current.clientHeight;

            try {
                functionPlot({
                    target: "#plot",
                    yAxis: { domain: [-10, 10] },
                    xAxis: { domain: [-10, 10] },
                    width,
                    height,
                    grid: true,
                    data: functions,
                })
                setError("")
            } catch (e) {
                setError("")
                toast.error("Invalid function input. Please enter a valid mathematical expression. " + e)
            }
        }
    }

    useEffect(() => {
        updatePlot()
        window.addEventListener("resize", updatePlot)
        return () => window.removeEventListener("resize", updatePlot)
    }, [functions])

    const addFunction = () => {
        if (functionInput.trim() === "") {
            setError("")
            toast.error("Function cannot be empty.")
            return
        }

        try {
            functionPlot({
                target: "#test-plot",
                data: [{ fn: functionInput }],
            })

            setFunctions([...functions, { fn: functionInput, color: getRandomColor() }])
            setFunctionInput("")
            setError("")
            toast.success(`Function ${functionInput} added successfully.`)
        } catch (e) {
            setError("")
            toast.error("Invalid function input. Please enter a valid mathematical expression. " + e)
        }
    }

    const removeFunction = (index: number) => {
        const updatedFunctions = functions.filter((_, i) => i !== index)
        setFunctions(updatedFunctions)
        toast.success("Function removed successfully.")
    }

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
                                        <Label htmlFor="function-input">Function</Label>
                                        <Input
                                            id="function-input"
                                            placeholder="Enter Function"
                                            type="text"
                                            value={functionInput}
                                            onChange={(e) => setFunctionInput(e.target.value)}
                                        />
                                        <Button onClick={addFunction}>Add Function</Button>
                                        {error && <p className="text-red-500" role="alert">{error}</p>}
                                    </div>
                                    <h3 className="text-lg font-semibold">Added Functions</h3>
                                    <div className="grid gap-2 h-60 overflow-y-auto"> {/* Added fixed height and overflow */}

                                        {functions.length > 0 ? (
                                            functions.map((func, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <span style={{ color: func.color }}>{func.fn}</span>
                                                    <Button
                                                        className="ml-2"
                                                        variant="outline"
                                                        onClick={() => removeFunction(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No functions added yet.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-span-2 grid gap-4 h-[80vh]">
                            <Card className="flex flex-col h-full">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>Function Plot</CardTitle>
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Settings className="shrink-0 md:hidden" />
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Configuration</SheetTitle>
                                                    <SheetDescription>
                                                        Add Functions to plot them.
                                                    </SheetDescription>
                                                </SheetHeader>
                                                <div className="grid gap-2 mt-4">
                                                    <Label htmlFor="function-input">Function</Label>
                                                    <Input
                                                        id="function-input"
                                                        placeholder="Enter Function"
                                                        type="text"
                                                        value={functionInput}
                                                        onChange={(e) => setFunctionInput(e.target.value)}
                                                    />
                                                    <Button onClick={addFunction}>Add Function</Button>
                                                    {error && <p className="text-red-500" role="alert">{error}</p>}
                                                </div>
                                                <h3 className="text-lg font-semibold mt-4">Added Functions</h3>
                                                <div className="grid gap-2 ">

                                                    {functions.length > 0 ? (
                                                        functions.map((func, index) => (
                                                            <div key={index} className="flex justify-between items-center">
                                                                <span style={{ color: func.color }}>{func.fn}</span>
                                                                <Button
                                                                    className="ml-2"
                                                                    variant="outline"
                                                                    onClick={() => removeFunction(index)}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No functions added yet.</p>
                                                    )}
                                                </div>

                                            </SheetContent>
                                        </Sheet>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow relative">
                                    <div id="plot" ref={plotRef} className="absolute inset-0"></div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
            <div id="test-plot" className="hidden"></div>
        </div>
    )
}

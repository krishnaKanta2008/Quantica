import { useState, useEffect } from "react";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import Sidebar from "../Sidebar/Sidebar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import functionPlot from "function-plot";
import { Button } from "@/components/ui/button";

export default function GraphPlotter() {
    const [functionInput, setFunctionInput] = useState("x^2");
    const [functions, setFunctions] = useState([{ fn: "x^2", color: "blue" }]);
    const [error, setError] = useState("");

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        try {
            functionPlot({
                target: "#plot",
                yAxis: { domain: [-10, 10] },  // Adjusted domain
                xAxis: { domain: [-10, 10] },
                width: 700,
                height: 500,
                grid: true,
                data: functions, // Plot all functions
            });
            setError("");
        } catch (e) {
            setError("Invalid function input. Please enter a valid mathematical expression. " + e);
        }
    }, [functions]);

    const addFunction = () => {
        if (functionInput.trim() === "") {
            setError("Function cannot be empty.");
            return;
        }

        try {
            // Test function before adding
            functionPlot({
                target: "#test-plot",
                data: [{ fn: functionInput }],
            });

            // Add new function with random color
            setFunctions([...functions, { fn: functionInput, color: getRandomColor() }]);
            setFunctionInput("");
            setError("");
        } catch (e) {
            setError("Invalid function input. Please enter a valid mathematical expression." + e);
        }
    };

    const removeFunction = (index: number) => {
        const updatedFunctions = functions.filter((_, i) => i !== index);
        setFunctions(updatedFunctions);
    };

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <MobileSidebar />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="col-span-2 grid gap-4 lg:col-span-1">
                            <Card className="hidden md:block h-[85vh]">
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
                                        {error && <p className="text-red-500">{error}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <h3 className="text-lg font-semibold">Added Functions</h3>
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
                        <div className="col-span-2 grid gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Function Plot</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div id="plot"></div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

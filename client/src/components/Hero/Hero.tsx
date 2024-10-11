"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function Hero() {
    
    const words = [
        {
            text: "it",
        },
        {
            text: "is",
        },
        {
            text: "about",
        },
        
        {
            text: "understanding.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center mt-40 ">
            <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center sm:text-left">
                Mathematics is not about numbers, equations, computations, or algorithms:
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                
                <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                    Signup
                </button>
            </div>
        </div>
    );
}

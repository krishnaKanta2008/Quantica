"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

interface HeroProps {
    onSignupClick: () => void; // Define the prop type
}

export const Hero: React.FC<HeroProps> = ({ onSignupClick }) => {
    
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
            <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center w-4/5">
                Mathematics is not about numbers, equations, computations, or algorithms:
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={onSignupClick}>
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">Sign Up Continue</span></button>
            </div>
        </div>
    );
}

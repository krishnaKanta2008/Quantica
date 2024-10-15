import { HoverEffect } from "@/components/ui/card-hover-effect";

export function Features() {
    return (
        <div className="max-w-5xl mx-auto px-8 mt-12">
            <h1 className="text-3xl font-bold text-center">Features</h1>
            <HoverEffect items={projects} />
        </div>
    );
}
export const projects = [
    {
        title: "Chat with AI",
        description:
            "A mathematics expert chatbot providing step-by-step solutions to math problems with detailed explanations and interactive chat features.",
        link: "home",
    },
    {
        title: "Function Plotter",
        description:
            "An interactive tool for plotting mathematical functions, allowing users to visualize and analyze graphs with ease.",
        link: "plot",
    },
    {
        title: "User Profile Management",
        description:
            "User Profile Management allows users to create, view, edit, and delete their profiles. It includes functionalities like updating personal information, profile pictures, and managing privacy settings.",
    },
    {
        title: "Meta",
        description:
            "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    },
    {
        title: "Amazon",
        description:
            "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    },
    {
        title: "Microsoft",
        description:
            "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    },
];

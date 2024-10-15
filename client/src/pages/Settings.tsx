import React, { useEffect, useState } from "react"
import Sidebar from "@/components/Sidebar/Sidebar"
import MobileSidebar from "@/components/MobileSidebar/MobileSidebar"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const formSchema = z.object({
    firstname: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastname: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    bio: z.string().optional(),
    image: z.string().optional(),
})

export default function Settings() {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            bio: "",
            image: "",
        },
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) {
                    throw new Error('Username not found in localStorage')
                }

                const response = await fetch(`${BACKEND_URL}/profile/${username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const responseData = await response.json()
                form.reset(responseData.user)
            } catch (error) {
                console.error("Error fetching user data", error)
            }
        }

        fetchUserData()
    }, [form])

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const username = localStorage.getItem('username')
            if (!username) {
                throw new Error('Username not found in localStorage')
            }

            let imageUrl = data.image
            if (imageFile) {
                const formData = new FormData()
                formData.append('image', imageFile)

                const imageResponse = await fetch(`${BACKEND_URL}/upload-image`, {
                    method: 'POST',
                    body: formData,
                })

                if (!imageResponse.ok) {
                    throw new Error('Image upload failed')
                }

                const imageResponseData = await imageResponse.json()
                imageUrl = imageResponseData.imageUrl
            }

            const response = await fetch(`${BACKEND_URL}/profile/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, image: imageUrl }),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const responseData = await response.json()
            console.log("Profile updated successfully", responseData)
            toast.success('Profile updated successfully')
        } catch (error) {
            console.error("Error updating profile", error)
            toast.error('Error updating profile')
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0])
        }
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col h-screen">
                <MobileSidebar />
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-2xl font-bold mb-6">Settings</h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="First Name" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Last Name" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter your last name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="you@example.com" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                You can manage verified email addresses in your email settings.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little bit about yourself"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                You can <span className="font-medium">@mention</span> other users and organizations to link to them.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormItem>
                                    <FormLabel>Profile Image</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                                    </FormControl>
                                    <FormDescription>
                                        Upload a profile image.
                                    </FormDescription>
                                </FormItem>
                                <Button type="submit">Update profile</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
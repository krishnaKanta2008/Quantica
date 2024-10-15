import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import MobileSidebar from "@/components/MobileSidebar/MobileSidebar";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

interface User {
  image: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  bio: string;
}

export default function Profile() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("Username not found in localStorage");
        }

        const response = await fetch(`${BACKEND_URL}/profile/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setUserData(responseData.user);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col h-screen">
        <MobileSidebar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-col items-center space-y-4">
              {userData?.image ? (
                <img
                  src={userData.image}
                  alt={`${userData.firstname} ${userData.lastname}`}
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              ) : (
                <Skeleton className="w-32 h-32 rounded-full" />
              )}
              <div className="flex flex-col items-center space-y-1 text-center">
                <div className="font-semibold">
                  {userData?.firstname} {userData?.lastname}
                </div>
                <div className="text-sm text-muted-foreground">
                  @{userData?.username}
                </div>
                <div className="text-sm text-muted-foreground">
                  {userData?.email}
                </div>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[2px] w-full" />
                <div className="text-sm text-muted-foreground">
                  {userData?.bio}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

import Chat from "@/components/Chat/Chat"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername && storedUsername.trim() !== '') {
      console.log('Username found in localStorage:', storedUsername);
    }
    else {
      navigate('/signin');
      toast.error('Please login to continue');
    }
  }, [navigate]);

  return (
    <div>
      <Chat />
    </div>
  )
}

export default Home
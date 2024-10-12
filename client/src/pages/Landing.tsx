import { NavbarDemo } from '@/components/Navbar/Navbar'
import { Hero } from '@/components/Hero/Hero'
import { Features } from '@/components/Features/Features'
import { useNavigate } from 'react-router-dom';
import Video from '@/components/Video/Video';
import Footer from '@/components/Footer/Footer';

const Landing = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignupClick = () => {
        navigate('/signup'); // Redirect to the signup page
    };

    return (
        <div className="w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] fixed top-0 left-0 right-0 bottom-0">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="relative overflow-y-auto h-full">
           
            <NavbarDemo />
            <Hero onSignupClick={handleSignupClick} />
            <Video />
            <Features />
            <Footer />
            </div>
        </div>
    )
}

export default Landing

    
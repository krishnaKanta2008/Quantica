import { NavbarDemo } from '@/components/Navbar/Navbar'
import { Hero } from '@/components/Hero/Hero'
import { Features } from '@/components/Features/Features'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignupClick = () => {
        navigate('/signup'); // Redirect to the signup page
    };

    return (
        <div>
            <NavbarDemo />
            <Hero onSignupClick={handleSignupClick} />
            <Features />
        </div>
    )
}

export default Landing
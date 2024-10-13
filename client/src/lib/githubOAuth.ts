const CALLBACK_URL = "https://quantica-v1.vercel.app";  
const GITHUB_CLIENTID = import.meta.env.VITE_GITHUB_CLIENTID;

export const loginWithGithub = async () => {
    const clientId = GITHUB_CLIENTID;
    const redirectUri = `${CALLBACK_URL}/home`; 

    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubUrl;
};

export const handleGitHubCallback = async () => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    if (code) {
        const response = await fetch('http://localhost:5000/api/github/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });
        const data = await response.json();

        // Store access_token in localStorage
        localStorage.setItem('access_token', data.access_token);
        window.location.href = '/';  // Redirect after login
    }
};

export const checkSession = () => {
    const token = localStorage.getItem('access_token');
    return token;
};

export const logout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/'; 
};
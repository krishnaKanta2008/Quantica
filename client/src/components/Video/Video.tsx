const Video = () => {
    const handleButtonClick = () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; 
    };

    return (
        <div className="relative h-[30rem] w-4/5 rounded-2xl overflow-hidden mx-auto mt-20 p-4 border-2 border-white group">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button className="bg-white p-2 rounded-full shadow-lg" onClick={handleButtonClick}>
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4.5 3.5l11 6.5-11 6.5v-13z" />
                    </svg>
                </button>
            </div>

            <div
                className="h-full w-full bg-cover bg-center flex items-center justify-center transition-all duration-300 group-hover:blur-sm"
                style={{ backgroundImage: 'url(https://miro.medium.com/v2/resize:fit:1400/0*4H5kGCGE6gIjgJQJ)' }}
            >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity z-10"></div>
            </div>
        </div>
    );
}

export default Video;

export default function NotFound() {
    return (<>
    <style>{`
#root {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
video {
    height: 100%;
    width: 100%;
    clip-path: url(#text-overlay);
    position: absolute;
    top: 0;
    left: 0;
}
svg {
    font-size: 20vh;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    font-family: 'Oswald', sans-serif;
}
h2 {
    margin: 15% 0 0 0;
}
        `}</style>
        <svg>
            <clipPath id="text-overlay">
                <text x="50%" y="50%" fill="white" text-anchor="middle">
                    Error 404
                </text>
            </clipPath>
        </svg>
        <video src="/cdn/img/blueink.mp4" muted loop autoplay></video>
        <h2>Page not found</h2>
    </>)
}
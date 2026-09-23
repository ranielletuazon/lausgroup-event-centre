import LGEC_Logo from '../../assets/lgec.png';

interface LoadingScreenProps {
    visible: boolean;
}

export default function LoadingScreen({ visible }: LoadingScreenProps) {
    return (
        <div
            // w/ Fade in
            // className={`
            //     fixed inset-0 z-[9999] bg-white flex items-center justify-center
            //     transition-opacity duration-300 pointer-events-none
            //     ${visible ? 'opacity-100' : 'opacity-0'}
            // `}

            className={`
                fixed inset-0 z-[9999] bg-white flex items-center justify-center
                pointer-events-none
                ${visible ? 'opacity-100' : 'opacity-0 transition-opacity duration-300'}
            `}
        >
            {/* Subtle radial glow behind logo */}
            <div className="absolute w-48 h-48 rounded-full bg-red-100/60 blur-2xl" />

            {/* Logo */}
            <div className={`relative flex flex-col items-center gap-4 transition-transform duration-300 ${visible ? 'scale-100' : 'scale-95'}`}>
                <img
                    src={LGEC_Logo}
                    alt="LGEC Logo"
                    className="w-32 animate-pulse"
                    style={{ animationDuration: "0.7s" }} 
                />

                {/* Loading bar */}
                {/* <div className="w-24 h-[2px] bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full animate-loading-bar" />
                </div> */}
            </div>
        </div>
    );
}
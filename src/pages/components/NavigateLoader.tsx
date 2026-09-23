import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import LoadingScreen from "./LoadingScreen";

// Loader how long it display in MS
const MIN_DISPLAY_MS = 1000;

interface NavigateLoaderProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    replace?: boolean;
}

export default function NavigateLoader({
    to,
    children,
    className,
    replace = false,
}: NavigateLoaderProps) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);
    const isNavigating = useRef(false);

    console.log(pathname);
    console.log("to - " + to);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (isNavigating.current) return;
        if (pathname === to) return;

        isNavigating.current = true;
        setVisible(true);

        await new Promise((res) => setTimeout(res, MIN_DISPLAY_MS));

        navigate(to, { replace });

        // Reset — handles edge cases where the component stays mounted
        isNavigating.current = false;
        setVisible(false);
    };

    return (
        <>
            {createPortal(<LoadingScreen visible={visible} />, document.body)}
            <a href={to} onClick={handleClick} className={className}>
                {children}
            </a>
        </>
    );
}
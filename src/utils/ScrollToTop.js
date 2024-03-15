import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Utility component to scroll back to the top of the page when switching with router
 * @returns null
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

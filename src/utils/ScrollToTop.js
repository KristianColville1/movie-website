import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Utility component to scroll back to the top of the page when switching with router
 * @returns null
 */
export default function ScrollToTop() {
    const { location } = useLocation();
    const navigationType = useNavigationType();
    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);
    }, [location, navigationType]);

    return null;
}

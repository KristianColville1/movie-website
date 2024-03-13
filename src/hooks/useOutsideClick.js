import { useEffect } from "react";

/**
 * useOutsideClick hooks into a ref and a callback to execute the callback when a click occurs outside the referenced element.
 * @param {React.RefObject} ref the ref attached to the element to detect the outside click
 * @param {Function} callback the function to call
 */

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

export default useOutsideClick;

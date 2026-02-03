import { useEffect, useState } from "react";
export function useMediaQuery(query: string): boolean {
    const [value, setValue] = useState(false);

    useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setValue(event.matches);
        }

        function updateValue (result: MediaQueryList) {
            setValue(result.matches);
        }

        const result = window.matchMedia(query);
        result.addEventListener("change", onChange);

        // Set initial value
        updateValue(result)

        return () => result.removeEventListener("change", onChange);
    }, [query]);

    return value;
}

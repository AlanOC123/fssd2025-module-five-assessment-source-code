import { useState, useEffect } from "react";

export function useDebounce(queryTerm: string, debounceInMS: number = 500) {
    const [debounceTerm, setDebounceTerm] = useState("");

    useEffect(() => {
        const timeout = setTimeout(
            () => setDebounceTerm(queryTerm),
            debounceInMS
        );

        return () => clearTimeout(timeout);
    }, [queryTerm, debounceInMS]);

    return debounceTerm;
}
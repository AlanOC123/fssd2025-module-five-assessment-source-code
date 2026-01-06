import { CommandInput } from "@/components";
import { useSearchProjects } from "../hooks";

export function SearchProjectInput({ query, setQuery }) {
    return (
        <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search projects..."
        />
    );
}

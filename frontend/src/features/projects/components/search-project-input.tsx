import { CommandInput } from "@/components";

export function SearchProjectInput({ query, setQuery }) {
    return (
        <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search projects..."
        />
    );
}

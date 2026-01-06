import { Search } from "lucide-react";
import { AppHeaderButton } from "./app-header-button";
import { useApp } from "@/hooks";

export function ToggleSearchProjectButton() {
    const { openSearch } = useApp()

    return (
        <AppHeaderButton onClick={openSearch}>
            <Search />
        </AppHeaderButton>
    )
}
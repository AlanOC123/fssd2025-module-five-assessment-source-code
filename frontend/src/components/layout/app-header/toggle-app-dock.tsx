import { Dock } from "lucide-react";
import { AppHeaderButton } from "./app-header-button";
import { useApp } from "@/hooks";

export function ToggleAppDockButton() {
    const { toggleDock } = useApp();

    return (
        <AppHeaderButton onClick={toggleDock}>
            <Dock />
        </AppHeaderButton>
    );
}
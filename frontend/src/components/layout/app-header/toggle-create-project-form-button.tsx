import { useApp } from "@/hooks";
import { AppHeaderButton } from "./app-header-button";
import { PlusCircle } from "lucide-react";

export function ToggleCreateProjectFormButton() {
    const { toggleCreateProject } = useApp();

    return (
        <AppHeaderButton onClick={toggleCreateProject}>
            <PlusCircle />
        </AppHeaderButton>
    );
}
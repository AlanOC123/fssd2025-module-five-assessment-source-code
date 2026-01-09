import {
    ToggleSearchProjectButton,
    ToggleCreateProjectFormButton,
    ToggleAppDockButton,
    ToggleSidebarButton,
} from "@/components";

export function AppHeader() {
    return (
        <header className="[grid-area:header] flex items-center justify-end w-full px-4 py-2 z-100">
            <div className="flex items-center justify-center gap-2">
                <ToggleSearchProjectButton />
                <ToggleCreateProjectFormButton />
                <ToggleSidebarButton />
                <ToggleAppDockButton />
            </div>
        </header>
    )
}

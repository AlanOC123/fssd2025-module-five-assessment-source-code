import { AppHeaderButton } from "@/components/layout/app-header/app-header-button";
import { SheetTrigger } from "@/components";
import { PlusCircle } from "lucide-react";

export function CreateProjectButton() {
    return (
        <SheetTrigger asChild>
            <AppHeaderButton>
                <PlusCircle />
            </AppHeaderButton>
        </SheetTrigger>
    );
}

import {
    ModalBody,
    ModalContent,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Typography,
} from "@/components";
import { Search } from "lucide-react";
import { ProjectCard } from "../project-card";

export function SearchProject() {
    return (
        <ModalBody className="bg-card shadow-md p-6 border-border border">
            <Typography as={"h4"} variant={"h4"}>Search</Typography>
            <div>
                <ModalContent>
                    <InputGroup>
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupInput type="search" placeholder="Search project name..." />
                    </InputGroup>
                </ModalContent>
            </div>
            <div className="overflow-y-auto">

            </div>
        </ModalBody>
    );
}

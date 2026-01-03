import {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarGroupContent,
    Typography,
    Button,
    ModalTrigger,
} from "@/components";
import { useProjects, ProjectCard } from "@/features";
import {
    BellDot,
    Group,
    PersonStanding,
    Pin,
    PlusCircle,
    Search,
} from "lucide-react";
import type { ReactNode } from "react";

const SectionHeader = ({ label, icon }: { label: string; icon: ReactNode }) => {
    return (
        <SidebarGroupLabel className="flex items-center justify-start gap-x-2">
            {icon}
            <span>{label}</span>
        </SidebarGroupLabel>
    );
};

export function AppSidebar() {
    const { myProjects, projectsInvolvedIn } = useProjects();

    return (
        <Sidebar>
            <SidebarHeader className="p-6">
                <Typography as={"h3"} variant={"h3"}>
                    Projects
                </Typography>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex items-center gap-x-4 justify-center">
                        <Button className="flex-1">
                            <PlusCircle />
                            New Project
                        </Button>
                        <ModalTrigger>
                            <Search />
                        </ModalTrigger>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SectionHeader label="Pinned" icon={<Pin />} />
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {myProjects.length > 0 &&
                                myProjects.map((project) => (
                                    <ProjectCard project={project} />
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SectionHeader label="Personal" icon={<PersonStanding />} />
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {myProjects.length > 0 &&
                                myProjects.map((project) => (
                                    <ProjectCard project={project} />
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SectionHeader label="Involved In" icon={<Group />} />
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projectsInvolvedIn.length > 0 &&
                                projectsInvolvedIn.map((project) => (
                                    <ProjectCard project={project} />
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SectionHeader label="Notifications" icon={<BellDot />} />
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projectsInvolvedIn.length > 0 &&
                                projectsInvolvedIn.map((project) => (
                                    <ProjectCard project={project} />
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
import {
    PageSection,
    PageItem,
    PageTitle,
    SidebarProvider,
    SidebarTrigger,
    Modal,
} from "@/components";
import { ProjectProvider, SearchProject, ProjectSidebar } from "@/features";

export function ProjectsPage() {
    return (
        <ProjectProvider>
            <Modal>
                
                <PageSection>
                    <SearchProject />
                    <SidebarProvider>
                        <PageItem colspan="quarter">
                            <ProjectSidebar />
                        </PageItem>
                        <PageItem colspan="threeQuarters">
                            <div className="flex items-center justify-start p-6">
                                <SidebarTrigger />
                            </div>
                        </PageItem>
                    </SidebarProvider>
                </PageSection>
            </Modal>
        </ProjectProvider>
    );
}

import { Button } from "@/components";
import { type ProjectList } from "@/types";

export function ProjectCard({ project }: { project: ProjectList }) {
    return (
        <Button variant={"secondary"} className="items-center">
            <p>{project.title}</p>
        </Button>
    )
}
import { client } from "@/api";
import type { ProjectComment, ProjectCommentsRequestProps } from "../types";

export async function getProjectComments({ projectID }: ProjectCommentsRequestProps): Promise<ProjectComment[]> {
    try {
        const response = await client.get<ProjectComment[]>()
        return response.data;
    } catch (err) {
        console.error(err)
        throw err;
    }
}
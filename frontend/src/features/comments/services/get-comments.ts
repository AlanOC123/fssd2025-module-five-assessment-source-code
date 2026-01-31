import { client } from "@/api";
import type { Comment, GetCommentsRequestProps } from "../types";
import { COMMENTS_ENDPOINTS } from "./endpoints";

export async function getComments({ projectId }: GetCommentsRequestProps): Promise<Comment[]> {
    try {
        const { data } = await client.get(COMMENTS_ENDPOINTS.root, { params: { project: projectId } });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
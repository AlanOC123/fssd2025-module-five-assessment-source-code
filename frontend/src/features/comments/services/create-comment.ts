import { client } from "@/api";
import { COMMENTS_ENDPOINTS } from "./endpoints";
import type { Comment, CreateCommentRequest } from "../types";

export async function createComment({ data }: CreateCommentRequest): Promise<Comment> {
    try {
        const response = await client.post(COMMENTS_ENDPOINTS.root, data)
        return response.data;
    } catch (err) {
        console.error(err);
        throw err
    }
}
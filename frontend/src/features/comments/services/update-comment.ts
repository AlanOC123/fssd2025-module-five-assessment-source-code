import { client } from "@/api";
import { COMMENTS_ENDPOINTS } from "./endpoints";
import type { Comment } from "../types";

export async function updateComment({ commentId, updatedData}): Promise<Comment> {
    try {
        const { data } = await client.patch(COMMENTS_ENDPOINTS.detail(commentId), updatedData)
        return data;
    } catch (err) {
        console.error(err);
        throw err
    }
}
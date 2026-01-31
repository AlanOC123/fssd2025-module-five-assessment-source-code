import { client } from "@/api";
import { COMMENTS_ENDPOINTS } from "./endpoints";

export async function deleteComment({ commentId }): Promise<void> {
    try {
        const { data } = await client.delete<void>(COMMENTS_ENDPOINTS.detail(commentId))
        return data;
    } catch (err) {
        console.error(err);
        throw err
    }
}
import { client } from "@/api";

export async function testUserAvatar(src: string) {
    try {
        const response = await client.get(src);

        return [200, 201].includes(response.status);
    } catch (err) {
        console.error(err);
        return false;
    }
}
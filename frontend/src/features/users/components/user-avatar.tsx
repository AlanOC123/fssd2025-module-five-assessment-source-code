import { Avatar, AvatarImage, AvatarFallback } from "@/components";

interface UserAvatarProps {
    src?: string | null;
    firstName?: string;
    lastName?: string;
}

function getUserInitials(
    firstName: string = "",
    lastName: string = ""
): string {
    if (!(firstName && lastName)) return "";

    return (
        firstName.split("")[0].toUpperCase() +
        lastName.split("")[0].toUpperCase()
    );
}

export function UserAvatar({
    src,
    firstName = "",
    lastName = "",
}: UserAvatarProps) {
    console.log(src)
    return src ? (
        <Avatar>
            <AvatarImage src={src} />
        </Avatar>
    ) : (
        <Avatar>
            <AvatarFallback>
                {getUserInitials(firstName, lastName)}
            </AvatarFallback>
        </Avatar>
    );
}

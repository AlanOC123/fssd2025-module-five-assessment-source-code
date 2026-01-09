import type { UserProfile } from "../types";
import { UserAvatar } from "./user-avatar";
import { ProfileMenuActions } from "./profile-menu-actions";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components";

interface ProfileCardProps {
    user: UserProfile;
}

export function ProfileCard({ user }: ProfileCardProps) {
    return (
        <Item variant="outline" className="bg-card flex items-center justify-center">
            <ItemMedia>
                <UserAvatar src={user.avatar} firstName={user.first_name} lastName={user.last_name} />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{user.full_name}</ItemTitle>
            </ItemContent>
            <ItemActions>
                <ProfileMenuActions />
            </ItemActions>
        </Item>
    );
}

import { Card, CardContent, CardHeader, CardTitle, Button, Input } from "@/components";
import { UserAvatar } from "./user-avatar";
import { Users, Send } from "lucide-react";
import type { UserProfile } from "../types"; // Import your user type

interface TeamSidebarProps {
    members: UserProfile[]; // Assuming members is an array of profiles
    owner: UserProfile;
}

export function TeamSidebar({ members, owner }: TeamSidebarProps) {
    // Combine owner and members for the list, filtering duplicates if necessary
    const allMembers = [owner, ...members];

    return (
        <div className="space-y-6">
            <Card className="border shadow-sm rounded-xl">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-lg font-bold">
                            Team Members
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* List */}
                    <div className="space-y-4">
                        {allMembers.map((member, idx) => (
                            <div
                                key={member.user_id || idx}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <UserAvatar src={member.avatar} firstName={member.first_name} lastName={member.last_name} />
                                    <div>
                                        <p className="text-sm font-medium leading-none">
                                            {member.first_name}{" "}
                                            {member.last_name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {member.user_id === owner.user_id
                                                ? "Project Lead"
                                                : "Member"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Invite Section */}
                    <div className="pt-4 border-t">
                        <label className="text-sm font-medium mb-2 block">
                            Invite Collaborators
                        </label>
                        <div className="space-y-2">
                            <Input
                                placeholder="email@example.com"
                                className="bg-gray-50"
                            />
                            <Button className="w-full">
                                <Send className="w-4 h-4 mr-2" />
                                Send Invite
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

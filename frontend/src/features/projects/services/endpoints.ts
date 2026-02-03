export const PROJECTS_ROOT = "projects"

// A central dictionary of all API routes for this feature.
// Dynamic routes (like ID-based lookups) are defined as functions.
export const PROJECT_ENDPOINTS = {
    root: `/${PROJECTS_ROOT}/`,
    list: `${PROJECTS_ROOT}/`,
    detailed: (id: number) => `/${PROJECTS_ROOT}/${id}/`,
    pin: (id: number) => `/${PROJECTS_ROOT}/${id}/pin/`,
    respondToInvite: (id: number) => `${PROJECTS_ROOT}/${id}/respond_invite/`,
    membersList: (id: number) => `/projects/${id}/members/`,
    inviteMember: (id: number) => `/projects/${id}/invite_member/`,
    removeMember: (projectId: number, membershipId: number) =>
        `/projects/${projectId}/members/${membershipId}/`,
    pendingProjects: `/${PROJECTS_ROOT}/pending_invites/`
};
import { PROJECTS_ROOT } from "@/features/projects";

const COMMENTS_ROOT = `comments`;

export const COMMENTS_ENDPOINTS = {
    root: `/${PROJECTS_ROOT}/${COMMENTS_ROOT}/`,
    detail: (commentID: number) => `/${PROJECTS_ROOT}/${COMMENTS_ROOT}/${commentID}/`
};
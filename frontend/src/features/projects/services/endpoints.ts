const PROJECTS_ROOT = "projects"

export const PROJECT_ENDPOINTS = {
    root: `/${PROJECTS_ROOT}/`,
    list: `${PROJECTS_ROOT}/`,
    detailed: (id: number) => `/${PROJECTS_ROOT}/${id}/`,
    pin: (id: number) => `/${PROJECTS_ROOT}/${id}/pin/`,
};

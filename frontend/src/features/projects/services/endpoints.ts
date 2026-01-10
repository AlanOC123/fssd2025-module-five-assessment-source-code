export const PROJECT_ENDPOINTS = {
    root: "projects",
    list: () => `${PROJECT_ENDPOINTS.root}/`,
    detailed: (id: number) => `${PROJECT_ENDPOINTS.root}/${id}/`,
    pin: (id: number) => `${PROJECT_ENDPOINTS.root}/${id}/pin/`,
};

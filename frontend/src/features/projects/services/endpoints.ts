const ROOT_DOMAIN = "projects";

export const LIST_PROJECTS_ROUTE = ROOT_DOMAIN;
export const DETAILED_PROJECT_ROUTE = (id: number) => `${ROOT_DOMAIN}/${id}/`;
export const PIN_PROJECT_ROUTE = (id: number) => `${ROOT_DOMAIN}/${id}/pin/`

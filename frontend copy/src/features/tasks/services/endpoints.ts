const TASKS_ROOT = "tasks";

export const TASK_ENDPOINTS = {
    root: `/${TASKS_ROOT}/`,
    detail: (id: number) => `/${TASKS_ROOT}/${id}/`
};

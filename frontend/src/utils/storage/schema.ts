export const STORAGE_PREFIX = "_APP_STORAGE";

export type StorageConfig = {
    auth_items: {
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        email: string
    };
};

export const StorageMapKey: {
    [K in keyof StorageConfig]: Record<keyof StorageConfig[K], string>;
} = {
    auth_items: {
        firstName: `${STORAGE_PREFIX}_FN`,
        lastName: `${STORAGE_PREFIX}_LN`,
        dateOfBirth: `${STORAGE_PREFIX}_DOB`,
        email: `${STORAGE_PREFIX}_EM`,
    },
};

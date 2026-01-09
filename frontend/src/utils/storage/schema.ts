import { type StorageConfig } from "@/types";

export const STORAGE_PREFIX = "_APP_STORAGE";

export const StorageMapKey: {
    [K in keyof StorageConfig]: Record<keyof StorageConfig[K], string>;
} = {
    auth_items: {
        first_name: `${STORAGE_PREFIX}_FN`,
        last_name: `${STORAGE_PREFIX}_LN`,
        date_of_birth: `${STORAGE_PREFIX}_DOB`,
        email: `${STORAGE_PREFIX}_EM`,
    },
};

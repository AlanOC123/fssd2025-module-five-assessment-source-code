import { StorageMapKey, type StorageConfig } from "./schema";

export const getItemFromStorage = <
    G extends keyof StorageConfig,
    I extends keyof StorageConfig[G]
>(
    group: G,
    item: I
) => {
    const storageKey = StorageMapKey[group][item];
    const rawValue = localStorage.getItem(storageKey);

    if (rawValue === null) return null;

    try {
        return JSON.parse(rawValue) as StorageConfig[G][I];
    } catch (err) {
        console.error(
            `Error getting Item: ${storageKey} from storage. Error: ${err}`
        );
        return null;
    }
};

export const addItemToStorage = <
    G extends keyof StorageConfig,
    K extends keyof StorageConfig[G],
    I extends StorageConfig[G][K]
>(
    group: G,
    key: K,
    item: I
) => {
    const storageKey = StorageMapKey[group][key];

    try {
        const serialisedItem = JSON.stringify(item);
        localStorage.setItem(storageKey, serialisedItem);
    } catch (err) {
        console.error(`Error setting ${storageKey} to storage. Error: ${err}`);
    }
};

export const removeItemFromStorage = <
    G extends keyof StorageConfig,
    K extends keyof StorageConfig[G]
>(
    group: G,
    key: K
) => {
    const storageKey = StorageMapKey[group][key];
    localStorage.removeItem(storageKey);
};

export const clearStorage = () => localStorage.clear()
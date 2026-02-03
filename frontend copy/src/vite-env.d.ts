interface ViteTypeOptions {
    strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_BASE_PORT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

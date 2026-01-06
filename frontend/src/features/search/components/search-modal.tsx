import {
    Modal,
    ModalBody,
    ModalContent,
    ModalProvider,
} from "@/components";
import type { BaseLayoutProps } from "@/types";
import { Typography } from "@/components";

import { useApp } from "@/hooks";

export function SearchModal({ children }: BaseLayoutProps) {
    const { isSearchOpen, toggleSearch } = useApp();

    return (
        <ModalProvider open={isSearchOpen} setOpen={toggleSearch}>
            <Modal open={isSearchOpen} setOpen={toggleSearch}>
                <ModalBody>
                    <Typography as={"h4"} variant={"h4"}>
                        Search
                    </Typography>
                    <ModalContent>{children}</ModalContent>
                </ModalBody>
            </Modal>
        </ModalProvider>
    );
}

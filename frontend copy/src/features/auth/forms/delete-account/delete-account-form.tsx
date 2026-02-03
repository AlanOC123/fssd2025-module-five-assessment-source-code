import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccountSchema } from "../schema";
import type { DeleteAccountData } from "../../types";
import { useAuth } from "../../hooks";

import { DeleteAccountView } from "./delete-account-view";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";

import {
    Modal,
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
    Button,
} from "@/components";

export function DeleteAccountForm() {
    const [isOpen, setIsOpen] = useState(false);
    const { delete: deleteAccount, isLoading } = useAuth();

    const methods = useForm<DeleteAccountData>({
        resolver: zodResolver(deleteAccountSchema),
        mode: "onChange",
        defaultValues: {
            challenge: "",
            password: "",
        },
    });

    const onSubmit = async (data: DeleteAccountData) => {
        try {
            await deleteAccount(data);
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.data.password) {
                    methods.setError("password", {
                        type: "manual",
                        message: "Incorrect password",
                    });
                } else {
                    toast.error("Could not delete account. Please try again.");
                }
            }
        }
    };

    return (
        <>
            {/* 1. The Visible "Danger Zone" Card */}
            <Card className="border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
                <CardHeader>
                    <CardTitle className="text-destructive">
                        Delete Account
                    </CardTitle>
                    <CardDescription>
                        Permanently remove your account and all of its contents
                        from our platform. This action is not reversible, so
                        please continue with caution.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end border-t border-destructive/20 pt-6 bg-destructive/5">
                    <Button
                        variant="destructive"
                        onClick={() => setIsOpen(true)}
                    >
                        Delete Account
                    </Button>
                </CardFooter>
            </Card>

            <Modal open={isOpen} setOpen={setIsOpen}>
                <DeleteAccountView
                    methods={methods}
                    isPending={isLoading}
                    onSubmit={onSubmit}
                    setOpen={setIsOpen}
                />
            </Modal>
        </>
    );
}

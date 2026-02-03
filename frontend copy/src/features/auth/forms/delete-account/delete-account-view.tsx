import {
    ModalBody,
    ModalContent,
    Field,
    FieldLabel,
    Input,
    FieldError,
    Button,
    ModalFooter,
} from "@/components";

import { DELETE_ACCOUNT_CHALLENGE } from "../schema";
import type { DeleteAccountViewProps } from "../../types";

export function DeleteAccountView({
    methods,
    onSubmit,
    isPending,
    setOpen
}: DeleteAccountViewProps) {
    const { formState, register, handleSubmit } = methods;

    return (
        <ModalBody className="max-w-md w-max min-w-xxs rounded-2xl">
            <ModalContent>
                <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                    Are you sure you want to delete your account?
                </h4>

                <div className="py-2 flex flex-col gap-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg text-sm text-red-800 dark:text-red-200">
                        <p className="font-bold mb-1">
                            Warning: This action is not reversible.
                        </p>
                        <p>
                            All your projects, tasks, and data will be
                            permanently removed.
                        </p>
                    </div>

                    <form
                        id="delete-form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        {/* Challenge Field */}
                        <Field>
                            <FieldLabel className="flex flex-col gap-y-1 items-start">
                                To verify, type
                                <span className="font-mono font-bold select-all">
                                    "{DELETE_ACCOUNT_CHALLENGE}"
                                </span>
                                below:
                            </FieldLabel>
                            <Input
                                placeholder={DELETE_ACCOUNT_CHALLENGE}
                                {...register("challenge")}
                                className="font-mono text-sm"
                            />
                            {formState.errors.challenge && (
                                <FieldError>
                                    {formState.errors.challenge.message}
                                </FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel>Confirm Password</FieldLabel>
                            <Input
                                type="password"
                                placeholder="Type your password to confirm"
                                {...register("password")}
                            />
                            {formState.errors.password && (
                                <FieldError>
                                    {formState.errors.password.message}
                                </FieldError>
                            )}
                        </Field>
                    </form>
                </div>
            </ModalContent>

            <ModalFooter className="gap-4 flex flex-wrap">
                <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    type="submit"
                    form="delete-form"
                    disabled={formState.isSubmitting || isPending}
                >
                    {formState.isSubmitting
                        ? "Deleting..."
                        : "Permanently Delete Account"}
                </Button>
            </ModalFooter>
        </ModalBody>
    );
}

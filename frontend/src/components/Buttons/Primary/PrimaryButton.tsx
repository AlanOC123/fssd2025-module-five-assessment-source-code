import React from "react";
import { Button } from "react-bootstrap";
import type { ButtonProps } from "react-bootstrap";
import styles from "./PrimaryButton.module.scss"

type Props = ButtonProps & {
    children: React.ReactNode;
}

export function PrimaryButton({ children, ...props }: Props) {
    return (
        <Button className={styles.btn} {...props}>
            { children }
        </Button>
    )
}
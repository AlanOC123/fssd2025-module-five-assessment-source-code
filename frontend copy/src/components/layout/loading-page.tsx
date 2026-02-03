import { Empty, EmptyMedia, EmptyTitle, Spinner, Typography } from "../ui";

function LoadingPage() {
    return (
        <div className="h-screen w-screen bg-background flex items-center justify-center">
            <Empty className="max-w-xl min-w-xs h-4/5 bg-card border-border shadow-2xl flex items-center justify-center flex-col gap-8 rounded-2xl">
                <EmptyMedia>
                    <Spinner className="size-8" />
                </EmptyMedia>
                <EmptyTitle>
                    <Typography as={"h1"} variant={"h1"}>Loading...</Typography>
                </EmptyTitle>
            </Empty>
        </div>
    );
}

export { LoadingPage };

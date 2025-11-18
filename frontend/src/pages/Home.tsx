import { PrimaryButton } from "../components/Buttons/Primary/PrimaryButton"

export function Home() {
    return (
        <div>
            <h1>Hello from the Home Page!</h1>
            <p>Router is working...</p>
            <PrimaryButton onClick={() => alert('Clicked!')}>
                Click Me!
            </PrimaryButton>
        </div>
    )
}
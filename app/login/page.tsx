import AuthForm from "@/src/feature/auth-form";
import Back from "@/src/entity/back";

export default function AuthPage() {

    return (
        <div className="container mx-auto my-10 h-[100vh]">
            <Back />
                <AuthForm />
        </div>
    )
}
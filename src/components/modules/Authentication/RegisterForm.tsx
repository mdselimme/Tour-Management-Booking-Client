import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleLogo from "@/assets/icons/GoogleLogo";
import { Form, Link } from "react-router";
import { useForm } from "react-hook-form";

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  const form = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to sign to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <GoogleLogo />
          Sign Up with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account ?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Log In
        </Link>
      </div>
    </div>
  );
}

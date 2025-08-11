import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSendotpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const optSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendotpMutation();
  const form = useForm<z.infer<typeof optSchema>>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = () => {
    setConfirmed(true);
  }

  function onSubmit(data: z.infer<typeof optSchema>) {
    try {
      const result = sendOtp({ email });
      console.log(result)
      if (result.success) {
        toast.success("Otp sent successfully.")
      }
    } catch (error) {
      console.log(error)
    }
    console.log(data)
    sendOtp({ email })
  }

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [navigate, email]);

  return (
    <div className="grid place-items-center h-screen">
      {
        confirmed ? <>
          <Card>
            <CardHeader>
              <CardTitle>Verify Your Email Address</CardTitle>
              <CardDescription>Please Enter the the 6 digit code we sent to {email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2">Enter your Otp Here</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <Dot />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={4} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button form="otp-form" type="submit">Verify Otp</Button>
            </CardFooter>
          </Card>
        </> :
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Verify your email address</CardTitle>
              <CardDescription>
                We will send an Otp on your <br /> {email}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSendOtp} className="w-[300px]">
                Send Otp
              </Button>
            </CardFooter>
          </Card>
      }
    </div>
  );
};

export default Verify;

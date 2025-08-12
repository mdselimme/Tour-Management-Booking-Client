import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
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
});

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(10);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const form = useForm<z.infer<typeof optSchema>>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Send Otp in email function
  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending Otp.");
    try {
      const res = await sendOtp({ email }).unwrap();
      if (res.success) {
        toast.success("Otp Sent Successfully. ", { id: toastId });
        setConfirmed(true);
      }
      setConfirmed(true);
      setTimer(10);
    } catch (error) {
      console.log(error);
    }
  };

  // Submit otp function
  async function onSubmit(data: z.infer<typeof optSchema>) {
    const toastId = toast.loading("Verifying Otp.");
    const userInfo = {
      email,
      otp: data.pin,
    };
    try {
      const result = await verifyOtp(userInfo).unwrap();
      if (result.success) {
        toast.success("Otp Verified successfully.", { id: toastId });
        setConfirmed(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [navigate, email]);

  useEffect(() => {
    if (!email && !confirmed) {
      return;
    }
    const timerId = setInterval(() => {
      if (confirmed) {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [email, confirmed]);

  return (
    <div className="grid place-items-center h-screen">
      {confirmed ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Verify Your Email Address</CardTitle>
              <CardDescription>
                Please Enter the the 6 digit code we sent to {email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  id="otp-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2">
                          Enter your Otp Here
                        </FormLabel>
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
                          {timer} seconds
                          <Button
                            onClick={handleSendOtp}
                            variant={"link"}
                            type="submit"
                            disabled={timer !== 0}
                            className={cn({
                              "cursor-pointer": timer === 0,
                              "text-gray-500": timer !== 0,
                            })}
                          >
                            Resend Otp
                          </Button>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button form="otp-form" type="submit">
                Verify Otp
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
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
      )}
    </div>
  );
};

export default Verify;

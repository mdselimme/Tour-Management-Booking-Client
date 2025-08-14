/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleFileUploader from "@/components/single.image.uploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const addDivisionSchema = z.object({
  name: z.string().min(5, { error: "Min 5 character length value." }),
  description: z.string().min(30, { error: "Min 30 character length value." }),
});

export function AddDivisionModel() {
  const [addDivision] = useAddDivisionMutation();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof addDivisionSchema>>({
    resolver: zodResolver(addDivisionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof addDivisionSchema>) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);
    const toastId = toast.loading("Adding Division....");
    try {
      const res = await addDivision(formData).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId });
        form.reset();
        setOpen(false);
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data.message, { id: toastId });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Add Division</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Division</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                id="add-division"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-3">Division Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Division name .."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-3">
                        Division Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Division Description .."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
              <SingleFileUploader onChange={setImage} />
            </Form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="add-division" type="submit">
              Add Division
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

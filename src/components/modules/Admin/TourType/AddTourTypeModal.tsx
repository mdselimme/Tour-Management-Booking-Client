/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const tourTypeSchema = z.object({
  name: z.string().min(5, { error: "Min 5 character length value." }),
});

export function AddTourTypeModal() {
  const [addTourType] = useAddTourTypeMutation();

  const form = useForm<z.infer<typeof tourTypeSchema>>({
    resolver: zodResolver(tourTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof tourTypeSchema>) => {
    try {
      const res = await addTourType({ name: data.name }).unwrap();
      if (res.success) {
        <DialogClose />;
        toast.success(res.message);
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data.message);
      }
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                id="tour-type"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-3">Tour Type</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your tour type here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="tour-type" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

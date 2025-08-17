/* eslint-disable @typescript-eslint/no-explicit-any */
import MultipleImageUpload from "@/components/mutiple.image.upload";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetAllDivisionQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useAllTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { format, formatISO } from "date-fns";
import { CalendarIcon, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const addTourSchema = z.object({
  title: z.string(),
  division: z.string(),
  tourType: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  maxGuest: z.coerce.number(),
  location: z.string(),
  costFrom: z.coerce.number(),
  arrivalLocation: z.string(),
  departureLocation: z.string(),
  minAge: z.coerce.number(),
  included: z.array(z.object({ value: z.string() })),
  excluded: z.array(z.object({ value: z.string() })),
  amenities: z.array(z.object({ value: z.string() })),
  tourPlan: z.array(z.object({ value: z.string() })),
});

export function AddTourModel() {
  const { data: tourTypeData } = useAllTourTypesQuery({});
  const { data: divisionData } = useGetAllDivisionQuery({});
  const [addTour] = useAddTourMutation({});
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

  const divisionOptions = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const tourTypeOptions = tourTypeData?.data.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof addTourSchema>>({
    resolver: zodResolver(addTourSchema) as any,
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      description: "",
      minAge: 0,
      maxGuest: 0,
      location: "",
      costFrom: 0,
      arrivalLocation: "",
      departureLocation: "",
      startDate: new Date(),
      endDate: new Date(),
      included: [
        { value: "Accommodation for 2 nights" },
        { value: "All meals (breakfast, lunch, dinner)" },
        { value: "Transportation (AC bus)" },
        { value: "Professional tour guide" },
      ],
      excluded: [
        { value: "Personal expenses" },
        { value: "Extra activities not mentioned" },
        { value: "Travel insurance" },
      ],
      amenities: [
        { value: "Air-conditioned rooms" },
        { value: "Free WiFi" },
        { value: "Swimming pool access" },
        { value: "Beach access" },
      ],
      tourPlan: [
        { value: "Day 1: Arrival and beach exploration" },
        { value: "Day 2: Himchari National Park visit" },
        { value: "Day 3: Inani Beach and departure" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included",
  });
  const {
    fields: excludedFields,
    append: excludedAppend,
    remove: excludedRemove,
  } = useFieldArray({
    control: form.control,
    name: "excluded",
  });
  const {
    fields: amenitiesFields,
    append: amenitiesAppend,
    remove: amenitiesRemove,
  } = useFieldArray({
    control: form.control,
    name: "amenities",
  });
  const {
    fields: tourPlanFields,
    append: tourPlanAppend,
    remove: tourPlanRemove,
  } = useFieldArray({
    control: form.control,
    name: "tourPlan",
  });

  const onSubmit = async (data: z.infer<typeof addTourSchema>) => {
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item) => item.value),
      excluded: data.excluded.map((item) => item.value),
      amenities: data.amenities.map((item) => item.value),
      tourPlan: data.tourPlan.map((item) => item.value),
      costFrom: Number(data.costFrom),
      maxGuest: Number(data.maxGuest),
      minAge: Number(data.minAge),
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(tourData));

    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("files", image);
      }
    });

    const toastId = toast.loading("Adding Tour....");
    try {
      const res = await addTour(formData).unwrap();
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
          <Button>Add Tour</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Tour</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                id="add-tour"
              >
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel className="mb-3">Tour Title</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Tour Title .."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="costFrom"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel className="mb-3">Cost From</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Cost From .."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tour Division  */}
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Tour Division</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a tour division" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {divisionOptions.map(
                              (item: { label: string; value: string }) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Tour Type  */}
                  <FormField
                    control={form.control}
                    name="tourType"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Tour Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a tour type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tourTypeOptions.map(
                              (item: { label: string; value: string }) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Max Guest  */}
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="maxGuest"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Max Guest</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Max Guest .."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Tour Type  */}
                  <FormField
                    control={form.control}
                    name="minAge"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Min age</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Min Age .."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={field.onChange}
                              disabled={(date: Date) =>
                                date <
                                new Date(
                                  new Date().setDate(new Date().getDate() - 1)
                                )
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={field.onChange}
                              disabled={(date: Date) =>
                                date <
                                new Date(
                                  new Date().setDate(new Date().getDate() - 1)
                                )
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <MultipleImageUpload onChange={setImages} />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-3 mt-3">
                          Tour Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tour Description .."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Tour Location  */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="mb-3">Tour Location</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Tour Location .."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* arrival Location  */}
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="arrivalLocation"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Arrival Location</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Arrival Location .."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* departure Location  */}
                  <FormField
                    control={form.control}
                    name="departureLocation"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Departure Location</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Departure Location .."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Included  */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold text-xl">Add Tour Included</p>
                    <Button type="button" onClick={() => append({ value: "" })}>
                      <PlusIcon />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {fields.map((item, index) => (
                      <div key={item.id} className="flex gap-4">
                        <FormField
                          control={form.control}
                          name={`included.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Tour included .."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="button" onClick={() => remove(index)}>
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Excluded  */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold text-xl">Add Tour Excluded</p>
                    <Button
                      type="button"
                      onClick={() => excludedAppend({ value: "" })}
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {excludedFields.map((item, index) => (
                      <div key={item.id} className="flex gap-4">
                        <FormField
                          control={form.control}
                          name={`excluded.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Tour included .."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          onClick={() => excludedRemove(index)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* amenities */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold text-xl">Add Tour Amenities</p>
                    <Button
                      type="button"
                      onClick={() => amenitiesAppend({ value: "" })}
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {amenitiesFields.map((item, index) => (
                      <div key={item.id} className="flex gap-4">
                        <FormField
                          control={form.control}
                          name={`amenities.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Tour included .."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          onClick={() => amenitiesRemove(index)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* tourPlan  */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold text-xl">Add Tour Plan</p>
                    <Button
                      type="button"
                      onClick={() => tourPlanAppend({ value: "" })}
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {tourPlanFields.map((item, index) => (
                      <div key={item.id} className="flex gap-4">
                        <FormField
                          control={form.control}
                          name={`tourPlan.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Tour included .."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          onClick={() => tourPlanRemove(index)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </Form>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button form="add-tour" type="submit">
              Add Tour
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/deleteConfirmation";
import { AddDivisionModel } from "@/components/modules/Admin/Division/AddDivisionModel";
import { AddTourModel } from "@/components/modules/Admin/Tour/AddTourModel";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllDivisionQuery } from "@/redux/features/division/division.api";
import {
  useAllTourTypesQuery,
  useDeleteTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AddTour = () => {
  const { data: tourTypeData } = useAllTourTypesQuery({});
  const { data: divisionData } = useGetAllDivisionQuery({});
  const [removeTourType] = useDeleteTourTypeMutation();

  const divisionOptions = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const handleRemoveTourType = async (tourId: string) => {
    // const toastId = toast.loading("Removing.....");
    // try {
    //   const res = await removeTourType(tourId).unwrap();
    //   if (res.success) {
    //     toast.success(res.message, { id: toastId });
    //   }
    // } catch (error: any) {
    //   if (error) {
    //     toast.error(error?.data.message);
    //   }
    // }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-xl font-semibold">Add Tour</h1>
        <AddTourModel />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody>
            {divisionData?.data.map(
              (item: { _id: string; name: string }, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-center">
                    {item?.name}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    <DeleteConfirmation
                      onConfirm={() => handleRemoveTourType(item._id)}
                    >
                      <Button className="sm cursor-pointer">
                        <Trash2 />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody> */}
        </Table>
      </div>
    </div>
  );
};

export default AddTour;

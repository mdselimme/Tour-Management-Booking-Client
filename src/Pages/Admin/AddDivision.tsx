/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/deleteConfirmation";
import { AddDivisionModel } from "@/components/modules/Admin/Division/AddDivisionModel";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteADivisionMutation,
  useGetAllDivisionQuery,
} from "@/redux/features/division/division.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AddDivision = () => {
  const { data } = useGetAllDivisionQuery({});
  const [removeTourType] = useDeleteADivisionMutation();

  const handleRemoveDivision = async (divisionId: string) => {
    const toastId = toast.loading("Removing.....");
    try {
      const res = await removeTourType(divisionId).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data.message, { id: toastId });
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-5">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-xl font-semibold">Add Division</h1>
        <AddDivisionModel />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="text-center bg-amber-100">
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(
              (
                item: { _id: string; description: string; name: string },
                idx: number
              ) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-center">
                    {item?.name}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {item?.description}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    <DeleteConfirmation
                      onConfirm={() => handleRemoveDivision(item._id)}
                    >
                      <Button className="sm cursor-pointer">
                        <Trash2 />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddDivision;

import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

const AddTourType = () => {
  const { data } = useAllTourTypesQuery({});
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((item: { name: string }, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="font-medium text-center">
                  {item?.name}
                </TableCell>
                <TableCell className="font-medium text-center">
                  <Button className="sm">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;

import { AddDivisionModel } from "@/components/modules/Admin/Division/AddDivisionModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllDivisionQuery } from "@/redux/features/division/division.api";

const AddDivision = () => {
  const { data } = useGetAllDivisionQuery({});

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(
              (item: { description: string; name: string }, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-center">
                    {item?.name}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {item?.description}
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

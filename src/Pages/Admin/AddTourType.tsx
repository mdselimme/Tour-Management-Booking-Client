/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/deleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllTourTypesQuery,
  useDeleteTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddTourType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useAllTourTypesQuery({ page: currentPage, limit: 5 });
  const [removeTourType] = useDeleteTourTypeMutation();

  const totalPage = data?.meta.totalPage;

  const pagePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const pageNext = () => {
    if (currentPage < data.meta.totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing.....");
    try {
      const res = await removeTourType(tourId).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data.message);
      }
    }
  };

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
            {data?.data.map(
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
          </TableBody>
        </Table>
      </div>
      <div className="mt-5">
        {totalPage > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              >
                <PaginationPrevious onClick={pagePrev} />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    onClick={() => setCurrentPage(page)}
                    key={page}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem
                className={
                  currentPage !== 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              >
                <PaginationNext onClick={pageNext} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default AddTourType;

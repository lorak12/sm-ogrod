import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="flex flex-col space-y-10">
      <Skeleton className="w-full rounded-xl h-[80px]" />
      <div className="flex items-center justify-center flex-col gap-4">
        <Skeleton className="h-[375px] w-[750px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-[750px]" />
          <Skeleton className="h-12 w-[600px]" />
        </div>
      </div>
    </div>
  );
}

export default loading;

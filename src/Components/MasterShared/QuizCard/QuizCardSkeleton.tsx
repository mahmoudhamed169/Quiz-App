import Skeleton from "react-loading-skeleton";

export default function QuizCardSkeleton() {
  return (
    <div className="w-full mt-5">
      <div className="flex h-[120px] border-[1px] border-gray-300 rounded-[10px]">
        <div className="w-[120px] h-full rounded-[10px]  flex-shrink-0 p-4">
          <Skeleton width={"100%"} height={"100%"} />
        </div>

        <div className="mt-6 px-3 w-full">
          <h6 className="text-lg font-bold">
            <Skeleton width={150} />
          </h6>
          <p className="font-normal text-xs">
            <Skeleton width={100} />
          </p>
          <div className="flex items-center justify-between mt-4">
            <h6 className="text-sm font-bold">
              <Skeleton width={120} />
            </h6>
            <div className="flex gap-1 items-center font-normal text-xs">
              <Skeleton width={80} className="mt-[6px]" />
              <Skeleton circle={true} height={18.31} width={18.31} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

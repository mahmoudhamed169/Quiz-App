export default function TableSkeleton() {
  return (
    <div>
      <table className="w-full mt-5 border-separate">
        <thead className="text-[#ffff] text-left border">
          <tr>
            <th className="bg-[#0D1321] font-normal py-2 text-xs rounded-s px-4">
              <div className="bg-gray-300 h-4 w-20 rounded animate-pulse"></div>
            </th>
            <th className="bg-[#0D1321] font-normal py-2 text-xs px-4">
              <div className="bg-gray-300 h-4 w-32 rounded animate-pulse"></div>
            </th>
            <th className="bg-[#0D1321] font-normal py-2 text-xs px-4">
              <div className="bg-gray-300 h-4 w-32 rounded animate-pulse"></div>
            </th>
            <th className="bg-[#0D1321] font-normal py-2 text-xs px-4">
              <div className="bg-gray-300 h-4 w-16 rounded animate-pulse"></div>
            </th>
            <th className="bg-[#0D1321] font-normal py-2 text-xs px-4 rounded-e">
              <div className="bg-gray-300 h-4 w-16 rounded animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border border-[#00000033] rounded-s">
                <div className="bg-gray-300 h-4 w-full rounded animate-pulse"></div>
              </td>
              <td className="py-2 px-4 border border-[#00000033]">
                <div className="bg-gray-300 h-4 w-full rounded animate-pulse"></div>
              </td>
              <td className="py-2 px-4 border border-[#00000033]">
                <div className="bg-gray-300 h-4 w-full rounded animate-pulse"></div>
              </td>
              <td className="py-2 px-4 border border-[#00000033]">
                <div className="bg-gray-300 h-4 w-full rounded animate-pulse"></div>
              </td>
              <td className="py-2 px-4 border border-[#00000033] rounded-e">
                <div className="bg-gray-300 h-4 w-full rounded animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

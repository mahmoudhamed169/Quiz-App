import { ChevronsRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ResultResponse } from "../../../InterFaces/Interfaces";
import { convertDate } from "../Quizzes/Quizzes";

interface LocationState {
  state: {
    result: ResultResponse;
  };
}

export default function QuizeResult() {
  const location = useLocation() as LocationState;
  const { result } = location.state;
  const {participants}=result
  console.log(participants);
  
  return (
    <>
      <div className="m-5 ">
        <div className="flex gap-[5px] font-semibold">
          <h3><Link to={'/dashboard/results'}>Quizzes</Link> </h3>
          <ChevronsRight color="#C5D86D" />
          <h3>{result.quiz.title}</h3>
        </div>

        <div className="max-w-[550px] border mt-[35px] p-4 rounded-xl font-bold ">
          <h3 className="text-xl">Results</h3>

          <table className="w-full mt-3 border-separate">
            <thead className="text-[#ffff] text-left border">
              <tr>
                <th className="bg-[#0D1321] font-bold py-2 text-sm rounded-s px-4">
                  Student name
                </th>
                <th className="bg-[#0D1321] font-bold py-2 text-sm px-4">Score</th>
                <th className="bg-[#0D1321] font-bold py-2 text-sm px-4">Quiz Name</th>
                <th className="bg-[#0D1321] font-bold py-2 text-sm px-4 rounded-e">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              ) : (
                participants.map((participant) => (
                  <tr key={participant._id} className="font-medium text-sm">
                    <td className="py-2 px-4 border border-[#00000033] rounded-s">
                      {participant?.participant?.first_name} {participant?.participant?.last_name}
                    </td>
                    <td className="py-2 px-4 border border-[#00000033]">{participant.score}</td>
                    <td className="py-2 px-4 border border-[#00000033]">
                      {participant?.quiz.title}
                    </td>
                    <td className="py-2 px-4 border border-[#00000033] rounded-e">
                      
                      {convertDate(participant?.started_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

import TrueIcone from "../../../Icones/TrueIcone";
import { Loader } from "lucide-react";
interface Iprops {
  text: string;
  isSubmitting: boolean;
}
export default function ButtonForm({ text, isSubmitting }: Iprops) {
  return (
    <button
      className={`w-[150px] h-[50px] ${
        isSubmitting ? "bg-[#D3D3D3]" : "bg-[#F5F5F5]"
      } font-bold text-lg rounded-lg text-[#000] flex justify-center items-center gap-2`}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span>Loading...</span>
          <Loader className="loader-spin" />
        </>
      ) : (
        <>
          <p>{text}</p>
          <TrueIcone />
        </>
      )}
    </button>
  );
}

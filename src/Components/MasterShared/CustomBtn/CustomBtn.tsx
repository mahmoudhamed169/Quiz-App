import AddIcone from "../../../Icones/AddIcone";
interface IProps {
  text: string;
}

export default function CustomBtn({ text }: IProps) {
  return (
    <>
      <button className="flex items-center gap-[5px] border border-[#0000005b] h-[40px] p-3 rounded-3xl">
        <AddIcone />
        <p>{text}</p>
      </button>
    </>
  );
}

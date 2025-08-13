import { redirect } from "next/navigation";

export default function Search () {
    const createProduct = () => {
        return redirect(`/create`)
    }
    return (
        <div className="static bg-gray-200 flex w-full h-[50px] items-center justify-center gap-1 my-5">
            <img className="w-[25px] h-[25px]" src="/search.svg" alt="" />
            <input className="bg-white h-[25px] rounded-md" type="text" />
            <button className="absolute right-[-100px] w-[100px] bg-gray-100 hover:bg-gray-300 transition-all duration-300 rounded-sm" onClick={createProduct}>Create</button>
        </div>

    )
}
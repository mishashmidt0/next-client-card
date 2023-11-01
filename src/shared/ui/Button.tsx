import {ButtonHTMLAttributes} from "react";
import cc from "@/src/shared/lib/classcat";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    text:string
    className?:string
}

export default function Button({text,className, ...other}:Props) {

    return <button
        {...other}
        type="submit"
        className={cc([className, "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"])}>
        {text}
    </button>

}
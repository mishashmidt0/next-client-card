import Link from "next/link";
import {ROUTES} from "@/src/shared/const/routes";

interface Props {
    href?:string;
    title?:string;
}
export default function Back({href=ROUTES.main,title='На главную'}:Props){
    return  <Link href={href} className={'absolute top-10 left-10 font-medium bg-green-200 p-3'} >{title}</Link>
}
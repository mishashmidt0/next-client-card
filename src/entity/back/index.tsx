import Link from "next/link";

import { ROUTES } from "@/src/shared/const/routes";
import { Button } from "@/src/shared/ui/button";

interface Props {
  href?: string;
  title?: string;
}
export default function Back({
  href = ROUTES.main,
  title = "На главную",
}: Props) {
  return (
    <Button className={"absolute top-10 left-10"} variant={"link"}>
      <Link href={href}>{title}</Link>
    </Button>
  );
}

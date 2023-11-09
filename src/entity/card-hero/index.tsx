import { useState } from "react";

import Image from "next/image";

import { BASE_URL } from "@/src/shared/const/api-const";
import { Button } from "@/src/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
interface Props {
  url: string;
  name: string;
}
export default function CardHero({ url, name }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Card className={"bg-white"}>
      <CardHeader>
        <CardTitle className={"text-lg overflow-hidden text-center truncate"}>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={isVisible ? `${BASE_URL + "/" + url}` : "/not.png"}
          alt={"mimetype"}
          className={"aspect-square object-cover"}
          width={180}
          height={180}
        />
      </CardContent>
      <CardFooter className={"justify-center"}>
        <Button
          variant={"outline"}
          onClick={() => {
            setIsVisible((prev) => !prev);
          }}
        >
          {isVisible ? "скрыть" : "показать"}
        </Button>
      </CardFooter>
    </Card>
  );
}

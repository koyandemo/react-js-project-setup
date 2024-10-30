'use client';

import { useNavigate } from "react-router-dom";
import Text from "./typography/Text";
import { LeftIcon } from "@/utils/appIcon";



type Props = {
  title: string;
  href?: string;
};

export default function MainContainerHeader({ title}: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer w-fit"
      onClick={() => navigate(-1)}
    >
      <div className="flex items-center gap-4">
        <LeftIcon />
        <Text
          label={title}
          size="md"
          cursor="pointer"
          className="text-[#1E293B]"
          weight="medium"
        />
      </div>
    </div>
  );
}

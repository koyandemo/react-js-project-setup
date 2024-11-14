import Text from "@/components/typography/Text"
import { UpArrowIcon} from "@/utils/appIcon"


const Home = () => {
  return (
    <div className="flex w-full border border-[#E2E8F0]">
      <div className="w-full h-[150px] flex flex-col gap-[13px] justify-center items-center bg-white  border-r border-gray-200">
        <div className="flex items-center gap-[10px]">
            <Text label="18.6K" size="xl" weight="bold" className="text-[#475569]" />
            <div className="flex items-center gap-[4px]">
              <UpArrowIcon />
            <Text label="18%" size="sm" weight="medium" className="text-[#008844]" />
            </div>
        </div>
        <div>
          <Text label="Active Users" size="sm" weight="medium" className="text-[#94A3B8]" />
        </div>
      </div>
      <div className="w-full h-[150px] flex flex-col gap-[13px] justify-center items-center bg-white border-r border-gray-200">
        <div className="flex items-center gap-[10px]">
            <Text label="18.6K" size="xl" weight="bold" className="text-[#475569]" />
            <div className="flex items-center gap-[4px]">
              <UpArrowIcon />
            <Text label="18%" size="sm" weight="medium" className="text-[#008844]" />
            </div>
        </div>
        <div>
          <Text label="Active Users" size="sm" weight="medium" className="text-[#94A3B8]" />
        </div>
      </div>
      <div className="w-full h-[150px] flex flex-col gap-[13px] justify-center items-center bg-white border-r border-gray-200">
        <div className="flex items-center gap-[10px]">
            <Text label="18.6K" size="xl" weight="bold" className="text-[#475569]" />
            <div className="flex items-center gap-[4px]">
              <UpArrowIcon />
            <Text label="18%" size="sm" weight="medium" className="text-[#008844]" />
            </div>
        </div>
        <div>
          <Text label="Active Users" size="sm" weight="medium" className="text-[#94A3B8]" />
        </div>
      </div>
      <div className="w-full h-[150px] flex flex-col gap-[13px] justify-center items-center bg-white">
        <div className="flex items-center gap-[10px]">
            <Text label="18.6K" size="xl" weight="bold" className="text-[#475569]" />
            <div className="flex items-center gap-[4px]">
              <UpArrowIcon />
            <Text label="18%" size="sm" weight="medium" className="text-[#008844]" />
            </div>
        </div>
        <div>
          <Text label="Active Users" size="sm" weight="medium" className="text-[#94A3B8]" />
        </div>
      </div>
    </div>
  )
}

export default Home

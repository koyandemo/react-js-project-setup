import DropDownDefault from "@/components/dropDown/DropDownDefault"
import Input from "@/components/input/Input"
import MainContainer from "@/components/MainContainer"

const FeedBack = () => {


  return (
    <MainContainer background="#FFFFFF">  
      <div>
        <div className="flex items-center gap-[24px]">
        <Input name="search" type="string" size="lg" placeholder="Search Name,Email,etc..."  value="" className="pl-[35px]" callBack={(e) => {console.log(e)}} />
        <DropDownDefault label="Rating" size="lg"  callBack={() => {}}/>
        </div>
      </div>
    </MainContainer>
  )
}

export default FeedBack

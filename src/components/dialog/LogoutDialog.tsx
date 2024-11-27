import DialogContainer from './DialogContainer';
import Text from '../typography/Text';
import ButtonCustom from '@/button/ButtonCustom';
import useDialogStore from '@/store/useDialogStore';

const LogoutDialog = () => {
  const { closeDialog} = useDialogStore();
  return (
    <DialogContainer title="Logout" width={450}>
      <div className="flex flex-col justify-center gap-[30px] pt-[30px]">
        <Text label="Are you sure to Logout?" />
        <div className="flex gap-[10px] justify-between">
          <ButtonCustom
            type="submit"
            size="full"
            className="text-white"
            callBack={() => {
              closeDialog();
            }}
          >
            Cancel
          </ButtonCustom>
          <ButtonCustom
            type="submit"
            size="full"
            className="text-white"
            callBack={() => {
              localStorage.removeItem("token");
              window.location.assign("/sign-in")
            }}
          >
            Yes
          </ButtonCustom>
        </div>
      </div>
    </DialogContainer>
  );
};

export default LogoutDialog;

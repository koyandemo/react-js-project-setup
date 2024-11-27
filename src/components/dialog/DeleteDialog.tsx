import ButtonCustom from '@/button/ButtonCustom';
import Text from '../typography/Text';
import DialogContainer from './DialogContainer';
import { Dispatch, SetStateAction } from 'react';
import { DeleteDialogT } from '@/types/deleteDialog';

type Props = {
  callBack: () => void;
  deleteDialog:DeleteDialogT;
  setDeleteDialog: Dispatch<SetStateAction<DeleteDialogT>>;
};

const DeleteDialog = ({deleteDialog, setDeleteDialog, callBack }: Props) => {
  return (
    <DialogContainer
      title="Delete Confirmation"
      width={450}
      onCloseClick={() => {
        setDeleteDialog({
          id: 0,
          show: false,
          loading: false
        });
      }}
    >
      <div className="flex flex-col justify-center gap-[30px] pt-[30px]">
        <Text label="Are you sure want to delete ?" />
        <div className="flex gap-[10px] justify-between">
          <ButtonCustom
            type="submit"
            size="full"
            className="text-white"
            disabled={deleteDialog.loading}
            callBack={() => {
              setDeleteDialog({
                id: 0,
                show: false,
                loading:false
              });
            }}
          >
            Cancel
          </ButtonCustom>
          <ButtonCustom
            type="submit"
            size="full"
            disabled={deleteDialog.loading}
            className="text-white"
            callBack={() => {callBack()}}
          >
            Yes
          </ButtonCustom>
        </div>
      </div>
    </DialogContainer>
  );
};

export default DeleteDialog;

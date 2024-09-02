import TableRow from "../../UI/TableRow";
import TableData from "../../UI/TableData";
import Button from "../../UI/Button";
import ModalLittle from "../../UI/ModalLittle";
import { FaUserLargeSlash } from "react-icons/fa6";
import { RiUserUnfollowFill } from "react-icons/ri";
import { FaUserLock } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import useUpdateUserStatus from "./useUpdateUserStatus";
import toast from "react-hot-toast";

export default function UserTableCard({ user }) {
  const { isUpdateError, isUpdating, updateUserStatus } = useUpdateUserStatus();
  function handleUserAction(status) {
    updateUserStatus(
      {
        id: user.userId,
        status: status,
      },
      {
        onSuccess: () => {
          toast.success(`user status has been set to ${status} successfully`);
        },
      },
    );
  }

  return (
    <TableRow>
      <TableData hasBoldText={true}>{user.userName}</TableData>
      <TableData>{user.email}</TableData>
      <TableData>{user.role}</TableData>
      <TableData>{user.location}</TableData>
      <TableData>{user.contact}</TableData>
      <TableData>{user.status}</TableData>

      <TableData>
        <ModalLittle>
          <ModalLittle.OpenModalLittle openName={`status${user.userId}`}>
            <Button disable={isUpdating} type="green">
              Actions
            </Button>
          </ModalLittle.OpenModalLittle>
          <ModalLittle.ModalLittleWindow
            position="absolute bottom-[-7rem] right-[-3rem] z-50  "
            openName={`status${user.userId}`}
          >
            <div className="flex flex-col gap-1 ">
              <p className="rounded-sm bg-slate-100 p-1 font-bold ">
                set the user status to :
              </p>
              <Button
                disable={isUpdating}
                onclick={() => handleUserAction("deleted")}
                type="nav"
              >
                <RiUserUnfollowFill className="mr-1 text-lg" /> Deleted
              </Button>
              <Button
                disable={isUpdating}
                onclick={() => handleUserAction("suspended")}
                type="nav"
              >
                <FaUserLock className="mr-1 text-lg" /> Suspended
              </Button>
              <Button
                disable={isUpdating}
                onclick={() => handleUserAction("inactive")}
                type="nav"
              >
                <FaUserLargeSlash className="mr-1 text-lg" /> Inactive
              </Button>
              <Button
                disable={isUpdating}
                onclick={() => handleUserAction("active")}
                type="nav"
              >
                <FaUserCheck className="mr-1 text-lg" /> Active
              </Button>
            </div>
          </ModalLittle.ModalLittleWindow>
        </ModalLittle>
      </TableData>
    </TableRow>
  );
}

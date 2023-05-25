import { initialSettings, UserData } from "./context";

const getSelectedUser = (userData?: UserData[], selectedUser?: string) => {
  return (
    userData?.filter((item) => item.accountId === selectedUser)![0] ||
    initialSettings.userData[0]
  );
};
export default getSelectedUser;

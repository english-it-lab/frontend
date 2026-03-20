import type { Dispatch, SetStateAction } from "react";
import { Button, Modal } from "@mui/material";

import { useAppSelector, useAppDispatch } from "@/hooks/redux_hooks";
import type { IUser } from "@/interfaces/userInterface";
import { userSlice } from "@/slices/userSlice";
import styles from "@/styles/RoleChoiceModal.module.scss";

type RoleChoiceProps = {
  editRole: boolean;
  setEditRole: Dispatch<SetStateAction<boolean>>;
};

const RoleChoiceModal = ({ editRole, setEditRole }: RoleChoiceProps) => {
  const { setUser } = userSlice.actions;
  const initialUser =
    useAppSelector((state) => state.userReducer.user) || ({} as IUser);
  const dispatch = useAppDispatch();

  const changeRole = (role: string) => {
    dispatch(setUser({ ...initialUser, currentRole: role }));
    setEditRole(false);
    // Добавить request для смены роли на сервере
  };

  return (
    <Modal open={editRole} onClose={() => setEditRole(false)}>
      <div className={styles.rolePageContainer}>
        <div className={styles.roleChoiceContainer}>
          <h1>Я захожу в качестве...</h1>

          <div className={styles.rolesContainer}>
            <div className={styles.roleChoiceForm}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                className={styles.roleButton}
                onClick={() => changeRole("Участник")}
              >
                Участник
              </Button>
            </div>

            <div className={styles.roleChoiceForm}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                className={styles.roleButton}
                onClick={() => changeRole("Организатор")}
              >
                Организатор
              </Button>
            </div>

            <div className={styles.roleChoiceForm}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                className={styles.roleButton}
                onClick={() => changeRole("Член жюри")}
              >
                Член жюри
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoleChoiceModal;

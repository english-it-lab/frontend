import { useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button, Modal } from "@mui/material";

import styles from "@/styles/DoubleAuthenticationModal.module.scss";

type AuthenticationModalProps = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
  checkAuthCode: () => void;
};

const DoubleAuthenticationModal = ({
  modalOpen,
  setModalOpen,
  email,
  checkAuthCode,
}: AuthenticationModalProps) => {
  const [value_1, setValue_1] = useState<string>("");
  const [value_2, setValue_2] = useState<string>("");
  const [value_3, setValue_3] = useState<string>("");
  const [value_4, setValue_4] = useState<string>("");
  const [value_5, setValue_5] = useState<string>("");
  const [value_6, setValue_6] = useState<string>("");

  const setters: Dispatch<SetStateAction<string>>[] = [
    setValue_1,
    setValue_2,
    setValue_3,
    setValue_4,
    setValue_5,
    setValue_6,
  ];

  const handleInputChange = (event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    const id = Number((event.target as HTMLInputElement).id);

    if (value.length > 1) return;

    setters[id - 1](value);

    if (value.length === 1) {
      if (id < 6) {
        document.getElementById((id + 1).toString())?.focus();
        return;
      }

      (event.target as HTMLInputElement).blur();
      return;
    }

    if (id > 1) {
      document.getElementById((id - 1).toString())?.focus();
      return;
    }
  };

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <div className={styles.authModal}>
        <h1>Подтвердите вход</h1>
        <p>Код подтверждения отправлен на адрес</p>
        <p>{email}</p>
        <div>
          <input id="1" value={value_1} onChange={handleInputChange} />
          <input id="2" value={value_2} onChange={handleInputChange} />
          <input id="3" value={value_3} onChange={handleInputChange} />
          <input id="4" value={value_4} onChange={handleInputChange} />
          <input id="5" value={value_5} onChange={handleInputChange} />
          <input id="6" value={value_6} onChange={handleInputChange} />
        </div>
        <div className={styles.authAgreementForm}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            className={styles.authButton}
            onClick={checkAuthCode}
          >
            Ввести
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DoubleAuthenticationModal;

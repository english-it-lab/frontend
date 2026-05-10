import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PATHS from "@/constants/paths.ts";
import type { IUser } from "@/interfaces/userInterface.ts";

import styles from "./UserCard.module.scss";

type UserCardProps = {
  currentUser: IUser;
};

const UserCard = ({ currentUser }: UserCardProps) => {
  const navigate = useNavigate();
  const { firstname, lastname, currentRole } = currentUser;

  const handleClick = () => {
    navigate(PATHS.PROFILE);
  };

  return (
    <Box className={styles.card} onClick={handleClick}>
      <Avatar />
      <Box>
        <Typography variant="subtitle1">{`${firstname} ${lastname}`}</Typography>
        <Typography variant="body2" color="inherit">
          {currentRole}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserCard;

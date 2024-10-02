import { MenuItem, MenuList, Paper, Typography } from "@mui/material";

type MenuProps = {
  open: boolean;
  ActivityLogsOnClick: () => void;
  BlockedUsersOnClick: () => void;
  ReportsOnClick: () => void;
};

const Menu = ({
  open,
  ActivityLogsOnClick,
  BlockedUsersOnClick,
  ReportsOnClick,
}: MenuProps) => {
  const styles = open
    ? "block" +
      " " +
      "flex flex-col items-start bg-slate-400 rounded-md p-4 absolute right-[0%] top-[-300%]"
    : "none";
  console.log(styles);
  return (
    <Paper sx={{ width: 170 }} className={styles}>
      <MenuList>
        <MenuItem onClick={ActivityLogsOnClick}>
          <Typography variant="inherit" noWrap>
            Activity Logs
          </Typography>
        </MenuItem>
        <MenuItem onClick={BlockedUsersOnClick}>
          <Typography variant="inherit" noWrap>
            Blocked Users
          </Typography>
        </MenuItem>
        <MenuItem onClick={ReportsOnClick}>
          <Typography variant="inherit" noWrap>
            Reports
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default Menu;

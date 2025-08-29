import type { Dispatch, SetStateAction } from "react";
import { Filter } from "@/types/types";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

interface MenuProps {
  activeCount: number;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  clearCompleted: () => void;
}

export default function Menu({
  activeCount,
  filter,
  setFilter,
  clearCompleted,
}: MenuProps) {
  console.log(Object.entries(Filter), filter);
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>Осталось: {activeCount}</Typography>
      <ButtonGroup size="small">
        {Object.entries(Filter).map(([, value]) => (
          <Button
            variant={filter === value ? "contained" : "outlined"}
            onClick={() => setFilter(value)}
          >
            {value}
          </Button>
        ))}
      </ButtonGroup>
      <Button size="small" variant="outlined" onClick={clearCompleted}>
        Удалить завершенные
      </Button>
    </Box>
  );
}

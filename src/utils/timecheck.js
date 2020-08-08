export const validDuration = (start, end) => {
  if (start.substring(0, 2).localeCompare(end.substring(0, 2) < 0)) return true;
  else if (start.substring(0, 2).localeCompare(end.substring(0, 2) > 0))
    return false;
  else {
    if (start.substring(3).localeCompare(end.substring(3) < 0)) return true;
    else return false;
  }
};

export const validBreak = (start, end, startBreak, endBreak) => {
  if (start.substring(0, 2).localeCompare(end.substring(0, 2) < 0)) {
    if (
      start.localeCompare(startBreak) <= 0 &&
      end.localeCompare(endBreak) >= 0
    )
      return true;
    else return false;
  } else if (start.substring(0, 2).localeCompare(end.substring(0, 2) > 0))
    return false;
  else {
    if (start.substring(3).localeCompare(end.substring(3) < 0)) {
      if (
        start.localeCompare(startBreak) <= 0 &&
        end.localeCompare(endBreak) >= 0
      )
        return true;
      else return false;
    } else return false;
  }
};

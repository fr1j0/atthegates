export const hideEID = (eid) => {
  if (!eid) return "";
  const splitted = eid.split("-");
  if (splitted[2]) splitted[2] = splitted[2].replace(/./g, "*");
  return splitted.join("-");
};

export const hidePPN = (ppn) => {
  if (!ppn) return "";
  return ppn.replace(/^(.{5}).+$/, "$1****");
};

export const hideDoB = (dob) => {
  if (!dob) return "";
  return dob.replace(/./g, "*");
};

export const formatHours = (hours) => {
  switch (true) {
    case hours < 1:
      return `${hours} hours`;
    case hours >= 1 && hours < 2:
      return `${hours} hour`;
    case hours > 2 && hours < 24:
      return `${hours} hours`;
    case hours > 24 && hours < 48:
      return `${Math.floor(hours / 24)} day`;
    case hours >= 48:
      return `${Math.floor(hours / 24)} days`;
  }
};

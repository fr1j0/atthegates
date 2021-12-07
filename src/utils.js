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

export const publisher = (publisher: string): string => {
  return publisher
    .toLocaleLowerCase()
    .replace(/ /g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const character = (character: string): string => {
  return character
    .toLocaleLowerCase()
    .replace(/ /g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

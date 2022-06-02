export * as currency from "./currency";
export * as jwt from "./jwt";
export * as validations from "./validations";
export * as query from "./query";
export * from "./countries";

export const characterQueryToName = (query: string) => {
  switch (query) {
    case "batman":
      return "Batman";
    case "catwoman":
      return "Catwoman";
    case "doom-patrol":
      return "Doom Patrol";
    case "flash":
      return "Flash";
    case "superman":
      return "Superman";
    case "watchmen":
      return "Watchmen";
    case "swamp-thing":
      return "Swamp Thing";
    case "preacher":
      return "Preacher";
    case "spider-man":
      return "Spider-Man";
    case "x-men":
      return "X-Men";
    case "daredevil":
      return "Daredevil";
    default:
      return "all";
  }
};

export const characterNameToQuery = (name: string) => {
  switch (name) {
    case "Batman":
      return "batman";
    case "Catwoman":
      return "catwoman";
    case "Doom Patrol":
      return "doom-patrol";
    case "Flash":
      return "flash";
    case "Superman":
      return "superman";
    case "Watchmen":
      return "watchmen";
    case "Swamp Thing":
      return "swamp-thing";
    case "Preacher":
      return "preacher";
    case "Spider-Man":
      return "spider-man";
    case "X-Men":
      return "x-men";
    case "Daredevil":
      return "daredevil";
    default:
      return "all";
  }
};

export const publisherQueryToName = (query: string) => {
  switch (query) {
    case "marvel-comics":
      return "Marvel Cómics";
    case "dc-comics":
      return "DC Cómics";
    case "dc-black-label":
      return "DC Black Label";
    default:
      return "all";
  }
};

export const publisherNameToQuery = (name: string) => {
  switch (name) {
    case "Marvel Cómics":
      return "marvel-comics";
    case "DC Cómics":
      return "dc-comics";
    case "DC Black Label":
      return "dc-black-label";
    default:
      return "all";
  }
};

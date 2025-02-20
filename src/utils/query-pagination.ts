import { Query } from "../interface/Query";

export const queryPagination = (query: Query) => {
    const { page = "1", perPage = "10" } = query;
    return {
      take: Number(perPage),
      skip: (Number(page) - 1) * Number(perPage),
    };
  };
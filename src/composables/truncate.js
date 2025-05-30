export const truncate = (data, value, indicate = "...") => {
    if (data?.length > value) return data.slice(0, value) + indicate;
    else return data;
  };
import queryString from "query-string";

export const getCountryId = (countries, nausys_id) => {
  if (!countries) return;
  return countries.find((e) => e.nausys_id === nausys_id)?.id;
}

// backward compatibility with react-router 3
export const getSelectedFromQuery = (search) =>
  queryString.parse(search).selected || 1;


export const stripHtmlTags = html => html.replace(/<\/?[^>]+(>|$)/g, "");

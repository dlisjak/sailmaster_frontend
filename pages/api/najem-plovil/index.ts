import { getSearchResultsFromApi } from '../../../queries/getters';

// export const config = {
//   runtime: 'edge',
// };

const allowedMethods = ['GET'];

export default async function handler(req, res) {
  const search = req.query;
  console.log({ search });
  try {
    if (!allowedMethods.includes(req.method) || req.method == 'OPTIONS') {
      return res.status(405).send({ message: 'Method not allowed.' });
    }

    const { data } = await getSearchResultsFromApi(search);

    return res.status(200).send(data);
  } catch (err) {
    // console.error(err);

    res.status(500).send({ message: 'Server error!' });
  }
}

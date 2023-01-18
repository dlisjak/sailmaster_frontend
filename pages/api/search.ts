import { getSearchResults } from '../../queries/getters';

const allowedMethods = ['GET'];

export default async function handler(req, res) {
  const {
    destinations,
    period_from,
    period_to,
    yacht__cabins_total__lte,
    yacht__build_year__lte,
    client_price__lte,
    yacht__yacht_model__loa__lte,
    yacht__wc__lte,
    yacht__yacht_model__category__yachtdisplaycategory,
    yacht__yacht_model__builder,
  } = req.query;

  try {
    if (!allowedMethods.includes(req.method!) || req.method == 'OPTIONS') {
      return res.status(405).send({ message: 'Method not allowed.' });
    }

    const { data } = await getSearchResults(
      destinations,
      period_from,
      period_to,
      yacht__cabins_total__lte,
      yacht__build_year__lte,
      client_price__lte,
      yacht__yacht_model__loa__lte,
      yacht__wc__lte,
      yacht__yacht_model__category__yachtdisplaycategory,
      yacht__yacht_model__builder
    );

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);

    res.status(500).send({ message: 'Server error!' });
  }
}

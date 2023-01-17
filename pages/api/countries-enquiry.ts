import { getCountriesEnquiries } from '../../queries/getters';

const allowedMethods = ['GET'];

export default async function handler(req, res) {
  try {
    if (!allowedMethods.includes(req.method!) || req.method == 'OPTIONS') {
      return res.status(405).send({ message: 'Method not allowed.' });
    }

    const { data } = await getCountriesEnquiries();

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);

    res.status(500).send({ message: 'Server error!' });
  }
}

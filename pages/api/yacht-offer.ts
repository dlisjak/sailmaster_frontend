import { getYachtOffer } from '../../queries/getters';

const allowedMethods = ['GET'];

export default async function handler(req, res) {
  const { yachtId } = req.query;

  try {
    if (!allowedMethods.includes(req.method!) || req.method == 'OPTIONS') {
      return res.status(405).send({ message: 'Method not allowed.' });
    }

    const { data } = await getYachtOffer();

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);

    res.status(500).send({ message: 'Server error!' });
  }
}

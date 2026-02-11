import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const planets = await db.collection('planets').find({}).toArray();
      res.status(200).json(planets);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: 'Unable to fetch planets' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

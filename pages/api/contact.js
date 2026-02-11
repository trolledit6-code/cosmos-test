import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const { db } = await connectToDatabase();
      await db.collection('contacts').insertOne({
        name,
        email,
        message,
        createdAt: new Date(),
      });
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to send message' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

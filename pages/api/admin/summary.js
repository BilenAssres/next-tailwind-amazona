import { getToken } from 'next-auth/jwt';
import Product from '../../../models/Product';
import User from '../../../models/User';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  await db.connect();

  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();


  
  

  await db.disconnect();
  res.send({ productsCount, usersCount });
};

export default handler;

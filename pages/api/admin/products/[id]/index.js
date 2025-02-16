import { getToken } from 'next-auth/jwt';
import Product from '../../../../../models/Product';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  if (req.method === 'POST') {
    return postHandler(req, res, user);
  }
  else if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};
const postHandler = async (req, res) => {
  return res.status(400).send({message: 'here'});
  // await db.connect();

  // const {
  //   name,
  //   slug,
  //   category,
  //   image,
  //   price,
  //   brand,
  //   isSoldOut,
  //   description,
  //   isFeatured,
  //   mobile,
  // } = req.body;

  // const product = new Product({
  //   name,
  //   slug,
  //   category,
  //   image,
  //   price,
  //   brand,
  //   isSoldOut,
  //   description,
  //   isFeatured,
  //   mobile,
  // });

  // await product.save();
  // await db.disconnect();

  // res.status(201).send({ message: 'Product created successfully' });
};
const putHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.category = req.body.category;
    product.image = req.body.image;
    product.price = req.body.price;
    product.brand = req.body.brand;
    product.isSoldOut = req.body.isSoldOut;
    product.description = req.body.description;
    product.isFeatured = req.body.isFeatured;
    product.mobile = req.body.mobile;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Product updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.deleteOne();
    await db.disconnect();
    res.send({ message: 'Product deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};
export default handler;

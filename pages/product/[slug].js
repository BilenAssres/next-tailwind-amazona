import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';

export default function ProductScreen(props) {
  const { product } = props;
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link
          href="/"
          className="text-white bg-[#0e4408] p-2 rounded font-bold"
        >
          &#60;
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">Product name: {product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>Description: {product.description}</li>
            <li>Mobile: {product.mobile}</li>
            <li>Status: {product.status}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>ETB {product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.isSoldOut > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>

            <a className="primary-button w-full" href={`tel:${product.mobile}`}>
              <i className="fas fa-phone"></i>
              <span className="ml-2">Call: {product.mobile}</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

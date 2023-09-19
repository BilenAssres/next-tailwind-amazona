import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';

export default function AdminProductCreateScreen() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/admin/products', data);
      console.log(response)
      setLoading(false);
      toast.success('Product created successfully');
      router.push('/admin/products');
    } catch (err) {
      setLoading(false);
      setError(getError(err));
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Create Product">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/products" className="font-bold">
                Products
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="mb-4 text-xl">Create Product</h1>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="w-full"
                id="name"
                autoFocus
                {...register('name', {
                  required: 'Please enter name',
                })}
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="w-full"
                id="price"
                {...register('price', {
                  required: 'Please enter price',
                })}
              />
              {errors.price && (
                <div className="text-red-500">{errors.price.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="imageFile">Upload image</label>
              <input
                type="file"
                className="w-full"
                id="imageFile"
                {...register('image', {
                  required: 'Please upload an image',
                })}
              />
              {errors.image && (
                <div className="text-red-500">{errors.image.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="w-full"
                id="description"
                {...register('description', {
                  required: 'Please enter description',
                })}
              />
              {errors.description && (
                <div className="text-red-500">
                  {errors.description.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                className="w-full"
                id="mobile"
                {...register('mobile', {
                  required: 'Please enter mobile',
                })}
              />
              {errors.mobile && (
                <div className="text-red-500">{errors.mobile.message}</div>
              )}
            </div>
            <div className="mb-4">
              <button disabled={loading} className="primary-button">
                {loading ? 'Loading' : 'Create'}
              </button>
            </div>
            <div className="mb-4">
              <Link href={`/admin/products`}>Back</Link>
            </div>
            {error && <div className="alert-error">{error}</div>}
          </form>
        </div>
      </div>
    </Layout>
  );
}

AdminProductCreateScreen.auth = { adminOnly: true };
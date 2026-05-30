import React, { useContext, useState } from 'react';
import Gallery from './Gallery.jsx';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';

import AppContext from '../contexts/AppContext.js';
import { axiosInstance } from '../lib/axios.js';
import { GridPattern } from '../components/ui/GridPattern.jsx';
import { cn } from '../lib/utils.js';

const createEmptyField = () => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  url: '',
  status: 'idle',
  error: '',
});

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { setImages } = useContext(AppContext);
  const [fields, setFields] = useState([createEmptyField()]);

  const handleLogout = async () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    navigate('/secure-admin/login-access');
  };

  const duplicateCounts = fields.reduce((counts, field) => {
    const value = field.url.trim();
    if (!value) return counts;
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});

  const addField = () => {
    setFields((prev) => [...prev, createEmptyField()]);
  };

  const removeField = (id) => {
    setFields((prev) => {
      if (prev.length === 1) return [createEmptyField()];
      return prev.filter((field) => field.id !== id);
    });
  };

  const updateField = (id, nextValue) => {
    setFields((prev) => prev.map((field) => {
      if (field.id !== id) return field;

      return {
        ...field,
        url: nextValue,
        status: nextValue.trim() ? 'loading' : 'idle',
        error: '',
      };
    }));
  };

  const markFieldPreviewStatus = (id, status, error = '') => {
    setFields((prev) => prev.map((field) => {
      if (field.id !== id) return field;

      return {
        ...field,
        status,
        error,
      };
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const urls = fields.map((field) => field.url.trim()).filter(Boolean);

    if (!urls.length) {
      return toast.error('No image(s) provided');
    }

    const duplicateUrl = Object.entries(duplicateCounts).find(([, count]) => count > 1);
    if (duplicateUrl) {
      return toast.error(`Duplicate URL not allowed: ${duplicateUrl[0]}`);
    }

    const invalidField = fields.find((field) => field.url.trim() && field.status === 'error');
    if (invalidField) {
      return toast.error('Please fix invalid image URL previews before uploading');
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Session expired! Please login again.');
        return navigate('/secure-admin/login-access');
      }

      const { data } = await axiosInstance.post('/api/images/add-image', { img_urls: urls }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        const inserted = data.inserted || data.image ? (data.inserted || [data.image]) : [];

        if (inserted.length) {
          toast.success(`${inserted.length} image(s) uploaded`);
          setImages((prev) => [...inserted, ...prev]);
        }

        if (data.skipped && data.skipped.length) {
          toast.info(`${data.skipped.length} URL(s) skipped (already exist)`);
        }

        setFields([createEmptyField()]);
      } else {
        toast.error(data.message || 'Upload failed');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='pt-20 relative'>
      <GridPattern
        width={30}
        height={30}
        x={0}
        y={0}
        strokeDasharray='4 2'
        className={cn('[mask-image:radial-gradient(1700px_circle_at_center,white,red)]')}
      />

      <div className='flex justify-end p-4'>
        <button
          className='bg-zinc-600 z-10 text-white cursor-pointer px-4 py-2 rounded hover:bg-zinc-400 transition duration-200'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <section className='min-h-[63vh] p-10 text-zinc-300 flex flex-col justify-center items-center'>
        <h2 className='text-2xl font-bold mb-6 z-10'>Admin Dashboard</h2>

        <form
          onSubmit={handleFormSubmit}
          className='flex z-10 flex-col justify-center items-center gap-6 border border-zinc-300 p-6 rounded-lg max-w-[56vw] w-full bg-[#39393984] shadow-lg mb-[-5em]'
        >
          <div className='flex flex-col items-center justify-center gap-5 w-full'>
            <div className='flex flex-col gap-3 w-full'>
              <div className='flex justify-between items-center gap-5 w-full'>
                <label className='text-zinc-300 mb-2 text-lg font-semibold'>Image URLs:</label>

                <button
                  type='button'
                  onClick={addField}
                  className='bg-zinc-600 text-white px-3 py-1 rounded hover:bg-zinc-500'
                >
                  + Add URL
                </button>
              </div>

              <div className='mt-2 w-full flex flex-col gap-4'>
                {fields.map((field) => {
                  const isDuplicate = field.url.trim() && duplicateCounts[field.url.trim()] > 1;

                  return (
                    <div
                      key={field.id}
                      className='grid grid-cols-[1fr_140px_auto] items-start gap-3 rounded-xl border border-zinc-600 bg-zinc-900/40 p-3'
                    >
                      <div className='flex flex-col gap-2'>
                        <input
                          type='text'
                          value={field.url}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          placeholder='Paste image URL here...'
                          className={`p-2 rounded-lg w-full bg-zinc-700 text-white focus:outline-none focus:ring-2 transition duration-200 ${isDuplicate || field.status === 'error' ? 'ring-1 ring-red-400 focus:ring-red-400' : 'focus:ring-zinc-400'}`}
                        />

                        {isDuplicate && <p className='text-sm text-red-300'>Duplicate URL is not allowed.</p>}

                        {field.error && !isDuplicate && <p className='text-sm text-red-300'>{field.error}</p>}
                      </div>

                      <div className='flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950/50 p-2 min-h-[96px]'>
                        {field.url.trim() ? (
                          <img
                            src={field.url.trim()}
                            alt='Preview'
                            className='max-h-20 max-w-full object-contain'
                            onLoad={() => markFieldPreviewStatus(field.id, 'loaded')}
                            onError={() => markFieldPreviewStatus(field.id, 'error', 'Could not load image preview')}
                          />
                        ) : (
                          <span className='text-xs text-zinc-500'>Preview</span>
                        )}
                      </div>

                      <button
                        type='button'
                        onClick={() => removeField(field.id)}
                        className='h-10 rounded-lg bg-zinc-700 px-3 text-white hover:bg-zinc-500'
                        aria-label='Remove URL field'
                      >
                        -
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className='text-sm text-zinc-400 w-full'>
                Use + to add more fields. Keep every URL unique. Previews appear beside each input.
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className='bg-zinc-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-neutral-400 transition duration-200'
          >
            {loading ? <Loader className='w-4' /> : 'Upload'}
          </button>
        </form>

        <Gallery />
      </section>
    </main>
  );
};

export default AdminDashboard;

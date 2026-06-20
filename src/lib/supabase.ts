import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sdabyjmrsvtcnasxyxnn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkYWJ5am1yc3Z0Y25hc3h5eG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NjEwMzIsImV4cCI6MjA5NzUzNzAzMn0.LdrRH-ssV8cjlqDbJfU8luS6rCqBiKSkGwagP0onMzA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const UPLOADS_BUCKET = 'uploads';

export async function uploadImage(file: File, folder = 'cms'): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(UPLOADS_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(UPLOADS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const path = url.split(`/${UPLOADS_BUCKET}/`)[1];
  if (!path) return;
  await supabase.storage.from(UPLOADS_BUCKET).remove([path]);
}

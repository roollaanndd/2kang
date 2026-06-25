import { createClient } from '@supabase/supabase-js';

// Keys must be set in .env.local (never commit real values — see .env.example)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    '[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. ' +
    'Copy .env.example to .env.local and fill in your values.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const UPLOADS_BUCKET = 'uploads';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_SIZE_MB = 5;

export async function uploadImage(file: File, folder = 'cms'): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('File type not allowed. Use JPEG, PNG, WebP, or GIF.');
  }
  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    throw new Error(`File too large. Maximum size is ${MAX_IMAGE_SIZE_MB}MB.`);
  }
  const ext = file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '') ?? 'jpg';
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
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

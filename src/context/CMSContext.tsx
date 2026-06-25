/* eslint-disable */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { type CMSContent, loadCMSContent, saveCMSContent, mergeCMSWithDefaults, DEFAULT_CMS_CONTENT, CMS_SCHEMA_VERSION } from '../data/defaultCMSContent';
import { supabase } from '../lib/supabase';

const CMS_ROW_ID = 'default';

async function loadFromSupabase(): Promise<CMSContent | null> {
  try {
    const { data, error } = await supabase
      .from('cms_content')
      .select('content')
      .eq('id', CMS_ROW_ID)
      .single();
    if (error || !data) return null;
    return data.content as CMSContent;
  } catch {
    return null;
  }
}

async function saveToSupabase(content: CMSContent): Promise<void> {
  try {
    await supabase
      .from('cms_content')
      .upsert({ id: CMS_ROW_ID, content, updated_at: new Date().toISOString() });
  } catch {
    // silent — localStorage still saved
  }
}

interface CMSContextValue {
  cms: CMSContent;
  synced: boolean;
  updateCMS: (patch: Partial<CMSContent>) => void;
  updateHero: (patch: Partial<CMSContent['hero']>) => void;
  updateServices: (patch: Partial<CMSContent['services']>) => void;
  updateDoctors: (patch: Partial<CMSContent['doctors']>) => void;
  updateClinic: (patch: Partial<CMSContent['clinic']>) => void;
  updatePromotions: (patch: Partial<CMSContent['promotions']>) => void;
  updateArticles: (patch: Partial<CMSContent['articles']>) => void;
  updateAbout: (patch: Partial<CMSContent['about']>) => void;
  updateAppearance: (patch: Partial<CMSContent['appearance']>) => void;
  updateContact: (patch: Partial<CMSContent['contact']>) => void;
  updateTrust: (patch: Partial<CMSContent['trust']>) => void;
  updateTestimonials: (patch: Partial<CMSContent['testimonials']>) => void;
  updateFaq: (patch: Partial<CMSContent['faq']>) => void;
  updateGallery: (patch: Partial<CMSContent['gallery']>) => void;
  updateKioskSettings: (patch: Partial<CMSContent['kioskSettings']>) => void;
  updateBranches: (patch: Partial<CMSContent['branches']>) => void;
  resetToDefaults: () => void;
}

export const CMSContext = createContext<CMSContextValue | null>(null);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [cms, setCMS] = useState<CMSContent>(loadCMSContent);
  const [synced, setSynced] = useState(false);

  // Load from Supabase on mount — merge with defaults so new fields always exist
  useEffect(() => {
    loadFromSupabase().then(remote => {
      if (remote) {
        // If remote data is from an old schema, reset to code defaults and re-save
        if ((remote._schemaVersion ?? 0) < CMS_SCHEMA_VERSION) {
          const fresh = DEFAULT_CMS_CONTENT;
          setCMS(fresh);
          saveCMSContent(fresh);
          saveToSupabase(fresh);
        } else {
          const merged = mergeCMSWithDefaults(remote);
          setCMS(merged);
          saveCMSContent(merged);
        }
      }
      setSynced(true);
    });
  }, []);

  // Real-time subscription — any device saving triggers update here
  useEffect(() => {
    const channel = supabase
      .channel('cms_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cms_content', filter: `id=eq.${CMS_ROW_ID}` },
        payload => {
          const updated = (payload.new as any)?.content as CMSContent | undefined;
          if (updated) {
            const merged = mergeCMSWithDefaults(updated);
            setCMS(merged);
            saveCMSContent(merged);
          }
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const persist = useCallback((next: CMSContent) => {
    setCMS(next);
    saveCMSContent(next);
    saveToSupabase(next);
  }, []);

  const updateCMS = useCallback((patch: Partial<CMSContent>) => {
    setCMS(prev => {
      const next = { ...prev, ...patch };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateHero = useCallback((patch: Partial<CMSContent['hero']>) => {
    setCMS(prev => {
      const next = { ...prev, hero: { ...prev.hero, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateServices = useCallback((patch: Partial<CMSContent['services']>) => {
    setCMS(prev => {
      const next = { ...prev, services: { ...prev.services, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateDoctors = useCallback((patch: Partial<CMSContent['doctors']>) => {
    setCMS(prev => {
      const next = { ...prev, doctors: { ...prev.doctors, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateClinic = useCallback((patch: Partial<CMSContent['clinic']>) => {
    setCMS(prev => {
      const next = { ...prev, clinic: { ...prev.clinic, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updatePromotions = useCallback((patch: Partial<CMSContent['promotions']>) => {
    setCMS(prev => {
      const next = { ...prev, promotions: { ...prev.promotions, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateArticles = useCallback((patch: Partial<CMSContent['articles']>) => {
    setCMS(prev => {
      const next = { ...prev, articles: { ...prev.articles, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateAbout = useCallback((patch: Partial<CMSContent['about']>) => {
    setCMS(prev => {
      const next = { ...prev, about: { ...prev.about, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateAppearance = useCallback((patch: Partial<CMSContent['appearance']>) => {
    setCMS(prev => {
      const next = { ...prev, appearance: { ...prev.appearance, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateContact = useCallback((patch: Partial<CMSContent['contact']>) => {
    setCMS(prev => {
      const next = { ...prev, contact: { ...prev.contact, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateTrust = useCallback((patch: Partial<CMSContent['trust']>) => {
    setCMS(prev => {
      const next = { ...prev, trust: { ...prev.trust, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateTestimonials = useCallback((patch: Partial<CMSContent['testimonials']>) => {
    setCMS(prev => {
      const next = { ...prev, testimonials: { ...prev.testimonials, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateFaq = useCallback((patch: Partial<CMSContent['faq']>) => {
    setCMS(prev => {
      const next = { ...prev, faq: { ...prev.faq, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateGallery = useCallback((patch: Partial<CMSContent['gallery']>) => {
    setCMS(prev => {
      const next = { ...prev, gallery: { ...prev.gallery, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateKioskSettings = useCallback((patch: Partial<CMSContent['kioskSettings']>) => {
    setCMS(prev => {
      const next = { ...prev, kioskSettings: { ...prev.kioskSettings, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const updateBranches = useCallback((patch: Partial<CMSContent['branches']>) => {
    setCMS(prev => {
      const next = { ...prev, branches: { ...prev.branches, ...patch } };
      saveCMSContent(next);
      saveToSupabase(next);
      return next;
    });
  }, []);

  const resetToDefaults = useCallback(() => persist(DEFAULT_CMS_CONTENT), [persist]);

  return (
    <CMSContext.Provider value={{
      cms, synced, updateCMS, updateHero, updateServices, updateDoctors, updateClinic,
      updatePromotions, updateArticles, updateAbout, updateAppearance, updateContact,
      updateTrust, updateTestimonials, updateFaq, updateGallery, updateKioskSettings,
      updateBranches, resetToDefaults,
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used inside CMSProvider');
  return ctx;
}

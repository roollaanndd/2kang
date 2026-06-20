/* eslint-disable */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type CMSContent, loadCMSContent, saveCMSContent, DEFAULT_CMS_CONTENT } from '../data/defaultCMSContent';

interface CMSContextValue {
  cms: CMSContent;
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
  resetToDefaults: () => void;
}

export const CMSContext = createContext<CMSContextValue | null>(null);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [cms, setCMS] = useState<CMSContent>(loadCMSContent);

  const persist = useCallback((next: CMSContent) => {
    setCMS(next);
    saveCMSContent(next);
  }, []);

  const updateCMS = useCallback((patch: Partial<CMSContent>) => {
    setCMS(prev => {
      const next = { ...prev, ...patch };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updateHero = useCallback((patch: Partial<CMSContent['hero']>) => {
    setCMS(prev => {
      const next = { ...prev, hero: { ...prev.hero, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updateServices = useCallback((patch: Partial<CMSContent['services']>) => {
    setCMS(prev => {
      const next = { ...prev, services: { ...prev.services, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updateDoctors = useCallback((patch: Partial<CMSContent['doctors']>) => {
    setCMS(prev => {
      const next = { ...prev, doctors: { ...prev.doctors, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updateClinic = useCallback((patch: Partial<CMSContent['clinic']>) => {
    setCMS(prev => {
      const next = { ...prev, clinic: { ...prev.clinic, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updatePromotions = useCallback((patch: Partial<CMSContent['promotions']>) => {
    setCMS(prev => {
      const next = { ...prev, promotions: { ...prev.promotions, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updateArticles = useCallback((patch: Partial<CMSContent['articles']>) => {
    setCMS(prev => {
      const next = { ...prev, articles: { ...prev.articles, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updateAbout = useCallback((patch: Partial<CMSContent['about']>) => {
    setCMS(prev => {
      const next = { ...prev, about: { ...prev.about, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updateAppearance = useCallback((patch: Partial<CMSContent['appearance']>) => {
    setCMS(prev => {
      const next = { ...prev, appearance: { ...prev.appearance, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updateContact = useCallback((patch: Partial<CMSContent['contact']>) => {
    setCMS(prev => {
      const next = { ...prev, contact: { ...prev.contact, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const updateTrust = useCallback((patch: Partial<CMSContent['trust']>) => {
    setCMS(prev => {
      const next = { ...prev, trust: { ...prev.trust, ...patch } };
      saveCMSContent(next);
      return next;
    });
  }, []);

  const resetToDefaults = useCallback(() => persist(DEFAULT_CMS_CONTENT), [persist]);

  return (
    <CMSContext.Provider value={{
      cms, updateCMS, updateHero, updateServices, updateDoctors, updateClinic,
      updatePromotions, updateArticles, updateAbout, updateAppearance, updateContact,
      updateTrust, resetToDefaults,
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

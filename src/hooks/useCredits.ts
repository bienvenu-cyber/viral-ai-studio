import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

export interface CreditsData {
  used: number;
  limit: number;
  plan: 'free' | 'pro' | 'business';
  resetDate: Date;
}

// Mock credits data - will be replaced with real API calls
const PLAN_LIMITS = {
  free: 50,
  pro: 500,
  business: 2000,
};

export function useCredits() {
  const { user, isAuthenticated } = useAuth();
  const [credits, setCredits] = useState<CreditsData>({
    used: 0,
    limit: PLAN_LIMITS.free,
    plan: 'free',
    resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    // Load credits from localStorage (mock) - will be replaced with API
    const stored = localStorage.getItem(`credits_${user?.id}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setCredits({
        ...parsed,
        resetDate: new Date(parsed.resetDate),
      });
    } else {
      // Default credits for new users
      const defaultCredits: CreditsData = {
        used: 12,
        limit: PLAN_LIMITS.free,
        plan: 'free',
        resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
      setCredits(defaultCredits);
      localStorage.setItem(`credits_${user?.id}`, JSON.stringify(defaultCredits));
    }
    setLoading(false);
  }, [user, isAuthenticated]);

  const useCredit = useCallback((amount: number = 1) => {
    setCredits(prev => {
      const updated = {
        ...prev,
        used: Math.min(prev.used + amount, prev.limit),
      };
      if (user?.id) {
        localStorage.setItem(`credits_${user.id}`, JSON.stringify(updated));
      }
      return updated;
    });
  }, [user]);

  const upgradePlan = useCallback((newPlan: 'free' | 'pro' | 'business') => {
    setCredits(prev => {
      const updated = {
        ...prev,
        plan: newPlan,
        limit: PLAN_LIMITS[newPlan],
      };
      if (user?.id) {
        localStorage.setItem(`credits_${user.id}`, JSON.stringify(updated));
      }
      return updated;
    });
  }, [user]);

  const remaining = credits.limit - credits.used;
  const percentage = (credits.used / credits.limit) * 100;

  return {
    credits,
    remaining,
    percentage,
    loading,
    useCredit,
    upgradePlan,
    isLimitReached: remaining <= 0,
  };
}

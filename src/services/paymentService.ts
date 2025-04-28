import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { supabase } from './supabaseClient';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

let stripePromise: Promise<any> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export const handleSubscription = async () => {
  try {
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe failed to initialize');

    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: STRIPE_PRODUCTS.VIVO_SUBSCRIPTION.priceId,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/cancel`,
        mode: STRIPE_PRODUCTS.VIVO_SUBSCRIPTION.mode,
      },
    });

    if (error) {
      throw new Error(`Failed to create checkout session: ${error.message}`);
    }

    if (!data?.url) {
      throw new Error('Failed to create checkout session: No session URL received');
    }

    window.location.href = data.url;
    return true;
  } catch (error) {
    console.error('Error in subscription process:', error);
    return false;
  }
};

export const handleDonation = async () => {
  try {
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe failed to initialize');

    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: STRIPE_PRODUCTS.VIVO_DONATION.priceId,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/cancel`,
        mode: 'payment',
      },
    });

    if (error) {
      throw new Error(`Failed to create checkout session: ${error.message}`);
    }

    if (!data?.url) {
      throw new Error('Failed to create checkout session: No session URL received');
    }

    window.location.href = data.url;
    return true;
  } catch (error) {
    console.error('Error in donation process:', error);
    return false;
  }
};
import { X, Gift, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useBreathStore } from '../store/breathStore';
import { handleDonation, handleSubscription } from '../services/paymentService';

interface SubscriptionModalProps {
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose }) => {
  const { unlockPremium } = useBreathStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleDonateClick = async () => {
    setIsProcessing(true);
    try {
      await handleDonation();
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleSubscribeClick = async () => {
    setIsProcessing(true);
    try {
      const success = await handleSubscription();
      if (success) {
        unlockPremium();
        onClose();
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Upgrade Your Experience</h2>
        
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/30 dark:to-indigo-900/30">
            <h3 className="text-xl font-semibold mb-2">VibeBreath Pro</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Unlock all premium levels and features</p>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Access to all premium breathing patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Track your progress across sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Unlock achievement system</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Download audio for offline practice</span>
              </li>
            </ul>
            
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">$4<span className="text-sm font-normal">/month</span></span>
              <button 
                onClick={handleSubscribeClick}
                disabled={isProcessing}
                className="btn bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              >
                {isProcessing ? 'Processing...' : (
                  <>
                    <CreditCard size={18} />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Want to support us without subscribing?</p>
            <button 
              onClick={handleDonateClick}
              disabled={isProcessing}
              className="btn btn-secondary flex items-center gap-2 mx-auto"
            >
              <Gift size={18} />
              <span>Make a one-time donation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
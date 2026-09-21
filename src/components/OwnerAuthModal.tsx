import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Lock,
  Unlock,
  KeyRound,
  X,
  ShieldCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const OwnerAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authenticateOwner,
    isOwner,
    logoutOwner,
    changeOwnerPin,
    setIsEditModalOpen,
  } = usePortfolio();

  const [pinInput, setPinInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const success = authenticateOwner(pinInput);
    if (success) {
      setPinInput('');
      setSuccessMessage('Owner mode successfully unlocked!');
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setSuccessMessage('');
        setIsEditModalOpen(true);
      }, 600);
    } else {
      setErrorMessage('Incorrect Owner PIN. Please try again.');
    }
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (changeOwnerPin(oldPin, newPin)) {
      setSuccessMessage('PIN updated successfully!');
      setOldPin('');
      setNewPin('');
      setTimeout(() => {
        setShowPinChange(false);
        setSuccessMessage('');
      }, 1500);
    } else {
      setErrorMessage('Failed to update PIN. Check your old PIN (min 4 characters).');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0b1226] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            {isOwner ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Owner Security Portal</h3>
            <p className="text-xs text-slate-400">
              Restricted management access for Amit Kumar
            </p>
          </div>
        </div>

        {/* Notice Info */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-6">
          Editing content, adding projects/skills/experiences, and uploading custom resume files is protected to ensure authenticity.
        </div>

        {/* Status Messages */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form when NOT authenticated */}
        {!isOwner ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Enter 4-Digit Owner PIN:
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={10}
                  autoFocus
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-lg font-mono text-center tracking-[0.5em] text-white outline-none"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-glow-emerald flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <Unlock className="w-4 h-4" />
              <span>Authenticate & Unlock</span>
            </button>
          </form>
        ) : (
          /* Owner Actions when already authenticated */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-sm font-bold text-white">Owner Mode Active</div>
                <div className="text-xs text-emerald-300">You have full administrative privileges.</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setIsEditModalOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Open Content Manager
              </button>
              <button
                onClick={() => setShowPinChange(!showPinChange)}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Change PIN
              </button>
            </div>

            {showPinChange && (
              <form onSubmit={handleChangePinSubmit} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-slate-300 block">Change Secret PIN:</span>
                <input
                  type="password"
                  required
                  placeholder="Old PIN"
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
                <input
                  type="password"
                  required
                  placeholder="New PIN (min 4 characters)"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Update PIN
                </button>
              </form>
            )}

            <button
              onClick={() => {
                logoutOwner();
                setIsAuthModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium"
            >
              Lock & Logout Owner Mode
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

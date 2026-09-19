import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Upload,
  X,
  FileText,
  Trash2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ResumeUploadModal: React.FC = () => {
  const {
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadedResume,
    setUploadedResume,
    setIsResumeModalOpen,
  } = usePortfolio();

  const [dragActive, setDragActive] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  const processFile = (file: File) => {
    const validExtensions = ['pdf', 'doc', 'docx'];
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (!ext || !validExtensions.includes(ext)) {
      setFeedback({
        type: 'error',
        message: 'Invalid file format. Please upload a .pdf, .doc, or .docx file.',
      });
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setFeedback({
        type: 'error',
        message: 'File size exceeds 12MB limit.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      setUploadedResume({
        name: file.name,
        url: dataUrl,
        size: sizeFormatted,
        uploadDate: today,
        fileType: ext,
      });

      setFeedback({
        type: 'success',
        message: `Successfully uploaded ${file.name}!`,
      });

      setTimeout(() => {
        setIsUploadModalOpen(false);
        setIsResumeModalOpen(true);
      }, 900);
    };

    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0b1226] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={() => setIsUploadModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Upload Custom Resume</h3>
            <p className="text-xs text-slate-400">
              Replace or attach your official resume document
            </p>
          </div>
        </div>

        {/* Status Feedback */}
        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 mb-4 ${
              feedback.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                : 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Drag and drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
            dragActive
              ? 'border-emerald-400 bg-emerald-500/10'
              : 'border-slate-700 bg-slate-900/60 hover:border-emerald-500/50 hover:bg-slate-900'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />

          <div className="p-4 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
            <Upload className="w-8 h-8" />
          </div>

          <div>
            <span className="text-sm font-bold text-white block">
              Click to select or drag and drop resume here
            </span>
            <span className="text-xs text-slate-400 mt-1 block">
              Supports .pdf, .doc, .docx (Max 12MB)
            </span>
          </div>
        </div>

        {/* Current Uploaded Resume status */}
        {uploadedResume && (
          <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{uploadedResume.name}</div>
                <div className="text-[11px] text-slate-400">
                  {uploadedResume.size} • {uploadedResume.uploadDate}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setUploadedResume(null);
                setFeedback({ type: 'success', message: 'Custom resume removed. Default ATS is active.' });
              }}
              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Remove custom resume"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { X, MapPin, Calendar, User, Camera, ExternalLink } from 'lucide-react';
import { EvidenceItem } from '../../types/dashboard';

interface ImageLightboxModalProps {
  evidence: EvidenceItem | null;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({ evidence, onClose }) => {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Image Container */}
        <div className="flex-1 bg-black flex items-center justify-center relative p-4 min-h-[300px] max-h-[70vh]">
          <img
            src={evidence.url}
            alt={evidence.caption}
            className="max-h-full max-w-full object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Evidence Metadata Sidebar */}
        <div className="w-full md:w-80 p-5 bg-slate-900 text-slate-100 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-mono text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                Evidence #{evidence.id}
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="font-bold text-sm text-white">{evidence.caption}</h3>
              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                Type: {evidence.type}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <User className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 block">Uploader / Inspector</span>
                  <span className="font-semibold">{evidence.uploader}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 block">Timestamp</span>
                  <span className="font-mono text-blue-400">{evidence.timestamp}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 block">GPS Coordinates & Location</span>
                  <span className="font-medium leading-tight block">{evidence.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
            <span>Verified Digital Artifact</span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
            >
              Close Viewer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

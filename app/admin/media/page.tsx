"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Upload,
  RefreshCw,
  Check,
  ExternalLink,
  Eye,
  Scissors,
  User,
  Layers,
  Camera,
  Search,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
} from "lucide-react";
import { usePrimeStitch } from "@/lib/store";
import { MediaAsset } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

// Curated high-resolution photography presets matching Nigerian tailoring
const PHOTOGRAPHY_PRESETS: Record<string, { url: string; label: string }> = {
  "des-kaftan": {
    url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&auto=format&fit=crop&q=80",
    label: "Editorial Brocade Portrait",
  },
  "des-agbada": {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
    label: "Ceremonial Indigo Robe",
  },
  "des-senator": {
    url: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1200&auto=format&fit=crop&q=80",
    label: "Midnight Navy Executive Cut",
  },
  "des-suit": {
    url: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=1200&auto=format&fit=crop&q=80",
    label: "Savile Pure Worsted Wool",
  },
  "des-ankara": {
    url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&auto=format&fit=crop&q=80",
    label: "Holland Wax Wrap Model",
  },
  "des-shirt": {
    url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&auto=format&fit=crop&q=80",
    label: "Giza 88 French Cuff Studio",
  },
  "des-asoebi": {
    url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&auto=format&fit=crop&q=80",
    label: "Champagne Brass Gala Drape",
  },
  "des-polo": {
    url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&auto=format&fit=crop&q=80",
    label: "Corporate Navy Heavy Piqué",
  },
  "tl-01": {
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    label: "Master Tailor Workshop Portrait",
  },
  "tl-02": {
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    label: "Pattern Drafter Studio",
  },
  "tl-03": {
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    label: "Embroidery Artisan Close-up",
  },
  "tl-04": {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    label: "Basting Seam Specialist",
  },
  "tl-05": {
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    label: "Finishing Inspector",
  },
  "ms-01": {
    url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&auto=format&fit=crop&q=80",
    label: "Doorstep Fitter Portrait",
  },
  "ms-02": {
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
    label: "Master Measurer in Field",
  },
  "ms-03": {
    url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
    label: "Mobile Dispatch Fitter",
  },
};

export default function AdminMediaPage() {
  const {
    mediaAssets,
    updateMediaAsset,
    resetMediaAsset,
    resetAllMediaAssets,
    orders,
    bookings,
    tailors,
  } = usePrimeStitch();

  const [activeCategory, setActiveCategory] = useState<
    "all" | "garments" | "artisans" | "fabrics" | "stages" | "posture"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Assets", count: mediaAssets.length, icon: FolderOpen },
    {
      id: "garments",
      label: "Garments (3:4)",
      count: mediaAssets.filter((a) => a.category === "garments").length,
      icon: Scissors,
    },
    {
      id: "artisans",
      label: "Artisans (1:1)",
      count: mediaAssets.filter((a) => a.category === "artisans").length,
      icon: User,
    },
    {
      id: "fabrics",
      label: "Fabrics (1:1)",
      count: mediaAssets.filter((a) => a.category === "fabrics").length,
      icon: Layers,
    },
    {
      id: "stages",
      label: "9 Stages (16:9)",
      count: mediaAssets.filter((a) => a.category === "stages").length,
      icon: RefreshCw,
    },
    {
      id: "posture",
      label: "Posture (3:4)",
      count: mediaAssets.filter((a) => a.category === "posture").length,
      icon: Camera,
    },
  ];

  const filteredAssets = mediaAssets.filter((asset) => {
    const matchesCategory =
      activeCategory === "all" || asset.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.alt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const showSavedToast = (assetName: string) => {
    setSavedNotification(`Saved changes for ${assetName}`);
    setTimeout(() => {
      setSavedNotification(null);
    }, 3000);
  };

  // Switch all garments to curated photography preset
  const applyAllGarmentPhotos = () => {
    mediaAssets.forEach((asset) => {
      if (asset.category === "garments" && PHOTOGRAPHY_PRESETS[asset.id]) {
        updateMediaAsset(asset.id, {
          url: PHOTOGRAPHY_PRESETS[asset.id].url,
        });
      }
    });
    setSavedNotification("Switched all 8 garments to curated studio photography!");
    setTimeout(() => setSavedNotification(null), 3000);
  };

  // Switch all garments back to bespoke local vector illustrations
  const applyAllGarmentVectors = () => {
    mediaAssets.forEach((asset) => {
      if (asset.category === "garments") {
        updateMediaAsset(asset.id, {
          url: asset.defaultUrl,
        });
      }
    });
    setSavedNotification("Switched all 8 garments to authentic Aba Atelier vector SVGs!");
    setTimeout(() => setSavedNotification(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Toast Alert */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-white border-2 border-accent-gold px-4 py-3 rounded-md shadow-card flex items-center gap-3 animate-fade-in font-mono text-xs">
          <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Top Header & Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-seam pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="tape" size="sm">
              Media &amp; Photographic Asset Registry
            </Badge>
            <span className="text-xs font-mono text-text-muted">
              IMAGES.MD SPECIFICATION // PERSISTENT OVERRIDES
            </span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-primary tracking-tight mt-1">
            Media Manager &amp; Visual Studio
          </h1>
          <p className="text-sm text-text-muted mt-1 max-w-2xl">
            Manage every image across PrimeStitch. Upload custom brand photography, paste remote CDN
            URLs, adjust accessibility alt text, or use authentic Aba atelier vector assets. Changes
            persist to localStorage and propagate across all consumer and staff screens in real time.
          </p>
        </div>

        {/* Navigation Tabs to other admin views */}
        <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              SLA Dashboard
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="outline" size="sm">
              All Orders ({orders.length})
            </Button>
          </Link>
          <Link href="/admin/measurements">
            <Button variant="outline" size="sm">
              Bookings ({bookings.length})
            </Button>
          </Link>
          <Link href="/admin/team">
            <Button variant="outline" size="sm">
              Team &amp; Benches ({tailors.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* Controls & Quick Action Bar */}
      <div className="bg-surface-card border border-border-subtle rounded-md p-4 sm:p-6 space-y-4 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by asset name, ID, or alt text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-surface-muted border border-border-subtle rounded-sm focus:outline-none focus:border-primary font-mono text-text-main"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={applyAllGarmentPhotos}
              className="text-xs font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-accent-gold" />
              All Garments: Studio Photos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={applyAllGarmentVectors}
              className="text-xs font-mono"
            >
              <Scissors className="w-3.5 h-3.5 mr-1 text-primary" />
              All Garments: Aba SVGs
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                if (
                  window.confirm(
                    "Reset all 35 media assets back to original factory defaults?"
                  )
                ) {
                  resetAllMediaAssets();
                  setSavedNotification("All media assets restored to factory defaults.");
                  setTimeout(() => setSavedNotification(null), 3000);
                }
              }}
              className="text-xs font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset All
            </Button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-border-subtle pt-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono shrink-0 transition-colors border ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-subtle"
                    : "bg-surface-muted text-text-muted hover:text-text-main border-border-subtle hover:bg-surface-card"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? "bg-accent-gold text-primary font-bold" : "bg-border-subtle text-text-muted"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asset Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-text-muted">
          <span>
            SHOWING {filteredAssets.length} OF {mediaAssets.length} REGISTERED ASSETS
          </span>
          <span>AUTOSAVED TO LOCALSTORAGE // ZERO CLS GUARANTEED</span>
        </div>

        {filteredAssets.length === 0 ? (
          <div className="p-12 text-center bg-surface-card border-2 border-dashed border-border-seam rounded-md space-y-2">
            <AlertCircle className="w-8 h-8 text-text-muted mx-auto" />
            <h3 className="font-display font-bold text-primary text-base">No assets matched your search</h3>
            <p className="text-sm text-text-muted">Try clearing the search query or switching categories.</p>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onUpdate={(updates) => {
                  updateMediaAsset(asset.id, updates);
                  showSavedToast(asset.name);
                }}
                onReset={() => {
                  resetMediaAsset(asset.id);
                  showSavedToast(asset.name);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Info Box */}
      <div className="border border-border-seam bg-primary/5 rounded-md p-5 space-y-2 font-mono text-xs text-text-muted">
        <div className="flex items-center gap-2 text-primary font-bold">
          <Scissors className="w-4 h-4 text-accent-gold" />
          <span>PrimeStitch Media Standards &amp; Architecture</span>
        </div>
        <p>
          Every silhouette, avatar, swatch, and stage shot is rendered with hard-locked aspect ratios (
          <code className="text-primary font-bold">3:4</code>, <code className="text-primary font-bold">1:1</code>,{" "}
          <code className="text-primary font-bold">16:9</code>, <code className="text-primary font-bold">4:3</code>)
          to prevent Cumulative Layout Shift on 3G/4G cellular networks. All images include descriptive accessibility
          alt text describing the subject, weave, and cut.
        </p>
      </div>
    </div>
  );
}

// Individual Asset Card Component
function AssetCard({
  asset,
  onUpdate,
  onReset,
}: {
  asset: MediaAsset;
  onUpdate: (updates: Partial<MediaAsset>) => void;
  onReset: () => void;
}) {
  const [url, setUrl] = useState(asset.url);
  const [alt, setAlt] = useState(asset.alt);
  const [isDirty, setIsDirty] = useState(false);
  const fileInputId = useId();

  // Handle local image file upload from user's device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUrl(result);
      setIsDirty(true);
      onUpdate({ url: result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onUpdate({ url, alt });
    setIsDirty(false);
  };

  const presetPhoto = PHOTOGRAPHY_PRESETS[asset.id];
  const isDefault = url === asset.defaultUrl && alt === asset.defaultAlt;

  return (
    <Card className="flex flex-col border border-border-subtle bg-surface-card rounded-md overflow-hidden shadow-subtle hover:border-primary/40 transition-colors">
      {/* Asset Header */}
      <div className="p-4 border-b border-border-subtle flex items-start justify-between gap-2 bg-surface-muted/40">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] font-bold text-accent-gold uppercase tracking-wider bg-primary px-1.5 py-0.5 rounded-sm">
              {asset.id}
            </span>
            <span className="font-mono text-[10px] text-text-muted border border-border-subtle px-1.5 py-0.5 rounded-sm">
              {asset.dimensions} • {asset.aspectRatio}
            </span>
          </div>
          <h3 className="font-display font-bold text-primary text-base mt-1 line-clamp-1">
            {asset.name}
          </h3>
        </div>
      </div>

      {/* Live Preview Container */}
      <div className="p-4 bg-surface-muted flex items-center justify-center border-b border-border-subtle">
        <div className="w-full max-w-[280px]">
          <PlaceholderImage
            src={url}
            alt={alt}
            aspectRatio={asset.aspectRatio}
            category={
              asset.category === "artisans"
                ? "avatar"
                : asset.category === "fabrics"
                ? "fabric"
                : asset.category === "stages"
                ? "workshop"
                : asset.category === "posture"
                ? "reference"
                : "garment"
            }
            className="w-full shadow-card rounded-sm"
            showBadge
          />
        </div>
      </div>

      {/* Form Controls */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Image URL Input & File Upload Button */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono font-bold text-text-muted uppercase">
                Image Source / URL
              </label>
              <label
                htmlFor={fileInputId}
                className="text-[11px] font-mono text-primary hover:text-accent-gold cursor-pointer flex items-center gap-1 font-bold"
              >
                <Upload className="w-3 h-3" />
                Upload File
              </label>
              <input
                id={fileInputId}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setIsDirty(true);
              }}
              placeholder="e.g. /images/... or https://..."
              className="w-full px-2.5 py-1.5 text-xs bg-surface-muted border border-border-subtle rounded-sm focus:outline-none focus:border-primary font-mono text-text-main"
            />
          </div>

          {/* Descriptive Alt Text (Accessibility) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono font-bold text-text-muted uppercase">
                Accessibility Alt Text
              </label>
              <span className="text-[10px] font-mono text-text-muted">
                {alt.length} chars
              </span>
            </div>
            <textarea
              rows={2}
              value={alt}
              onChange={(e) => {
                setAlt(e.target.value);
                setIsDirty(true);
              }}
              placeholder="Descriptive detail of subject, cut, textile, and setting..."
              className="w-full px-2.5 py-1.5 text-xs bg-surface-muted border border-border-subtle rounded-sm focus:outline-none focus:border-primary text-text-main resize-none"
            />
          </div>

          {/* Quick Presets Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {presetPhoto && (
              <button
                type="button"
                onClick={() => {
                  setUrl(presetPhoto.url);
                  setIsDirty(true);
                  onUpdate({ url: presetPhoto.url });
                }}
                className="text-[11px] font-mono bg-accent-gold/15 text-primary hover:bg-accent-gold/25 border border-accent-gold/40 px-2 py-0.5 rounded-sm flex items-center gap-1"
                title="Apply curated studio photography"
              >
                <Sparkles className="w-2.5 h-2.5 text-accent-gold" />
                Photo Preset
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setUrl(asset.defaultUrl);
                setAlt(asset.defaultAlt);
                setIsDirty(true);
                onUpdate({ url: asset.defaultUrl, alt: asset.defaultAlt });
              }}
              className="text-[11px] font-mono bg-surface-muted text-text-muted hover:text-text-main border border-border-subtle px-2 py-0.5 rounded-sm flex items-center gap-1"
              title="Apply local Aba Atelier vector SVG"
            >
              <Scissors className="w-2.5 h-2.5" />
              Aba Vector SVG
            </button>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={isDefault}
            onClick={() => {
              setUrl(asset.defaultUrl);
              setAlt(asset.defaultAlt);
              setIsDirty(false);
              onReset();
            }}
            className="text-[11px] font-mono text-text-muted hover:text-accent-terracotta px-2 py-1 h-auto"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Default
          </Button>

          <Button
            variant={isDirty ? "primary" : "outline"}
            size="sm"
            onClick={handleSave}
            className="text-xs font-mono px-3 py-1.5 h-auto"
          >
            <Check className="w-3.5 h-3.5 mr-1" />
            {isDirty ? "Save Changes" : "Saved"}
          </Button>
        </div>
      </div>
    </Card>
  );
}


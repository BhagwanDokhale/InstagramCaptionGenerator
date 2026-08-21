import { TabType } from './navigation';

export interface SavedCaption {
  id: string;
  text: string;
  category?: string;
  tone?: string;
  platform?: string;
  dateSaved: string; // ISO string
}

export interface SavedHashtagSet {
  id: string;
  hashtags: string[];
  topic?: string;
  strategy?: string;
  platform?: string;
  dateSaved: string; // ISO string
}

export interface SavedBio {
  id: string;
  text: string;
  tone?: string;
  dateSaved: string; // ISO string
}

export interface SavedUsername {
  id: string;
  username: string;
  style?: string;
  niche?: string;
  dateSaved: string; // ISO string
}

export interface SavedBrandKit {
  brandName: string;
  brandNiche?: string;
  brandVibe?: string;
  taglines: string[];
  bioHooks: string[];
  colorPalette: {
    hex: string;
    name: string;
    role: string;
    description: string;
  }[];
  fonts: {
    display: string;
    body: string;
    rationale: string;
  };
  brandVoice: string[];
  keywords: string[];
  gridTheme: string;
  dateSaved: string; // ISO string
}

export interface RecentProject {
  id: string;
  title: string;
  tool: TabType | string;
  toolLabel: string;
  action: string;
  details?: string;
  href: string;
  timestamp: number; // Unix timestamp ms
}

export interface WorkspaceData {
  version: number;
  captions: SavedCaption[];
  hashtagSets: SavedHashtagSet[];
  bios: SavedBio[];
  usernames: SavedUsername[];
  brandKit: SavedBrandKit | null;
  recentProjects: RecentProject[];
}

const STORAGE_KEY = 'growthcaption_workspace_v1';
const MAX_RECENT_PROJECTS = 20;

const DEFAULT_WORKSPACE_DATA: WorkspaceData = {
  version: 1,
  captions: [],
  hashtagSets: [],
  bios: [],
  usernames: [],
  brandKit: null,
  recentProjects: [],
};

// Check if localStorage is available and working safely
export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__growthcaption_test_storage__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// Generate unique, collision-resistant local ID
function generateLocalId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Notify all components in current window of workspace updates
function notifyWorkspaceUpdated(): void {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('growthcaption_workspace_updated'));
    } catch {
      // Ignore if CustomEvent is unsupported
    }
  }
}

// Safely get workspace data from localStorage
export function getWorkspaceData(): WorkspaceData {
  if (!isStorageAvailable()) {
    return { ...DEFAULT_WORKSPACE_DATA };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_WORKSPACE_DATA };
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...DEFAULT_WORKSPACE_DATA };
    }

    return {
      version: typeof parsed.version === 'number' ? parsed.version : 1,
      captions: Array.isArray(parsed.captions) ? parsed.captions : [],
      hashtagSets: Array.isArray(parsed.hashtagSets) ? parsed.hashtagSets : [],
      bios: Array.isArray(parsed.bios) ? parsed.bios : [],
      usernames: Array.isArray(parsed.usernames) ? parsed.usernames : [],
      brandKit: parsed.brandKit && typeof parsed.brandKit === 'object' ? parsed.brandKit : null,
      recentProjects: Array.isArray(parsed.recentProjects) ? parsed.recentProjects : [],
    };
  } catch (err) {
    console.warn('Failed to parse GrowthCaption workspace data from local storage:', err);
    return { ...DEFAULT_WORKSPACE_DATA };
  }
}

// Safely save entire workspace data structure
export function saveWorkspaceData(data: WorkspaceData): boolean {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    notifyWorkspaceUpdated();
    return true;
  } catch (err) {
    console.warn('Failed to write GrowthCaption workspace data to local storage:', err);
    return false;
  }
}

// ==========================================
// 1. CAPTIONS
// ==========================================

export function getFavoriteCaptions(): SavedCaption[] {
  return getWorkspaceData().captions;
}

export function isCaptionSaved(text: string): boolean {
  const cleanText = text.trim();
  return getFavoriteCaptions().some(c => c.text.trim() === cleanText);
}

export function saveFavoriteCaption(item: {
  text: string;
  category?: string;
  tone?: string;
  platform?: string;
}): SavedCaption | null {
  const cleanText = item.text.trim();
  if (!cleanText) return null;

  const data = getWorkspaceData();
  // Check if already saved
  const existing = data.captions.find(c => c.text.trim() === cleanText);
  if (existing) {
    return existing;
  }

  const newCaption: SavedCaption = {
    id: generateLocalId(),
    text: cleanText,
    category: item.category,
    tone: item.tone,
    platform: item.platform || 'Instagram',
    dateSaved: new Date().toISOString(),
  };

  data.captions.unshift(newCaption);
  const success = saveWorkspaceData(data);
  return success ? newCaption : null;
}

export function removeFavoriteCaption(idOrText: string): boolean {
  const data = getWorkspaceData();
  const initialLength = data.captions.length;
  data.captions = data.captions.filter(c => c.id !== idOrText && c.text.trim() !== idOrText.trim());
  if (data.captions.length !== initialLength) {
    return saveWorkspaceData(data);
  }
  return false;
}

export function toggleFavoriteCaption(item: {
  text: string;
  category?: string;
  tone?: string;
  platform?: string;
}): boolean {
  if (isCaptionSaved(item.text)) {
    removeFavoriteCaption(item.text);
    return false;
  } else {
    saveFavoriteCaption(item);
    return true;
  }
}

// ==========================================
// 2. HASHTAGS
// ==========================================

export function getFavoriteHashtagSets(): SavedHashtagSet[] {
  return getWorkspaceData().hashtagSets;
}

export function isHashtagSetSaved(hashtags: string[]): boolean {
  const setKey = hashtags.map(h => h.toLowerCase().trim()).sort().join(' ');
  return getFavoriteHashtagSets().some(item => {
    const itemKey = item.hashtags.map(h => h.toLowerCase().trim()).sort().join(' ');
    return itemKey === setKey;
  });
}

export function saveFavoriteHashtagSet(item: {
  hashtags: string[];
  topic?: string;
  strategy?: string;
  platform?: string;
}): SavedHashtagSet | null {
  const cleanTags = item.hashtags.map(h => h.trim()).filter(Boolean);
  if (cleanTags.length === 0) return null;

  const data = getWorkspaceData();
  if (isHashtagSetSaved(cleanTags)) {
    return data.hashtagSets.find(h => isHashtagSetSaved(h.hashtags)) || null;
  }

  const newSet: SavedHashtagSet = {
    id: generateLocalId(),
    hashtags: cleanTags,
    topic: item.topic,
    strategy: item.strategy,
    platform: item.platform || 'Instagram',
    dateSaved: new Date().toISOString(),
  };

  data.hashtagSets.unshift(newSet);
  const success = saveWorkspaceData(data);
  return success ? newSet : null;
}

export function removeFavoriteHashtagSet(id: string): boolean {
  const data = getWorkspaceData();
  const initialLength = data.hashtagSets.length;
  data.hashtagSets = data.hashtagSets.filter(h => h.id !== id);
  if (data.hashtagSets.length !== initialLength) {
    return saveWorkspaceData(data);
  }
  return false;
}

// ==========================================
// 3. BIOS
// ==========================================

export function getSavedBios(): SavedBio[] {
  return getWorkspaceData().bios;
}

export function isBioSaved(text: string): boolean {
  const cleanText = text.trim();
  return getSavedBios().some(b => b.text.trim() === cleanText);
}

export function saveBio(item: {
  text: string;
  tone?: string;
}): SavedBio | null {
  const cleanText = item.text.trim();
  if (!cleanText) return null;

  const data = getWorkspaceData();
  const existing = data.bios.find(b => b.text.trim() === cleanText);
  if (existing) return existing;

  const newBio: SavedBio = {
    id: generateLocalId(),
    text: cleanText,
    tone: item.tone,
    dateSaved: new Date().toISOString(),
  };

  data.bios.unshift(newBio);
  const success = saveWorkspaceData(data);
  return success ? newBio : null;
}

export function removeBio(idOrText: string): boolean {
  const data = getWorkspaceData();
  const initialLength = data.bios.length;
  data.bios = data.bios.filter(b => b.id !== idOrText && b.text.trim() !== idOrText.trim());
  if (data.bios.length !== initialLength) {
    return saveWorkspaceData(data);
  }
  return false;
}

export function toggleSavedBio(item: {
  text: string;
  tone?: string;
}): boolean {
  if (isBioSaved(item.text)) {
    removeBio(item.text);
    return false;
  } else {
    saveBio(item);
    return true;
  }
}

// ==========================================
// 4. USERNAMES
// ==========================================

export function getSavedUsernames(): SavedUsername[] {
  return getWorkspaceData().usernames;
}

export function isUsernameSaved(username: string): boolean {
  const clean = username.replace(/^@/, '').toLowerCase().trim();
  return getSavedUsernames().some(u => u.username.replace(/^@/, '').toLowerCase().trim() === clean);
}

export function saveUsername(item: {
  username: string;
  style?: string;
  niche?: string;
}): SavedUsername | null {
  const clean = item.username.trim();
  if (!clean) return null;

  const data = getWorkspaceData();
  const existing = data.usernames.find(u => u.username.toLowerCase().trim() === clean.toLowerCase());
  if (existing) return existing;

  const newUsername: SavedUsername = {
    id: generateLocalId(),
    username: clean,
    style: item.style,
    niche: item.niche,
    dateSaved: new Date().toISOString(),
  };

  data.usernames.unshift(newUsername);
  const success = saveWorkspaceData(data);
  return success ? newUsername : null;
}

export function removeUsername(idOrUsername: string): boolean {
  const data = getWorkspaceData();
  const initialLength = data.usernames.length;
  const clean = idOrUsername.replace(/^@/, '').toLowerCase().trim();
  data.usernames = data.usernames.filter(u => u.id !== idOrUsername && u.username.replace(/^@/, '').toLowerCase().trim() !== clean);
  if (data.usernames.length !== initialLength) {
    return saveWorkspaceData(data);
  }
  return false;
}

export function toggleSavedUsername(item: {
  username: string;
  style?: string;
  niche?: string;
}): boolean {
  if (isUsernameSaved(item.username)) {
    removeUsername(item.username);
    return false;
  } else {
    saveUsername(item);
    return true;
  }
}

// ==========================================
// 5. BRAND KIT
// ==========================================

export function getBrandKit(): SavedBrandKit | null {
  return getWorkspaceData().brandKit;
}

export function saveBrandKit(
  brandKit: {
    taglines: string[];
    bioHooks: string[];
    colorPalette: {
      hex: string;
      name: string;
      role: string;
      description: string;
    }[];
    fonts: {
      display: string;
      body: string;
      rationale: string;
    };
    brandVoice: string[];
    keywords: string[];
    gridTheme: string;
  },
  meta?: {
    brandName?: string;
    brandNiche?: string;
    brandVibe?: string;
  }
): SavedBrandKit | null {
  const data = getWorkspaceData();
  const savedKit: SavedBrandKit = {
    brandName: meta?.brandName || 'My Brand',
    brandNiche: meta?.brandNiche,
    brandVibe: meta?.brandVibe,
    taglines: Array.isArray(brandKit.taglines) ? brandKit.taglines : [],
    bioHooks: Array.isArray(brandKit.bioHooks) ? brandKit.bioHooks : [],
    colorPalette: Array.isArray(brandKit.colorPalette) ? brandKit.colorPalette : [],
    fonts: brandKit.fonts || { display: 'Playfair Display', body: 'Plus Jakarta Sans', rationale: '' },
    brandVoice: Array.isArray(brandKit.brandVoice) ? brandKit.brandVoice : [],
    keywords: Array.isArray(brandKit.keywords) ? brandKit.keywords : [],
    gridTheme: brandKit.gridTheme || '',
    dateSaved: new Date().toISOString(),
  };

  data.brandKit = savedKit;
  const success = saveWorkspaceData(data);
  return success ? savedKit : null;
}

export function clearBrandKit(): boolean {
  const data = getWorkspaceData();
  data.brandKit = null;
  return saveWorkspaceData(data);
}

// ==========================================
// 6. RECENT PROJECTS
// ==========================================

export function getRecentProjects(): RecentProject[] {
  return getWorkspaceData().recentProjects;
}

export function addRecentProject(project: {
  title: string;
  tool: TabType | string;
  toolLabel: string;
  action: string;
  details?: string;
  href: string;
}): RecentProject | null {
  if (!project.title && !project.action) return null;

  const data = getWorkspaceData();
  
  // Prevent immediate duplicate flood (if identical action and title in last 5 seconds)
  const now = Date.now();
  const existingIdx = data.recentProjects.findIndex(
    p => p.tool === project.tool && p.title === project.title && (now - p.timestamp) < 5000
  );

  const newProject: RecentProject = {
    id: generateLocalId(),
    title: project.title,
    tool: project.tool,
    toolLabel: project.toolLabel,
    action: project.action,
    details: project.details,
    href: project.href,
    timestamp: now,
  };

  if (existingIdx >= 0) {
    data.recentProjects[existingIdx] = newProject;
  } else {
    data.recentProjects.unshift(newProject);
  }

  // Limit recent projects to MAX_RECENT_PROJECTS
  if (data.recentProjects.length > MAX_RECENT_PROJECTS) {
    data.recentProjects = data.recentProjects.slice(0, MAX_RECENT_PROJECTS);
  }

  const success = saveWorkspaceData(data);
  return success ? newProject : null;
}

export function removeRecentProject(id: string): boolean {
  const data = getWorkspaceData();
  const initialLength = data.recentProjects.length;
  data.recentProjects = data.recentProjects.filter(p => p.id !== id);
  if (data.recentProjects.length !== initialLength) {
    return saveWorkspaceData(data);
  }
  return false;
}

export function clearRecentProjects(): boolean {
  const data = getWorkspaceData();
  data.recentProjects = [];
  return saveWorkspaceData(data);
}

// ==========================================
// 7. WORKSPACE MANAGEMENT & IMPORT/EXPORT
// ==========================================

export function clearWorkspace(): boolean {
  return saveWorkspaceData({ ...DEFAULT_WORKSPACE_DATA });
}

export function getWorkspaceStats(): {
  totalItems: number;
  captionsCount: number;
  hashtagsCount: number;
  biosCount: number;
  usernamesCount: number;
  hasBrandKit: boolean;
  recentProjectsCount: number;
} {
  const data = getWorkspaceData();
  const captionsCount = data.captions.length;
  const hashtagsCount = data.hashtagSets.length;
  const biosCount = data.bios.length;
  const usernamesCount = data.usernames.length;
  const hasBrandKit = Boolean(data.brandKit);
  const recentProjectsCount = data.recentProjects.length;
  const totalItems = captionsCount + hashtagsCount + biosCount + usernamesCount + (hasBrandKit ? 1 : 0);

  return {
    totalItems,
    captionsCount,
    hashtagsCount,
    biosCount,
    usernamesCount,
    hasBrandKit,
    recentProjectsCount,
  };
}

export function exportWorkspaceData(): string {
  const data = getWorkspaceData();
  return JSON.stringify(data, null, 2);
}

export function importWorkspaceData(jsonString: string): {
  success: boolean;
  message: string;
  importedCounts?: {
    captions: number;
    hashtags: number;
    bios: number;
    usernames: number;
    hasBrandKit: boolean;
    recentProjects: number;
  };
} {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, message: 'Invalid JSON file structure.' };
    }

    const validatedData: WorkspaceData = {
      version: 1,
      captions: Array.isArray(parsed.captions)
        ? parsed.captions
            .filter((c: any) => c && typeof c.text === 'string')
            .map((c: any) => ({
              id: typeof c.id === 'string' ? c.id : generateLocalId(),
              text: String(c.text).trim(),
              category: typeof c.category === 'string' ? c.category : undefined,
              tone: typeof c.tone === 'string' ? c.tone : undefined,
              platform: typeof c.platform === 'string' ? c.platform : 'Instagram',
              dateSaved: typeof c.dateSaved === 'string' ? c.dateSaved : new Date().toISOString(),
            }))
        : [],
      hashtagSets: Array.isArray(parsed.hashtagSets)
        ? parsed.hashtagSets
            .filter((h: any) => h && Array.isArray(h.hashtags))
            .map((h: any) => ({
              id: typeof h.id === 'string' ? h.id : generateLocalId(),
              hashtags: h.hashtags.map((tag: any) => String(tag).trim()).filter(Boolean),
              topic: typeof h.topic === 'string' ? h.topic : undefined,
              strategy: typeof h.strategy === 'string' ? h.strategy : undefined,
              platform: typeof h.platform === 'string' ? h.platform : 'Instagram',
              dateSaved: typeof h.dateSaved === 'string' ? h.dateSaved : new Date().toISOString(),
            }))
        : [],
      bios: Array.isArray(parsed.bios)
        ? parsed.bios
            .filter((b: any) => b && typeof b.text === 'string')
            .map((b: any) => ({
              id: typeof b.id === 'string' ? b.id : generateLocalId(),
              text: String(b.text).trim(),
              tone: typeof b.tone === 'string' ? b.tone : undefined,
              dateSaved: typeof b.dateSaved === 'string' ? b.dateSaved : new Date().toISOString(),
            }))
        : [],
      usernames: Array.isArray(parsed.usernames)
        ? parsed.usernames
            .filter((u: any) => u && typeof u.username === 'string')
            .map((u: any) => ({
              id: typeof u.id === 'string' ? u.id : generateLocalId(),
              username: String(u.username).trim(),
              style: typeof u.style === 'string' ? u.style : undefined,
              niche: typeof u.niche === 'string' ? u.niche : undefined,
              dateSaved: typeof u.dateSaved === 'string' ? u.dateSaved : new Date().toISOString(),
            }))
        : [],
      brandKit: parsed.brandKit && typeof parsed.brandKit === 'object'
        ? {
            brandName: typeof parsed.brandKit.brandName === 'string' ? parsed.brandKit.brandName : 'My Brand',
            brandNiche: typeof parsed.brandKit.brandNiche === 'string' ? parsed.brandKit.brandNiche : undefined,
            brandVibe: typeof parsed.brandKit.brandVibe === 'string' ? parsed.brandKit.brandVibe : undefined,
            taglines: Array.isArray(parsed.brandKit.taglines) ? parsed.brandKit.taglines.map(String) : [],
            bioHooks: Array.isArray(parsed.brandKit.bioHooks) ? parsed.brandKit.bioHooks.map(String) : [],
            colorPalette: Array.isArray(parsed.brandKit.colorPalette)
              ? parsed.brandKit.colorPalette.map((col: any) => ({
                  hex: String(col.hex || '#000000'),
                  name: String(col.name || 'Color'),
                  role: String(col.role || 'Primary'),
                  description: String(col.description || ''),
                }))
              : [],
            fonts: parsed.brandKit.fonts && typeof parsed.brandKit.fonts === 'object'
              ? {
                  display: String(parsed.brandKit.fonts.display || 'Playfair Display'),
                  body: String(parsed.brandKit.fonts.body || 'Plus Jakarta Sans'),
                  rationale: String(parsed.brandKit.fonts.rationale || ''),
                }
              : { display: 'Playfair Display', body: 'Plus Jakarta Sans', rationale: '' },
            brandVoice: Array.isArray(parsed.brandKit.brandVoice) ? parsed.brandKit.brandVoice.map(String) : [],
            keywords: Array.isArray(parsed.brandKit.keywords) ? parsed.brandKit.keywords.map(String) : [],
            gridTheme: String(parsed.brandKit.gridTheme || ''),
            dateSaved: typeof parsed.brandKit.dateSaved === 'string' ? parsed.brandKit.dateSaved : new Date().toISOString(),
          }
        : null,
      recentProjects: Array.isArray(parsed.recentProjects)
        ? parsed.recentProjects
            .filter((p: any) => p && typeof p.title === 'string')
            .slice(0, MAX_RECENT_PROJECTS)
            .map((p: any) => ({
              id: typeof p.id === 'string' ? p.id : generateLocalId(),
              title: String(p.title),
              tool: String(p.tool || 'captions'),
              toolLabel: String(p.toolLabel || 'Creator Tool'),
              action: String(p.action || 'Project updated'),
              details: typeof p.details === 'string' ? p.details : undefined,
              href: String(p.href || '/'),
              timestamp: typeof p.timestamp === 'number' ? p.timestamp : Date.now(),
            }))
        : [],
    };

    const saved = saveWorkspaceData(validatedData);
    if (!saved) {
      return { success: false, message: 'Failed to write imported data to browser storage.' };
    }

    return {
      success: true,
      message: 'Workspace data imported successfully.',
      importedCounts: {
        captions: validatedData.captions.length,
        hashtags: validatedData.hashtagSets.length,
        bios: validatedData.bios.length,
        usernames: validatedData.usernames.length,
        hasBrandKit: Boolean(validatedData.brandKit),
        recentProjects: validatedData.recentProjects.length,
      },
    };
  } catch (err: any) {
    return { success: false, message: `Failed to import file: ${err?.message || 'Invalid format'}` };
  }
}

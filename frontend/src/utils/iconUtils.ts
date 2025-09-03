import * as LucideIcons from 'lucide-react';
import { Users, Database, Shield, Mail, Settings, Home, Search, Plus, Edit, Trash, Eye, Lock, Unlock, Calendar, Clock, Star, Heart, MessageCircle, Bell, Download, Upload, File, Folder, Image, Video, Music, Archive } from 'lucide-react';
import { LucideProps } from 'lucide-react';

// Type for Lucide icon components
type LucideIconComponent = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;

// Default fallback icon
const DEFAULT_ICON = Users;

// Icon mapping for better performance and reliability
const ICON_MAP: Record<string, LucideIconComponent> = {
  Users,
  Database,
  Shield,
  Mail,
  Settings,
  Home,
  Search,
  Plus,
  Edit,
  Trash,
  Eye,
  Lock,
  Unlock,
  Calendar,
  Clock,
  Star,
  Heart,
  MessageCircle,
  Bell,
  Download,
  Upload,
  File,
  Folder,
  Image,
  Video,
  Music,
  Archive,
};

/**
 * Icon Utility Functions
 * 
 * This utility provides dynamic icon xloading for the admin sidebar.
 * Icons are defined in backend/src/admin/entity-map.ts in the EntityLabels object.
 * 
 * Usage:
 * 1. Add icon names to EntityLabels in entity-map.ts (e.g., { label: "Users", icon: "Users" })
 * 2. The admin service will automatically include them in the config
 * 3. The AdminSidebar will dynamically load and display the icons
 * 4. If an icon doesn't exist, it falls back to the default icon
 * 
 * Available Lucide icons: https://lucide.dev/icons/
 */

/**
 * Get a Lucide React icon component by name
 * @param iconName - The name of the icon (e.g., "Users", "Database", "Shield")
 * @returns The icon component or default icon if not found
 */
export const getIconByName = (iconName: string): LucideIconComponent => {
  
  // First try the icon map for better performance
  if (ICON_MAP[iconName]) {
    return ICON_MAP[iconName];
  }
  
  // Fallback to dynamic loading from LucideIcons
  const iconComponent = (LucideIcons as any)[iconName];
  
  console.log('🔍 Found component in LucideIcons:', iconComponent ? 'YES' : 'NO');
  
  // Return the icon if it exists and is a valid component, otherwise return the default icon
  if (iconComponent && typeof iconComponent === 'function') {
    return iconComponent as LucideIconComponent;
  }
  
  return DEFAULT_ICON;
};

/**
 * Check if an icon name exists in Lucide React
 * @param iconName - The name of the icon to check
 * @returns boolean indicating if the icon exists
 */
export const iconExists = (iconName: string): boolean => {
  // Check icon map first
  if (ICON_MAP[iconName]) {
    return true;
  }
  
  // Fallback to dynamic check
  const iconComponent = (LucideIcons as any)[iconName];
  return iconComponent && typeof iconComponent === 'function';
};

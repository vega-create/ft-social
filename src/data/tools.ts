export interface Tool { name: string; slug: string; description: string; icon: string; category: string; }
export interface Category { id: string; name: string; icon: string; }

export const categories: Category[] = [
  { id: 'content', name: 'Content Creation', icon: '✍️' },
  { id: 'image', name: 'Image & Sizing', icon: '🖼️' },
  { id: 'analytics', name: 'Analytics & Stats', icon: '📊' },
  { id: 'profile', name: 'Profile Tools', icon: '👤' },
];

export const tools: Tool[] = [
  { name: 'Hashtag Generator', slug: 'hashtag-gen', description: 'Generate relevant hashtags for any topic or niche.', icon: '#️⃣', category: 'content' },
  { name: 'Caption Generator', slug: 'caption-gen', description: 'Create engaging captions for Instagram, TikTok, and more.', icon: '✏️', category: 'content' },
  { name: 'Tweet Composer', slug: 'tweet-composer', description: 'Compose tweets with character count and thread support.', icon: '🐦', category: 'content' },
  { name: 'Social Image Resizer', slug: 'social-image-resize', description: 'Resize images to exact social media dimensions.', icon: '📐', category: 'image' },
  { name: 'Profile Pic Cropper', slug: 'profile-pic-crop', description: 'Crop images to perfect circles for profile pictures.', icon: '⭕', category: 'image' },
  { name: 'Text to Image', slug: 'text-to-image', description: 'Create quote images and text posts for social sharing.', icon: '🎨', category: 'image' },
  { name: 'Engagement Rate Calc', slug: 'engagement-calc', description: 'Calculate engagement rate for any social media account.', icon: '📈', category: 'analytics' },
  { name: 'Best Time to Post', slug: 'best-time-post', description: 'Find optimal posting times for each platform.', icon: '⏰', category: 'analytics' },
  { name: 'Character Counter', slug: 'char-counter', description: 'Count characters with limits for each social platform.', icon: '🔢', category: 'analytics' },
  { name: 'Bio Generator', slug: 'bio-gen', description: 'Create professional bios for social media profiles.', icon: '📝', category: 'profile' },
  { name: 'Username Checker', slug: 'username-check', description: 'Check username availability across social platforms.', icon: '🔍', category: 'profile' },
  { name: 'Link in Bio Page', slug: 'link-in-bio', description: 'Create a simple link-in-bio page with multiple links.', icon: '🔗', category: 'profile' },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}

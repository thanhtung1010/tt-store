import { InterestGraph } from "@interfaces";

export const INTERESTS_DATA: InterestGraph = {
    nodes: [
        // Root
        { id: 'root', label: '', group: 'root', type: 'root' },

        // 1. Economy (Blue)
        { id: 'Economy', label: 'MAIN.INTERESTS.NODES.ECONOMY', group: 'economy', type: 'category' },
        { id: 'Stock', label: 'MAIN.INTERESTS.ITEMS.STOCK', group: 'economy', type: 'item' },
        { id: 'Crypto', label: 'MAIN.INTERESTS.ITEMS.CRYPTO', group: 'economy', type: 'item' },
        { id: 'Gold', label: 'MAIN.INTERESTS.ITEMS.GOLD', group: 'economy', type: 'item' },
        { id: '6 Jars', label: 'MAIN.INTERESTS.ITEMS.SIX_JARS', group: 'economy', type: 'item' },

        // 2. Domain (Orange)
        { id: 'Domain', label: 'MAIN.INTERESTS.NODES.DOMAIN', group: 'domain', type: 'category' },
        { id: 'CMS', label: 'MAIN.INTERESTS.ITEMS.CMS', group: 'domain', type: 'item' },
        { id: 'Loyalty', label: 'MAIN.INTERESTS.ITEMS.LOYALTY', group: 'domain', type: 'item' },
        { id: 'E-commerce', label: 'MAIN.INTERESTS.ITEMS.ECOMMERCE', group: 'domain', type: 'item' },
        { id: 'News/Blog', label: 'MAIN.INTERESTS.ITEMS.NEWS_BLOG', group: 'domain', type: 'item' },
        { id: 'Real Estate', label: 'MAIN.INTERESTS.ITEMS.REAL_ESTATE', group: 'domain', type: 'item' },

        // 3. Leisure (Green)
        { id: 'Leisure', label: 'MAIN.INTERESTS.NODES.LEISURE', group: 'leisure', type: 'category' },
        { id: 'Music', label: 'MAIN.INTERESTS.ITEMS.MUSIC', group: 'leisure', type: 'item' },
        { id: 'League of Legends', label: 'MAIN.INTERESTS.ITEMS.LOL', group: 'leisure', type: 'item' },
        { id: 'Photography_Leisure', label: 'MAIN.INTERESTS.ITEMS.PHOTOGRAPHY', group: 'leisure', type: 'item' },
        { id: 'Sniper/Archer', label: 'MAIN.INTERESTS.ITEMS.SNIPER_ARCHER', group: 'leisure', type: 'item' },
        { id: 'Coffee', label: 'MAIN.INTERESTS.ITEMS.COFFEE', group: 'leisure', type: 'item' },

        // 4. DIY (Teal/Cyan)
        { id: 'DIY', label: 'MAIN.INTERESTS.NODES.DIY', group: 'diy', type: 'category' },
        { id: '3D Printing', label: 'MAIN.INTERESTS.ITEMS.3D_PRINTING', group: 'diy', type: 'item' },
        { id: '3D Design', label: 'MAIN.INTERESTS.ITEMS.3D_DESIGN', group: 'diy', type: 'item' },
        { id: 'Maker World', label: 'MAIN.INTERESTS.ITEMS.MAKER_WORLD', group: 'diy', type: 'item' },
        { id: 'Handmade', label: 'MAIN.INTERESTS.ITEMS.HANDMADE', group: 'diy', type: 'item' },

        // 5. Tech (Purple)
        { id: 'Tech', label: 'MAIN.INTERESTS.NODES.TECH', group: 'tech', type: 'category' },
        { id: 'Webapp', label: 'MAIN.INTERESTS.ITEMS.WEBAPP', group: 'tech', type: 'item' },
        { id: 'Blockchain', label: 'MAIN.INTERESTS.ITEMS.BLOCKCHAIN', group: 'tech', type: 'item' },
        { id: 'AI', label: 'MAIN.INTERESTS.ITEMS.AI', group: 'tech', type: 'item' },
        { id: 'AR/VR', label: 'MAIN.INTERESTS.ITEMS.AR_VR', group: 'tech', type: 'item' },

        // 6. Design (Pink)
        { id: 'Design', label: 'MAIN.INTERESTS.NODES.DESIGN', group: 'design', type: 'category' },
        { id: 'UIUX Design', label: 'MAIN.INTERESTS.ITEMS.UIUX_DESIGN', group: 'design', type: 'item' },
        { id: 'Animation', label: 'MAIN.INTERESTS.ITEMS.ANIMATION', group: 'design', type: 'item' },
        { id: 'Game Design', label: 'MAIN.INTERESTS.ITEMS.GAME_DESIGN', group: 'design', type: 'item' },
        { id: 'Figma', label: 'MAIN.INTERESTS.ITEMS.FIGMA', group: 'design', type: 'item' },
        { id: 'Adobe', label: 'MAIN.INTERESTS.ITEMS.ADOBE', group: 'design', type: 'item' },
        { id: 'Minimalism', label: 'MAIN.INTERESTS.ITEMS.MINIMALISM', group: 'design', type: 'item' },

        // 7. Lifestyle (Red)
        { id: 'Lifestyle', label: 'MAIN.INTERESTS.NODES.LIFESTYLE', group: 'lifestyle', type: 'category' },
        { id: 'Rap', label: 'MAIN.INTERESTS.ITEMS.RAP', group: 'lifestyle', type: 'item' },
        { id: 'Photography', label: 'MAIN.INTERESTS.ITEMS.PHOTOGRAPHY', group: 'lifestyle', type: 'item' },
        { id: 'Landscape', label: 'MAIN.INTERESTS.ITEMS.LANDSCAPE', group: 'lifestyle', type: 'item' },
        { id: 'Life', label: 'MAIN.INTERESTS.ITEMS.DAILY_LIFE', group: 'lifestyle', type: 'item' },
        { id: 'Street', label: 'MAIN.INTERESTS.ITEMS.STREET', group: 'lifestyle', type: 'item' },
        { id: 'Indie Music', label: 'MAIN.INTERESTS.ITEMS.INDIE_MUSIC', group: 'lifestyle', type: 'item' },
        { id: 'ESports', label: 'MAIN.INTERESTS.ITEMS.ESPORTS', group: 'lifestyle', type: 'item' },
        { id: 'Sports', label: 'MAIN.INTERESTS.ITEMS.SPORTS', group: 'lifestyle', type: 'item' },
        { id: 'Cat', label: 'MAIN.INTERESTS.ITEMS.CAT_LOVER', group: 'lifestyle', type: 'item' },
    ],
    links: [
        // Root connections
        { source: 'root', target: 'Economy' },
        { source: 'root', target: 'Domain' },
        { source: 'root', target: 'Leisure' },
        { source: 'root', target: 'DIY' },
        { source: 'root', target: 'Tech' },
        { source: 'root', target: 'Design' },
        { source: 'root', target: 'Lifestyle' },

        // Economy
        { source: 'Economy', target: 'Stock' },
        { source: 'Economy', target: 'Crypto' },
        { source: 'Economy', target: 'Gold' },
        { source: 'Economy', target: '6 Jars' },

        // Domain
        { source: 'Domain', target: 'CMS' },
        { source: 'Domain', target: 'Loyalty' },
        { source: 'Domain', target: 'E-commerce' },
        { source: 'Domain', target: 'News/Blog' },
        { source: 'Domain', target: 'Real Estate' },

        // Leisure
        { source: 'Leisure', target: 'Music' },
        { source: 'Leisure', target: 'League of Legends' },
        { source: 'Leisure', target: 'Photography_Leisure' },
        { source: 'Leisure', target: 'Sniper/Archer' },
        { source: 'Leisure', target: 'Coffee' },

        // DIY
        { source: 'DIY', target: '3D Printing' },
        { source: 'DIY', target: '3D Design' },
        { source: 'DIY', target: 'Maker World' },
        { source: 'DIY', target: 'Handmade' },

        // Tech
        { source: 'Tech', target: 'Webapp' },
        { source: 'Tech', target: 'Blockchain' },
        { source: 'Tech', target: 'AI' },
        { source: 'Tech', target: 'AR/VR' },

        // Design
        { source: 'Design', target: 'UIUX Design' },
        { source: 'Design', target: 'Animation' },
        { source: 'Design', target: 'Game Design' },
        { source: 'Design', target: 'Figma' },
        { source: 'Design', target: 'Adobe' },
        { source: 'Design', target: 'Minimalism' },

        // Lifestyle
        { source: 'Lifestyle', target: 'Rap' },
        { source: 'Lifestyle', target: 'Photography' },
        { source: 'Photography', target: 'Landscape' },
        { source: 'Photography', target: 'Life' },
        { source: 'Photography', target: 'Street' },
        { source: 'Lifestyle', target: 'Indie Music' },
        { source: 'Lifestyle', target: 'ESports' },
        { source: 'Lifestyle', target: 'Sports' },
        { source: 'Lifestyle', target: 'Cat' },
    ]
};

export const CATEGORY_COLORS: Record<string, string> = {
    economy: '#4f8aff',    // Blue
    domain: '#ff9f4f',     // Orange
    leisure: '#4ebd94',    // Green
    diy: '#20b2aa',        // Teal
    tech: '#a855f7',       // Purple
    design: '#ff69b4',     // Pink
    lifestyle: '#ff5c5c',  // Red
    root: '#ffffff'
};

export const CATEGORY_COLORS_DARK: Record<string, string> = {
    economy: '#60a5fa',    // Lighter Blue
    domain: '#fbbf24',     // Lighter Orange
    leisure: '#34d399',    // Lighter Green
    diy: '#2dd4bf',        // Lighter Teal
    tech: '#c084fc',       // Lighter Purple
    design: '#f472b6',     // Lighter Pink
    lifestyle: '#f87171',  // Lighter Red
    root: '#1f2937'        // Dark gray for root if needed
};
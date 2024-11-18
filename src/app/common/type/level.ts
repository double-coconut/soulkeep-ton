export interface Level {
  id: number;
  name: string;
  hearts: number;
  initialMana: number;
  towerSlots: number;
  spellSlots: number;
  setupTime: number;
  order: number;
  isHeroAllowed: boolean;
  towerMaxLevel: number;
  spellMaxLevel: number;
  fiendHPMultiplier: number;
  fiendSpeedMultiplier: number;
  spells: string[];
  towers: string[];
  introduceSpells: string[];
  introduceTowers: string[];
  introduceFiends: string[];
}

export interface League {
  id: number;
  name: string;
  order: number;
  tier: number;
}

export interface User {
  id: number;
  username: string;
  credits: number;
  souls: number;
  isDeckTutorialPassed: boolean;
  isGameTutorialPassed: boolean;
  isLastLevelPassed: boolean;
  ffaLeagueIndex: number;
  leagueIndex: number;
  ticketBalance: number;
  soulBoxBalance: number;
  isFfa: boolean;
  level: Level;
  league: League;
}

export interface UserAvatar {
  avatar_frame: string;
  profile_image: string;
}

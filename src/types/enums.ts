// Reference: https://www.youtube.com/watch?v=jjMbPt_H3RQ&t=313s

const LOG_LEVEL = {
  DEBUG: 'Debug',
  WARNING: 'Warning',
  ERROR: 'Error',
  INFO: 'Info',
  SUCCESS: 'Success',
  LOG: 'Log',
} as const;

// type ObjectValues<T> = T[keyof T];

// type LogLevelKey = ObjectValues<typeof LOG_LEVEL>;

type LogLevel = keyof typeof LOG_LEVEL;

export function log(message: string, level: LogLevel) {
  console.log(`${LOG_LEVEL[level]}: ${message}`);
}

// log('Hello World', LOG_LEVEL.INFO);
log('Hello World', 'INFO');

const TIERS = ['Basic', 'Pro', 'Enterprise'] as const;

type Tier = (typeof TIERS)[number];

export function tier(tier: Tier) {
  console.log(`Tier: ${tier}`);
}

tier('Basic');

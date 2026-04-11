-- Identity graph schema for natewhiteman.com pixel

CREATE TABLE IF NOT EXISTS identities (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  anon_id       TEXT NOT NULL UNIQUE,
  session_id    TEXT NOT NULL,
  email         TEXT NOT NULL,
  name          TEXT,
  source        TEXT,
  identified_at TEXT NOT NULL,
  ua            TEXT,
  lang          TEXT,
  tz            TEXT,
  referrer      TEXT,
  screen_w      INTEGER,
  screen_h      INTEGER
);

CREATE INDEX IF NOT EXISTS idx_identities_email   ON identities(email);
CREATE INDEX IF NOT EXISTS idx_identities_anon_id ON identities(anon_id);

CREATE TABLE IF NOT EXISTS events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  anon_id    TEXT NOT NULL,
  session_id TEXT NOT NULL,
  event      TEXT NOT NULL,
  url        TEXT,
  props      TEXT, -- JSON string
  ts         TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_anon_id ON events(anon_id);

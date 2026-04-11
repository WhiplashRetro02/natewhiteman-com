-- Migration: 0001_tracking
-- Creates tables used by /api/track (identity pixel + event log)
-- Run against Cloudflare D1:
--   wrangler d1 execute natewhiteman-tracking --file=migrations/0001_tracking.sql

-- One row per anonymous visitor, upserted when they identify via contact form
CREATE TABLE IF NOT EXISTS identities (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  anon_id       TEXT    NOT NULL UNIQUE,           -- persistent browser ID
  session_id    TEXT    NOT NULL DEFAULT '',        -- session ID at time of identify
  email         TEXT    NOT NULL,
  name          TEXT,
  source        TEXT,                               -- e.g. inquiry_form
  identified_at TEXT    NOT NULL,                  -- client ISO timestamp
  ua            TEXT,                               -- user agent
  lang          TEXT,                               -- browser language
  tz            TEXT,                               -- browser timezone
  referrer      TEXT,                               -- document.referrer at session start
  screen_w      INTEGER,
  screen_h      INTEGER,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_identities_email   ON identities(email);
CREATE INDEX IF NOT EXISTS idx_identities_anon_id ON identities(anon_id);

-- Pre-identify session events (page views, CTA clicks, scroll depth, etc.)
CREATE TABLE IF NOT EXISTS events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  anon_id    TEXT    NOT NULL,
  session_id TEXT    NOT NULL DEFAULT '',
  event      TEXT    NOT NULL,                      -- e.g. page_view, cta_click, blog_read
  url        TEXT,
  props      TEXT,                                  -- JSON object
  ts         TEXT    NOT NULL,                      -- client ISO timestamp
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_events_anon_id ON events(anon_id);
CREATE INDEX IF NOT EXISTS idx_events_event   ON events(event);

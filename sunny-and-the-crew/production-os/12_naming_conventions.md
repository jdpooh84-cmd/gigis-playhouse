# Naming Conventions
Episodes: EP## (zero-padded). Slug: kebab-case of title. Finals: EP##-<Slug>-FINAL.mp4. Theme master: THEME-INTRO-MASTER.mp4 (never versioned in name; git history is the version).
Shots: theme T01-T19; episode song A01-A## (B.. C.. for later songs); story/other parts EP##-P<part>-C## (clips) / -S## (shots).
Audio: <song-slug>.mp3 actual master; beds: <slug>-bed.mp3. Higgsfield jobs recorded as UUIDs in trackers — never renamed.
Elements: CharacterName-v# on redesign; characters.json always points to current; old IDs moved to deprecated_element_id fields.
CI workflows: <purpose>-<noun>.yml; trigger marker files .github/<purpose>-trigger.

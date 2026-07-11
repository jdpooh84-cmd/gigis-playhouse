# Folder Structure Spec (repo)
sunny-and-the-crew/
  show_bible.json, production_rules.json, characters.json, locations.json, music_library.json, visual_world_bible.md
  production-os/            (this OS: docs 01-22)
  theme-song/THEME-INTRO-MASTER.mp4   (reusable intro master)
  season_01/
    songs/<Song_Name>/animatic_prompt_bible.md (+ per-song tracker)
    episodes/EP##_<slug>/
      ep##_data.json, ep##_episode_bible.md, song_sections.json, lyrics.txt,
      cue_sheet_episode_##.json, clip_manifest_episode_##.json,
      new_assets_episode_##.md, assembly_plan_episode_##.md,
      production_package/ (script.md, vo_script.md, beat_sheet.md, batch_plan.md)
      EP##-<Slug>-FINAL.mp4 (master, mirrored in Drive FINALS)
_staging/audio/            (Suno masters staged for pipeline; permanent)
_staging/characters_new/   (creator character reference images; permanent archive)
scripts/                   (pipeline python)
.github/workflows/         (CI: fetch, sync, assemble)
DRIVE mirror: "Sunny and the Crew - Production" / {CHARACTERS/<Name>/, MUSIC, EPISODES, FINALS - READY TO UPLOAD}

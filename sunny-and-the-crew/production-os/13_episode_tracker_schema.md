# Episode Status Tracker Schema (Sheets or ep##_data.json)
Columns/fields: ep, title, slug, lesson, song_id, song_actual_seconds, format(std|ext), status(planning|song_locked|sections_mapped|images|videos|assembled|qa|delivered|published), counts{shots_total,images_done,videos_done,reused}, blockers[], drive_final_id, youtube_url, dates{song_locked,assembled,delivered,published}, qa_pass(bool), sp_pass(bool).
Status can only advance when the QA/S&P checklists for that stage pass. ep##_data.json remains the machine source; a Sheet view may mirror it.

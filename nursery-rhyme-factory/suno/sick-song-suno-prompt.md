# Suno Prompt — GP-001
## "What Should We Do? (The Feel Better Song)"
## READY TO PASTE

---

## STEP 1: PASTE INTO "STYLE OF MUSIC" FIELD

```
gentle upbeat children's nursery rhyme, warm piano melody, bright ukulele strums, soft hand percussion, tender female lead vocalist with nurturing quality, warm kids choir on chorus, clear diction for toddlers, 100 bpm verse 85 bpm bridge, C major, lullaby feel in bridge section, cheerful resolution in final chorus, acoustic instruments, no distortion, no minor chords, soothing and safe, toddler-friendly, catchy repeating hook, whimsical bells on chorus, warm reverb, clean mix, emotional arc from worried to happy
```

---

## STEP 2: PASTE INTO "LYRICS" FIELD

```
[Intro]
(cheerful piano, soft humming, birds chirping)

[Verse 1]
Oh someone woke up in the morning light
And tip-toed down the hall just right
They peeked inside and what did they see?
The little one was sick as could be!

There in bed with a red little nose
All wrapped up tight from head to toes
Achoo! Achoo! A great big sneeze
"Oh someone come, come help me please!"

[Chorus]
What should we do? What should we do?
Someone doesn't feel well today!
What should we do? What should we do?
We're going to make it okay!

Rest in bed, drink some soup
Give a hug, feel better soon!
What should we do? What should we do?
We'll take care of you!

[Verse 2]
They got a blanket soft and warm
And tucked the little one snug from the storm
Said "I'll bring you something good to eat!"
A warm bowl of soup — a yummy treat!

Then someone came with the gentlest face
And kissed a forehead in the sweetest place
"Rest your eyes," they sang a song
"We're right here, and we love you strong"

[Chorus]
What should we do? What should we do?
Someone doesn't feel well today!
What should we do? What should we do?
We're going to make it okay!

Rest in bed, drink some soup
Give a hug, feel better soon!
What should we do? What should we do?
We'll take care of you!

[Bridge]
Close your eyes, little one
Feeling sick is no fun
But we're here by your side
Love so warm, love so wide

Sleep and rest, you'll feel better, it's true
We're going to take good care of you
We're all here and we love you too
We love you... we love you...

[Verse 3]
The sunshine came through the window bright
The little one slowly opened their eyes
"I feel a little better!" they said with a smile
"You'll be well again in just a while!"

The little one wiggled their toes with delight
Achoo! — one last sneeze, but they felt alright!
Everyone laughed and clapped with glee
"You're getting better! Now I can see!"

[Chorus]
We knew what to do! We knew what to do!
Someone's feeling better today!
We knew what to do! We knew what to do!
We made the sick go away!

Rest in bed, drank some soup
Got a hug, felt better soon!
We knew what to do! We knew what to do!
We took care of you!

[Outro]
They hugged so nice and tight
"Now you're feeling alright!"
"Thank you, thank you, my dear friend
For taking care of me — right to the end!"

When someone you love doesn't feel well today
You know just what to do, you know what to say
Rest and soup and hugs are the way
And love makes the sick go away!

[End]
(cheerful piano fade, giggles)
```

---

## STEP 3: SET TITLE

```
What Should We Do? (The Feel Better Song) - Gigi's Playhouse
```

---

## GENERATION INSTRUCTIONS

1. Generate **3 variants**
2. Listen for:
   - Clear "What should we do?" hook — must be catchy and memorable
   - Noticeable energy drop in [Bridge] — should feel tender/lullaby
   - Energy return in final [Chorus] — must feel celebratory
   - "Achoo!" — should be sung as a sound effect, not as regular lyric
   - Clean child vocal on verse, choir added on chorus

3. **Reject if:**
   - Vocals are unintelligible on chorus
   - Bridge doesn't slow down noticeably
   - Total duration is under 3:30 or over 5:30
   - Heavy bass or adult-sounding vocal

4. **Save best variant as:** `output/sick-song-v1/audio/sick-song-v1-FINAL.mp3`

---

## BACKUP STYLE PROMPT (if first attempt produces wrong energy)

```
sweet children's nursery rhyme song, acoustic piano, gentle ukulele, kids choir, warm female vocalist, 100 bpm, major key, simple and catchy, toddler singalong, cheerful and loving, soft percussion, no electronic sounds, storybook feel, cozy and bright, repeating hook, call and response chorus, lullaby bridge
```

---

## KNOWN SUNO QUIRKS TO WATCH FOR

- If chorus sounds too adult: add "children's choir lead" to style prompt
- If bridge doesn't slow: add "half-time bridge, lullaby tempo drop" to style
- If "Achoo!" is ignored: try writing it as "Ah-CHOO!" in lyrics
- If energy is flat throughout: add "dynamic contrast, quiet verses loud chorus"
- If outro doesn't fade: add "gentle fade out ending" to style prompt

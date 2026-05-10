/**
 * Content Corpus Generator for Gigi's Playhouse
 * 
 * Generates 30-day lesson sets for each grade band × domain combination.
 * Output: JSON seed files importable by the app.
 * 
 * Grade bands: pre-k, kindergarten, grade-1, grade-2, grade-3
 * Domains: literacy, math, science, social-emotional, social-studies, executive-function
 * 
 * COMPLIANCE: Never uses "curriculum", "lesson plan", "homeschool program", or "accredited".
 * Always uses supplemental/assistive framing.
 */

import type { Lesson, Flashcard, QuizQuestion } from '../client/src/lib/types';

// ─── Characters mapped to domains ─────────────────────────────────────────────
const DOMAIN_CHARACTERS: Record<string, string> = {
  'literacy': 'Lyric',
  'math': 'Justin Jr',
  'science': 'Rachel',
  'social-studies': 'Jamie',
  'social-emotional': 'Kaylah',
  'executive-function': 'Darian',
};

// ─── Lesson Templates per Domain × Grade ──────────────────────────────────────

interface LessonTemplate {
  themes: string[];
  skills: string[][];
  searchTerms: string[];
  materials: string[][];
}

const LITERACY_TEMPLATES: Record<string, LessonTemplate> = {
  'pre-k': {
    themes: ['Letter Recognition', 'Rhyming Words', 'Story Time', 'Name Writing', 'Alphabet Sounds', 'Print Awareness', 'Vocabulary Building', 'Listening Skills', 'Nursery Rhymes', 'Picture Books', 'Environmental Print', 'Oral Language', 'Syllable Clapping', 'Beginning Sounds', 'Color Words', 'Shape Words', 'Animal Names', 'Action Words', 'Feeling Words', 'Family Words', 'Food Words', 'Body Parts', 'Opposites', 'Sequencing Stories', 'Retelling', 'Predicting', 'Letter Tracing', 'Fine Motor Writing', 'Book Handling', 'Left to Right'],
    skills: [['letter-recognition', 'phonics'], ['rhyming', 'phonological-awareness'], ['comprehension', 'vocabulary'], ['writing', 'fine-motor'], ['phonics', 'letter-sounds'], ['print-concepts', 'book-handling'], ['vocabulary', 'oral-language'], ['listening', 'following-directions'], ['rhyming', 'memory'], ['comprehension', 'prediction']],
    searchTerms: ['alphabet for preschoolers', 'rhyming songs for kids', 'story time for preschool', 'letter tracing for kids', 'phonics for preschoolers'],
    materials: [['Crayons', 'Paper'], ['Picture books', 'Stuffed animals'], ['Magnetic letters', 'Cookie sheet'], ['Play dough', 'Letter mats'], ['Finger paint', 'Large paper']],
  },
  'kindergarten': {
    themes: ['CVC Words', 'Sight Words', 'Story Elements', 'Writing Sentences', 'Blending Sounds', 'Word Families', 'Reading Fluency', 'Comprehension', 'Punctuation', 'Capital Letters', 'Short Vowels', 'Long Vowels', 'Digraphs', 'Beginning Blends', 'Ending Sounds', 'High Frequency Words', 'Retelling Stories', 'Making Predictions', 'Author and Illustrator', 'Fiction vs Nonfiction', 'Sequencing Events', 'Main Idea', 'Character Traits', 'Setting', 'Problem and Solution', 'Asking Questions', 'Making Connections', 'Descriptive Writing', 'Opinion Writing', 'Informational Text'],
    skills: [['phonics', 'decoding'], ['sight-words', 'fluency'], ['comprehension', 'story-elements'], ['writing', 'sentence-structure'], ['blending', 'segmenting'], ['word-families', 'patterns'], ['fluency', 'expression'], ['comprehension', 'inference'], ['conventions', 'punctuation'], ['capitalization', 'grammar']],
    searchTerms: ['CVC words for kindergarten', 'sight words songs', 'reading for kindergarten', 'phonics blending', 'kindergarten writing'],
    materials: [['Whiteboard', 'Markers'], ['Sight word cards', 'Magnifying glass'], ['Pencil', 'Lined paper'], ['Letter tiles', 'Word building mat'], ['Books', 'Sticky notes']],
  },
  'grade-1': {
    themes: ['Letter Sounds & Phonics', 'Blending & Segmenting', 'Sight Word Mastery', 'Reading Comprehension', 'Story Writing', 'Vowel Teams', 'R-Controlled Vowels', 'Silent E', 'Compound Words', 'Contractions', 'Prefixes', 'Suffixes', 'Main Idea & Details', 'Compare & Contrast', 'Cause & Effect', 'Fact & Opinion', 'Poetry', 'Narrative Writing', 'Informational Writing', 'Opinion Writing', 'Dialogue', 'Adjectives', 'Verbs', 'Nouns', 'Sentence Types', 'Paragraphs', 'Research Skills', 'Dictionary Skills', 'Fluency Practice', 'Book Reports'],
    skills: [['phonics', 'letter-sounds', 'listening'], ['blending', 'segmenting', 'decoding'], ['sight-words', 'fluency', 'recognition'], ['comprehension', 'inference', 'prediction'], ['writing', 'creativity', 'structure'], ['vowel-teams', 'phonics', 'decoding'], ['r-controlled', 'phonics'], ['silent-e', 'long-vowels'], ['compound-words', 'vocabulary'], ['contractions', 'grammar']],
    searchTerms: ['letter sounds for kids phonics', 'blending sounds first grade', 'sight words practice grade 1', 'reading comprehension grade 1', 'writing for first graders'],
    materials: [['Paper', 'Crayons or pencils'], ['Letter tiles', 'Whiteboard'], ['Sight word flashcards', 'Timer'], ['Books', 'Reading journal'], ['Pencil', 'Story paper']],
  },
  'grade-2': {
    themes: ['Multi-Syllable Words', 'Reading Fluency', 'Text Features', 'Writing Process', 'Grammar Rules', 'Vocabulary in Context', 'Figurative Language', 'Point of View', 'Text Structure', 'Research Writing', 'Persuasive Writing', 'Narrative Elements', 'Poetry Analysis', 'Root Words', 'Homophones', 'Synonyms & Antonyms', 'Context Clues', 'Making Inferences', 'Drawing Conclusions', 'Summarizing', 'Author Purpose', 'Text Evidence', 'Editing & Revising', 'Cursive Introduction', 'Book Genres', 'Library Skills', 'Note Taking', 'Presentations', 'Spelling Patterns', 'Word Origins'],
    skills: [['decoding', 'multi-syllable'], ['fluency', 'expression', 'pacing'], ['text-features', 'nonfiction'], ['writing-process', 'drafting'], ['grammar', 'conventions'], ['vocabulary', 'context-clues'], ['figurative-language', 'comprehension'], ['point-of-view', 'perspective'], ['text-structure', 'organization'], ['research', 'writing']],
    searchTerms: ['second grade reading', 'grammar for grade 2', 'writing process kids', 'vocabulary building grade 2', 'reading comprehension strategies'],
    materials: [['Chapter books', 'Bookmark'], ['Writing journal', 'Pencil'], ['Dictionary', 'Thesaurus'], ['Highlighters', 'Sticky notes'], ['Computer or tablet', 'Paper']],
  },
  'grade-3': {
    themes: ['Advanced Phonics', 'Chapter Books', 'Essay Writing', 'Research Projects', 'Literary Analysis', 'Advanced Grammar', 'Vocabulary Strategies', 'Critical Thinking', 'Digital Literacy', 'Public Speaking', 'Debate Skills', 'Mythology', 'Historical Fiction', 'Science Fiction', 'Biography', 'Autobiography', 'Expository Writing', 'Persuasive Essays', 'Creative Writing', 'Poetry Writing', 'Journalism', 'Script Writing', 'Advanced Comprehension', 'Theme & Moral', 'Symbolism', 'Foreshadowing', 'Flashback', 'Dialogue Writing', 'Paragraph Structure', 'Transitions'],
    skills: [['advanced-phonics', 'decoding'], ['comprehension', 'analysis'], ['essay-writing', 'structure'], ['research', 'citation'], ['literary-analysis', 'critical-thinking'], ['grammar', 'complex-sentences'], ['vocabulary', 'word-study'], ['critical-thinking', 'evaluation'], ['digital-literacy', 'media'], ['speaking', 'presentation']],
    searchTerms: ['third grade reading strategies', 'essay writing for kids', 'grammar grade 3', 'research skills elementary', 'literary analysis kids'],
    materials: [['Novels', 'Reading journal'], ['Lined paper', 'Pencils'], ['Computer', 'Research materials'], ['Presentation board', 'Markers'], ['Dictionary', 'Thesaurus']],
  },
};

const MATH_TEMPLATES: Record<string, LessonTemplate> = {
  'pre-k': {
    themes: ['Counting to 10', 'Shapes', 'Patterns', 'Sorting', 'Comparing Sizes', 'More and Less', 'Number Recognition', 'One-to-One Counting', 'Colors & Counting', 'Spatial Awareness', 'Above & Below', 'Measuring', 'Calendar', 'Time Concepts', 'Money Awareness', 'Graphing', 'Estimation', 'Number Order', 'Grouping', 'Part-Part-Whole', 'Number Writing', 'Counting Objects', 'Counting Actions', 'Shape Hunt', 'Building Patterns', 'Matching', 'Classifying', 'Comparing Weight', 'Comparing Length', 'Counting Songs'],
    skills: [['counting', 'number-recognition'], ['shapes', 'geometry'], ['patterns', 'logic'], ['sorting', 'classifying'], ['comparing', 'measurement']],
    searchTerms: ['counting for preschoolers', 'shapes for kids', 'patterns preschool', 'sorting activities preschool', 'number songs for kids'],
    materials: [['Blocks', 'Counters'], ['Shape cutouts', 'Paper'], ['Beads', 'String'], ['Buttons', 'Bowls'], ['Measuring cups', 'Water']],
  },
  'kindergarten': {
    themes: ['Counting to 20', 'Addition to 5', 'Subtraction from 5', '2D Shapes', '3D Shapes', 'Comparing Numbers', 'Number Bonds', 'Ten Frames', 'Measurement', 'Position Words', 'Patterns & Sequences', 'Data & Graphing', 'Money Coins', 'Time to Hour', 'Word Problems', 'Number Writing', 'Counting by 2s', 'Counting by 5s', 'Counting by 10s', 'Ordinal Numbers', 'Greater Than Less Than', 'Equal Groups', 'Halves', 'Symmetry', 'Weight', 'Capacity', 'Temperature', 'Calendar Math', 'Story Problems', 'Mental Math'],
    skills: [['counting', 'cardinality'], ['addition', 'combining'], ['subtraction', 'taking-away'], ['geometry', 'shapes'], ['measurement', 'comparison']],
    searchTerms: ['kindergarten math counting', 'addition for kids', 'shapes kindergarten', 'number bonds', 'math songs kindergarten'],
    materials: [['Counters', 'Ten frame'], ['Number cards', 'Dice'], ['Rulers', 'Objects to measure'], ['Coins', 'Piggy bank'], ['Clock', 'Schedule cards']],
  },
  'grade-1': {
    themes: ['Numbers & Counting to 20', 'Addition to 10', 'Subtraction to 10', 'Place Value', 'Shapes & Geometry', 'Measurement', 'Time', 'Money', 'Word Problems', 'Patterns', 'Addition to 20', 'Subtraction to 20', 'Comparing Numbers', 'Ordering Numbers', 'Skip Counting', 'Fact Families', 'Number Lines', 'Bar Graphs', 'Tally Charts', 'Fractions Introduction', 'Equal Parts', 'Length', 'Weight', 'Capacity', 'Temperature', 'Calendar', 'Estimation', 'Mental Math Strategies', 'Doubles', 'Making Ten'],
    skills: [['counting', 'number-recognition', 'one-to-one-correspondence'], ['addition', 'combining', 'number-sense'], ['subtraction', 'taking-away', 'comparison'], ['place-value', 'tens-ones'], ['geometry', 'spatial-reasoning']],
    searchTerms: ['counting to 20 for kids', 'addition for first grade', 'subtraction for kids', 'place value grade 1', 'shapes for first grade'],
    materials: [['Kitchen items', 'Paper', 'Pencil'], ['Counters', 'Number line'], ['Base-10 blocks', 'Place value mat'], ['Ruler', 'Tape measure'], ['Clock', 'Coins']],
  },
  'grade-2': {
    themes: ['Addition to 100', 'Subtraction to 100', 'Place Value to 1000', 'Multiplication Introduction', 'Division Introduction', 'Fractions', 'Measurement Units', 'Time to 5 Minutes', 'Money & Change', 'Geometry', 'Arrays', 'Equal Groups', 'Skip Counting Patterns', 'Word Problems Multi-Step', 'Data & Graphs', 'Estimation Strategies', 'Mental Math', 'Regrouping', 'Number Patterns', 'Odd & Even', 'Symmetry', 'Perimeter', 'Area Introduction', 'Capacity', 'Mass', 'Temperature', 'Probability', 'Logic Puzzles', 'Number Sentences', 'Problem Solving Strategies'],
    skills: [['addition', 'regrouping'], ['subtraction', 'borrowing'], ['place-value', 'hundreds'], ['multiplication', 'arrays'], ['fractions', 'parts-of-whole']],
    searchTerms: ['second grade math', 'multiplication introduction', 'fractions for kids', 'place value hundreds', 'word problems grade 2'],
    materials: [['Base-10 blocks', 'Whiteboard'], ['Fraction circles', 'Paper'], ['Ruler', 'Grid paper'], ['Play money', 'Store items'], ['Clock', 'Timer']],
  },
  'grade-3': {
    themes: ['Multiplication Facts', 'Division Facts', 'Multi-Digit Addition', 'Multi-Digit Subtraction', 'Fractions on Number Line', 'Equivalent Fractions', 'Area & Perimeter', 'Time Elapsed', 'Mass & Volume', 'Data Analysis', 'Multiplication Strategies', 'Division Strategies', 'Word Problems Complex', 'Geometry Properties', 'Patterns & Rules', 'Rounding', 'Estimation', 'Order of Operations', 'Number Properties', 'Algebraic Thinking', 'Coordinate Grids', 'Line Plots', 'Bar Graphs', 'Pictographs', 'Measurement Conversion', 'Money Applications', 'Fraction Comparison', 'Mixed Numbers', 'Problem Solving', 'Mathematical Reasoning'],
    skills: [['multiplication', 'facts', 'fluency'], ['division', 'sharing', 'grouping'], ['fractions', 'number-line', 'comparison'], ['geometry', 'area', 'perimeter'], ['data', 'analysis', 'graphing']],
    searchTerms: ['multiplication for third grade', 'division for kids', 'fractions grade 3', 'area and perimeter', 'word problems grade 3'],
    materials: [['Multiplication chart', 'Flash cards'], ['Grid paper', 'Colored pencils'], ['Fraction strips', 'Number line'], ['Ruler', 'Tape measure'], ['Graph paper', 'Data collection sheet']],
  },
};

const SCIENCE_TEMPLATES: Record<string, LessonTemplate> = {
  'pre-k': {
    themes: ['My Five Senses', 'Weather Watching', 'Plants Growing', 'Animals & Habitats', 'Water Play', 'Light & Shadow', 'Magnets', 'Seasons', 'Day & Night', 'Body Parts', 'Healthy Foods', 'Insects', 'Ocean Animals', 'Farm Animals', 'Dinosaurs', 'Space & Stars', 'Rocks & Dirt', 'Float & Sink', 'Hot & Cold', 'Living vs Non-Living', 'Seeds & Growth', 'Butterflies', 'Birds', 'Trees', 'Rain & Clouds', 'Snow & Ice', 'Wind', 'Sound', 'Colors of Light', 'Recycling'],
    skills: [['observation', 'senses'], ['weather', 'recording'], ['life-science', 'growth'], ['animals', 'classification'], ['physical-science', 'properties']],
    searchTerms: ['science for preschoolers', 'five senses activities', 'weather for kids', 'plants growing preschool', 'animals for preschool'],
    materials: [['Magnifying glass', 'Nature items'], ['Seeds', 'Cups', 'Soil'], ['Water', 'Various objects'], ['Magnets', 'Metal objects'], ['Crayons', 'Science journal']],
  },
  'kindergarten': {
    themes: ['Push & Pull', 'Weather Patterns', 'Plant Life Cycle', 'Animal Needs', 'Materials & Properties', 'Sun & Moon', 'Seasons Change', 'Water Cycle', 'Healthy Habits', 'Earth Materials', 'Sound Vibrations', 'Light Sources', 'Motion', 'Gravity', 'Magnets', 'Living Things', 'Habitats', 'Food Chains', 'Recycling', 'Conservation', 'Simple Machines', 'Temperature', 'States of Matter', 'Mixing Colors', 'Shadows', 'Soil', 'Rocks', 'Air', 'Insects Life Cycle', 'Human Body'],
    skills: [['forces', 'motion'], ['weather', 'patterns'], ['life-cycles', 'observation'], ['needs', 'survival'], ['properties', 'materials']],
    searchTerms: ['kindergarten science', 'push and pull forces', 'plant life cycle kids', 'weather patterns kindergarten', 'materials science kids'],
    materials: [['Ramps', 'Toy cars'], ['Weather chart', 'Thermometer'], ['Seeds', 'Pots', 'Water'], ['Animal pictures', 'Sorting cards'], ['Various materials', 'Magnifying glass']],
  },
  'grade-1': {
    themes: ['Light & Sound', 'Animal Parents & Babies', 'Patterns in the Sky', 'Engineering Design', 'Waves & Communication', 'Plant & Animal Structures', 'Young Animals', 'Seasonal Patterns', 'Moon Phases', 'Simple Machines', 'States of Matter', 'Heating & Cooling', 'Animal Adaptations', 'Plant Needs', 'Soil Layers', 'Fossils', 'Weather Tools', 'Natural Resources', 'Pollution', 'Energy Sources', 'Food Webs', 'Camouflage', 'Migration', 'Hibernation', 'Metamorphosis', 'Ecosystems', 'Conservation', 'Inventors', 'Technology', 'Space Exploration'],
    skills: [['light', 'sound', 'waves'], ['life-science', 'heredity'], ['earth-science', 'patterns'], ['engineering', 'design'], ['communication', 'signals']],
    searchTerms: ['science for first grade', 'light and sound experiments', 'animal babies', 'sky patterns kids', 'simple machines for kids'],
    materials: [['Flashlight', 'Mirrors', 'Prisms'], ['Animal cards', 'Drawing paper'], ['Moon journal', 'Binoculars'], ['Building materials', 'Tape'], ['Musical instruments', 'Rubber bands']],
  },
  'grade-2': {
    themes: ['Matter & Properties', 'Earth Events', 'Habitats & Biodiversity', 'Land & Water', 'Plant Dispersal', 'Erosion & Weathering', 'Maps & Landforms', 'Water Sources', 'Animal Groups', 'Insect Life Cycles', 'Food Chains & Webs', 'Natural Disasters', 'Rocks & Minerals', 'Soil Formation', 'Weather Prediction', 'Climate Zones', 'Renewable Energy', 'Reduce Reuse Recycle', 'Human Impact', 'Inventions', 'Scientific Method', 'Hypothesis Testing', 'Data Collection', 'Measurement', 'Classification', 'Observation Skills', 'Comparing', 'Predicting', 'Recording Data', 'Communicating Results'],
    skills: [['matter', 'properties', 'changes'], ['earth-science', 'events'], ['ecosystems', 'biodiversity'], ['geography', 'landforms'], ['life-science', 'dispersal']],
    searchTerms: ['second grade science', 'states of matter kids', 'habitats for kids', 'earth science grade 2', 'plant seeds dispersal'],
    materials: [['Ice', 'Water', 'Container'], ['Rocks', 'Sand', 'Soil'], ['Plant seeds', 'Cups'], ['Maps', 'Globe'], ['Magnifying glass', 'Journal']],
  },
  'grade-3': {
    themes: ['Forces & Motion', 'Life Cycles', 'Weather & Climate', 'Traits & Inheritance', 'Fossils & Evidence', 'Environments & Survival', 'Balanced Forces', 'Magnetic Forces', 'Electric Circuits', 'Energy Transfer', 'Ecosystems', 'Adaptations', 'Extinction', 'Geological Time', 'Rock Cycle', 'Water Cycle Advanced', 'Atmosphere', 'Solar System', 'Stars & Constellations', 'Engineering Challenges', 'Scientific Investigation', 'Variables', 'Fair Testing', 'Data Analysis', 'Graphing Results', 'Drawing Conclusions', 'Peer Review', 'Technology & Society', 'Environmental Solutions', 'Biomimicry'],
    skills: [['forces', 'motion', 'interaction'], ['life-cycles', 'reproduction'], ['weather', 'climate', 'prediction'], ['heredity', 'traits'], ['fossils', 'evidence', 'history']],
    searchTerms: ['third grade science', 'forces and motion grade 3', 'life cycles animals', 'weather and climate kids', 'fossils for kids'],
    materials: [['Magnets', 'Spring scale'], ['Life cycle cards', 'Journal'], ['Weather instruments', 'Chart'], ['Family trait survey', 'Mirrors'], ['Fossil kit', 'Clay']],
  },
};

// Simplified templates for remaining domains
const SOCIAL_EMOTIONAL_TEMPLATES: Record<string, LessonTemplate> = {
  'pre-k': {
    themes: ['Feelings & Emotions', 'Sharing & Taking Turns', 'Being Kind', 'Making Friends', 'Calming Down', 'Using Words', 'Listening to Others', 'Being Brave', 'Saying Sorry', 'Helping Others', 'Being Patient', 'Self-Care', 'Family Love', 'Gratitude', 'Cooperation', 'Empathy', 'Self-Expression', 'Body Language', 'Personal Space', 'Problem Solving', 'Asking for Help', 'Being Honest', 'Respecting Differences', 'Managing Anger', 'Celebrating Others', 'Being a Good Friend', 'Following Rules', 'Being Responsible', 'Trying New Things', 'Growth Mindset'],
    skills: [['emotions', 'identification'], ['sharing', 'cooperation'], ['kindness', 'empathy'], ['friendship', 'social-skills'], ['self-regulation', 'calming']],
    searchTerms: ['feelings for preschoolers', 'sharing for kids', 'kindness activities preschool', 'making friends preschool', 'calming strategies kids'],
    materials: [['Feelings cards', 'Mirror'], ['Sharing toys', 'Timer'], ['Kindness jar', 'Pom poms'], ['Puppets', 'Dolls'], ['Calm down bottle', 'Breathing cards']],
  },
  'kindergarten': { themes: ['Identifying Emotions', 'Self-Regulation', 'Friendship Skills', 'Conflict Resolution', 'Growth Mindset', 'Empathy', 'Responsibility', 'Teamwork', 'Respect', 'Gratitude', 'Perseverance', 'Honesty', 'Courage', 'Patience', 'Forgiveness', 'Inclusion', 'Communication', 'Active Listening', 'Problem Solving', 'Decision Making', 'Goal Setting', 'Self-Confidence', 'Managing Frustration', 'Dealing with Change', 'Being Unique', 'Celebrating Differences', 'Community Helpers', 'Safety Rules', 'Digital Citizenship', 'Mindfulness'], skills: [['emotions', 'awareness'], ['self-regulation', 'strategies'], ['friendship', 'social'], ['conflict', 'resolution'], ['mindset', 'growth']], searchTerms: ['social emotional kindergarten', 'feelings activities kids', 'friendship skills', 'conflict resolution kids', 'growth mindset children'], materials: [['Feelings chart', 'Crayons'], ['Calm corner supplies'], ['Friendship bracelets', 'Beads'], ['Puppet theater', 'Puppets'], ['Growth mindset poster', 'Stickers']] },
  'grade-1': { themes: ['Emotional Vocabulary', 'Coping Strategies', 'Perspective Taking', 'Teamwork', 'Goal Setting', 'Self-Awareness', 'Relationship Skills', 'Responsible Decision Making', 'Managing Anxiety', 'Building Resilience', 'Assertiveness', 'Boundaries', 'Bullying Prevention', 'Digital Kindness', 'Community Building', 'Cultural Awareness', 'Celebrating Strengths', 'Handling Disappointment', 'Positive Self-Talk', 'Mindfulness Practice', 'Breathing Exercises', 'Body Awareness', 'Stress Management', 'Asking for Help', 'Being a Leader', 'Following Through', 'Time Management', 'Organization', 'Flexibility', 'Adaptability'], skills: [['emotional-vocabulary', 'expression'], ['coping', 'strategies'], ['perspective', 'empathy'], ['teamwork', 'collaboration'], ['goals', 'planning']], searchTerms: ['social emotional grade 1', 'coping strategies kids', 'perspective taking children', 'teamwork activities', 'goal setting kids'], materials: [['Feelings journal', 'Colored pencils'], ['Stress ball', 'Fidget tools'], ['Role play cards', 'Scenarios'], ['Team building games'], ['Goal chart', 'Stickers']] },
  'grade-2': { themes: ['Complex Emotions', 'Emotional Intelligence', 'Conflict Mediation', 'Leadership', 'Citizenship', 'Empathy in Action', 'Service Learning', 'Anti-Bullying', 'Digital Wellness', 'Stress Management', 'Mindful Communication', 'Active Listening', 'Giving Feedback', 'Receiving Feedback', 'Compromise', 'Negotiation', 'Self-Advocacy', 'Help-Seeking', 'Peer Support', 'Mentoring', 'Cultural Sensitivity', 'Global Awareness', 'Environmental Responsibility', 'Media Literacy', 'Online Safety', 'Healthy Relationships', 'Family Dynamics', 'Community Service', 'Volunteerism', 'Civic Responsibility'], skills: [['complex-emotions', 'nuance'], ['emotional-intelligence', 'awareness'], ['mediation', 'peace-making'], ['leadership', 'initiative'], ['citizenship', 'community']], searchTerms: ['social emotional grade 2', 'emotional intelligence kids', 'conflict resolution elementary', 'leadership for kids', 'citizenship activities'], materials: [['Emotion wheel', 'Journal'], ['Mediation cards', 'Timer'], ['Leadership badge', 'Chart'], ['Community map', 'Markers'], ['Service project supplies']] },
  'grade-3': { themes: ['Advanced Emotional Regulation', 'Social Problem Solving', 'Ethical Decision Making', 'Advocacy', 'Global Citizenship', 'Identity & Self-Concept', 'Peer Relationships', 'Group Dynamics', 'Conflict Styles', 'Restorative Practices', 'Emotional Resilience', 'Growth Through Failure', 'Positive Psychology', 'Gratitude Practice', 'Mindfulness Meditation', 'Compassion', 'Social Justice', 'Equity & Fairness', 'Diversity & Inclusion', 'Allyship', 'Digital Citizenship Advanced', 'Media Influence', 'Peer Pressure', 'Substance Awareness', 'Body Image', 'Self-Esteem', 'Future Planning', 'Career Exploration', 'Financial Literacy Basics', 'Life Skills'], skills: [['regulation', 'advanced'], ['problem-solving', 'social'], ['ethics', 'decision-making'], ['advocacy', 'voice'], ['citizenship', 'global']], searchTerms: ['social emotional grade 3', 'ethical decision making kids', 'advocacy for children', 'global citizenship elementary', 'resilience building kids'], materials: [['Decision-making cards', 'Scenarios'], ['Advocacy poster', 'Markers'], ['Globe', 'World map'], ['Resilience journal', 'Pen'], ['Mindfulness audio', 'Mat']] },
};

// Generate lessons
function generateLesson(domain: string, gradeBand: string, dayNumber: number, template: LessonTemplate): Lesson {
  const themeIdx = (dayNumber - 1) % template.themes.length;
  const skillIdx = (dayNumber - 1) % template.skills.length;
  const searchIdx = (dayNumber - 1) % template.searchTerms.length;
  const materialIdx = (dayNumber - 1) % template.materials.length;
  const character = DOMAIN_CHARACTERS[domain] || 'Gigi';

  const theme = template.themes[themeIdx];
  const difficulty = dayNumber <= 10 ? 'beginner' : dayNumber <= 20 ? 'intermediate' : 'advanced';

  return {
    id: `${domain}-${gradeBand}-${difficulty.charAt(0)}-d${dayNumber}`,
    domain: domain as any,
    grade_band: gradeBand as any,
    difficulty,
    day_number: dayNumber,
    title: `${theme} Adventure`,
    theme,
    episode: {
      title: `${theme} with ${character}`,
      description: `Today ${character} helps us explore ${theme.toLowerCase()}! Get ready for a fun discovery journey where we'll learn through play and practice.`,
      duration_minutes: 5 + Math.floor(dayNumber / 5),
      skill_tags: template.skills[skillIdx],
      search_term: template.searchTerms[searchIdx],
    },
    activity: {
      title: `${theme} Explorer`,
      instructions: [
        `Get your materials ready: ${template.materials[materialIdx].join(', ')}.`,
        `${character} says: "Let's start our ${theme.toLowerCase()} adventure!"`,
        `Follow along with the activity and take your time.`,
        `Try the challenge on your own — you can do it!`,
        `Share what you discovered with someone you love.`,
      ],
      materials: template.materials[materialIdx],
      short_version: `Quick ${theme.toLowerCase()} practice with ${character}.`,
    },
    apply_prompt: `Find something in your home that connects to ${theme.toLowerCase()}. Show it to a family member and tell them what you learned!`,
    reflection_prompt: `What was the most interesting thing you discovered about ${theme.toLowerCase()} today?`,
    reflect_script: [
      `What did we explore today?`,
      `What was your favorite part?`,
      `What would you like to learn more about?`,
      `How can you use what you learned today?`,
    ],
    quiz: generateQuizForTheme(domain, theme, gradeBand),
    on_track_goal: `Demonstrate understanding of ${theme.toLowerCase()} concepts`,
    stretch_goal: `Apply ${theme.toLowerCase()} knowledge to a new situation`,
    asl_word: theme.split(' ')[0],
    materials_needed: template.materials[materialIdx],
  };
}

function generateQuizForTheme(domain: string, theme: string, gradeBand: string): QuizQuestion[] {
  // Generate 3 quiz questions per lesson
  return [
    {
      question: `What did we learn about in today's ${theme.toLowerCase()} activity?`,
      type: 'multiple-choice',
      options: [theme, 'Something else', 'Nothing new', 'I forgot'],
      correct_answer: 0,
      explanation: `That's right! Today we explored ${theme.toLowerCase()}.`,
    },
    {
      question: `${theme} is something we can practice every day.`,
      type: 'true-false',
      options: ['True', 'False'],
      correct_answer: 0,
      explanation: `Yes! We can always keep practicing and getting better.`,
    },
    {
      question: `Which is the best way to show what you learned?`,
      type: 'multiple-choice',
      options: ['Share with someone', 'Keep it secret', 'Forget about it', 'Never try again'],
      correct_answer: 0,
      explanation: `Sharing what you learn helps you remember and helps others too!`,
    },
  ];
}

// Generate flashcards for a domain/grade
function generateFlashcards(domain: string, gradeBand: string, count: number): Flashcard[] {
  const cards: Flashcard[] = [];
  const templates = getFlashcardTemplates(domain, gradeBand);

  for (let i = 0; i < Math.min(count, templates.length); i++) {
    cards.push({
      id: `fc-${domain}-${gradeBand}-${i + 1}`,
      domain: domain as any,
      front: templates[i].front,
      back: templates[i].back,
      phonics_notation: templates[i].phonics,
      emoji: templates[i].emoji,
    });
  }
  return cards;
}

function getFlashcardTemplates(domain: string, gradeBand: string): { front: string; back: string; phonics?: string; emoji?: string }[] {
  if (domain === 'literacy') {
    if (gradeBand === 'pre-k') return [
      { front: 'A', back: 'Apple starts with A', phonics: '/æ/', emoji: '🍎' },
      { front: 'B', back: 'Ball starts with B', phonics: '/b/', emoji: '⚽' },
      { front: 'C', back: 'Cat starts with C', phonics: '/k/', emoji: '🐱' },
      { front: 'D', back: 'Dog starts with D', phonics: '/d/', emoji: '🐕' },
      { front: 'E', back: 'Elephant starts with E', phonics: '/ɛ/', emoji: '🐘' },
      { front: 'F', back: 'Fish starts with F', phonics: '/f/', emoji: '🐟' },
      { front: 'G', back: 'Giraffe starts with G', phonics: '/g/', emoji: '🦒' },
      { front: 'H', back: 'Hat starts with H', phonics: '/h/', emoji: '🎩' },
      { front: 'I', back: 'Ice cream starts with I', phonics: '/ɪ/', emoji: '🍦' },
      { front: 'J', back: 'Juice starts with J', phonics: '/dʒ/', emoji: '🧃' },
      { front: 'K', back: 'Kite starts with K', phonics: '/k/', emoji: '🪁' },
      { front: 'L', back: 'Lion starts with L', phonics: '/l/', emoji: '🦁' },
      { front: 'M', back: 'Moon starts with M', phonics: '/m/', emoji: '🌙' },
      { front: 'N', back: 'Nest starts with N', phonics: '/n/', emoji: '🪺' },
      { front: 'O', back: 'Orange starts with O', phonics: '/ɒ/', emoji: '🍊' },
      { front: 'P', back: 'Penguin starts with P', phonics: '/p/', emoji: '🐧' },
      { front: 'Q', back: 'Queen starts with Q', phonics: '/kw/', emoji: '👑' },
      { front: 'R', back: 'Rainbow starts with R', phonics: '/r/', emoji: '🌈' },
      { front: 'S', back: 'Sun starts with S', phonics: '/s/', emoji: '☀️' },
      { front: 'T', back: 'Tree starts with T', phonics: '/t/', emoji: '🌳' },
    ];
    if (gradeBand === 'grade-1') return [
      { front: 'cat', back: 'c-a-t (CVC word)', phonics: '/kæt/', emoji: '🐱' },
      { front: 'dog', back: 'd-o-g (CVC word)', phonics: '/dɒg/', emoji: '🐕' },
      { front: 'sun', back: 's-u-n (CVC word)', phonics: '/sʌn/', emoji: '☀️' },
      { front: 'hat', back: 'h-a-t (CVC word)', phonics: '/hæt/', emoji: '🎩' },
      { front: 'bed', back: 'b-e-d (CVC word)', phonics: '/bɛd/', emoji: '🛏️' },
      { front: 'the', back: 'Sight word: the', emoji: '👁️' },
      { front: 'and', back: 'Sight word: and', emoji: '👁️' },
      { front: 'is', back: 'Sight word: is', emoji: '👁️' },
      { front: 'it', back: 'Sight word: it', emoji: '👁️' },
      { front: 'you', back: 'Sight word: you', emoji: '👁️' },
      { front: 'sh', back: 'Digraph: /ʃ/ as in ship', phonics: '/ʃ/', emoji: '🚢' },
      { front: 'ch', back: 'Digraph: /tʃ/ as in chip', phonics: '/tʃ/', emoji: '🍟' },
      { front: 'th', back: 'Digraph: /θ/ as in think', phonics: '/θ/', emoji: '💭' },
      { front: 'cake', back: 'Silent E makes the vowel say its name', phonics: '/keɪk/', emoji: '🎂' },
      { front: 'bike', back: 'Silent E: b-i-k-e', phonics: '/baɪk/', emoji: '🚲' },
      { front: 'rain', back: 'Vowel team AI: /eɪ/', phonics: '/reɪn/', emoji: '🌧️' },
      { front: 'boat', back: 'Vowel team OA: /oʊ/', phonics: '/boʊt/', emoji: '⛵' },
      { front: 'tree', back: 'Vowel team EE: /iː/', phonics: '/triː/', emoji: '🌳' },
      { front: 'night', back: 'IGH pattern: /aɪ/', phonics: '/naɪt/', emoji: '🌙' },
      { front: 'star', back: 'R-controlled: /stɑːr/', phonics: '/stɑːr/', emoji: '⭐' },
    ];
  }
  if (domain === 'math') {
    if (gradeBand === 'pre-k') return [
      { front: '1', back: 'One (show 1 finger)', emoji: '☝️' },
      { front: '2', back: 'Two (show 2 fingers)', emoji: '✌️' },
      { front: '3', back: 'Three', emoji: '3️⃣' },
      { front: '4', back: 'Four', emoji: '4️⃣' },
      { front: '5', back: 'Five (one whole hand!)', emoji: '🖐️' },
      { front: '○', back: 'Circle — round like a ball', emoji: '⚽' },
      { front: '□', back: 'Square — 4 equal sides', emoji: '🟦' },
      { front: '△', back: 'Triangle — 3 sides', emoji: '🔺' },
      { front: 'More', back: '5 is MORE than 3', emoji: '➕' },
      { front: 'Less', back: '2 is LESS than 4', emoji: '➖' },
      { front: '6', back: 'Six', emoji: '6️⃣' },
      { front: '7', back: 'Seven', emoji: '7️⃣' },
      { front: '8', back: 'Eight', emoji: '8️⃣' },
      { front: '9', back: 'Nine', emoji: '9️⃣' },
      { front: '10', back: 'Ten (two whole hands!)', emoji: '🙌' },
      { front: 'AB pattern', back: 'Red Blue Red Blue...', emoji: '🔴🔵' },
      { front: 'Big', back: 'Bigger than the other', emoji: '🐘' },
      { front: 'Small', back: 'Smaller than the other', emoji: '🐁' },
      { front: 'First', back: 'Number 1 in line', emoji: '🥇' },
      { front: 'Last', back: 'At the end of the line', emoji: '🏁' },
    ];
    if (gradeBand === 'grade-1') return [
      { front: '2 + 3', back: '5', emoji: '🧮' },
      { front: '5 + 5', back: '10', emoji: '🧮' },
      { front: '7 - 3', back: '4', emoji: '🧮' },
      { front: '10 - 6', back: '4', emoji: '🧮' },
      { front: '8 + 2', back: '10', emoji: '🧮' },
      { front: '15 = _ tens _ ones', back: '1 ten 5 ones', emoji: '🔢' },
      { front: '20 = _ tens', back: '2 tens', emoji: '🔢' },
      { front: 'Double 4', back: '4 + 4 = 8', emoji: '✖️' },
      { front: 'Double 5', back: '5 + 5 = 10', emoji: '✖️' },
      { front: '> means', back: 'Greater than', emoji: '↗️' },
      { front: '< means', back: 'Less than', emoji: '↙️' },
      { front: '= means', back: 'Equal to', emoji: '⚖️' },
      { front: '1/2', back: 'One half — split in 2 equal parts', emoji: '🍕' },
      { front: '1/4', back: 'One quarter — split in 4 equal parts', emoji: '🍰' },
      { front: 'Penny', back: '1 cent', emoji: '🪙' },
      { front: 'Nickel', back: '5 cents', emoji: '🪙' },
      { front: 'Dime', back: '10 cents', emoji: '🪙' },
      { front: 'Quarter', back: '25 cents', emoji: '🪙' },
      { front: 'Hour hand', back: 'Short hand on clock', emoji: '🕐' },
      { front: 'Minute hand', back: 'Long hand on clock', emoji: '🕐' },
    ];
  }
  // Default generic flashcards
  return Array.from({ length: 20 }, (_, i) => ({
    front: `${domain} concept ${i + 1}`,
    back: `Definition for ${domain} concept ${i + 1} (${gradeBand})`,
    emoji: '📝',
  }));
}

// ─── Main Generation ──────────────────────────────────────────────────────────

const GRADE_BANDS = ['pre-k', 'kindergarten', 'grade-1', 'grade-2', 'grade-3'];
const DOMAINS = ['literacy', 'math', 'science', 'social-emotional'];
const DAYS_PER_PATH = 30;
const FLASHCARDS_PER_PATH = 20;

const allLessons: Lesson[] = [];
const allFlashcards: Flashcard[] = [];

for (const gradeBand of GRADE_BANDS) {
  for (const domain of DOMAINS) {
    let template: LessonTemplate;
    if (domain === 'literacy') template = LITERACY_TEMPLATES[gradeBand];
    else if (domain === 'math') template = MATH_TEMPLATES[gradeBand];
    else if (domain === 'science') template = SCIENCE_TEMPLATES[gradeBand];
    else template = SOCIAL_EMOTIONAL_TEMPLATES[gradeBand];

    if (!template) continue;

    // Generate 30 days of lessons
    for (let day = 1; day <= DAYS_PER_PATH; day++) {
      allLessons.push(generateLesson(domain, gradeBand, day, template));
    }

    // Generate flashcards
    const cards = generateFlashcards(domain, gradeBand, FLASHCARDS_PER_PATH);
    allFlashcards.push(...cards);
  }
}

console.log(`Generated ${allLessons.length} lessons across ${GRADE_BANDS.length} grades × ${DOMAINS.length} domains`);
console.log(`Generated ${allFlashcards.length} flashcards`);

// Export for use
export { allLessons, allFlashcards };

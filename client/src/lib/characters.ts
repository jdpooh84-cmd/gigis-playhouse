/**
 * Character System — All 9 Gigi's Playhouse characters
 * Each character has 3 states: idle, teaching, celebrating
 * Characters are domain-specific guides
 */

export interface CharacterDef {
  id: string;
  name: string;
  domain: string;
  emoji: string;
  color: string;
  bgClass: string;
  description: string;
  voice: {
    pitch: number;
    rate: number;
    webSpeechName: string;
  };
  greetings: string[];
  encouragements: string[];
  celebrations: string[];
}

export const CHARACTERS: CharacterDef[] = [
  {
    id: "gigi",
    name: "Gigi",
    domain: "host",
    emoji: "🐱",
    color: "#F59E0B",
    bgClass: "bg-amber-100",
    description: "Maine Coon cat, brown tabby, white bib/paws, pink nose, golden eyes",
    voice: { pitch: 1.3, rate: 0.9, webSpeechName: "Samantha" },
    greetings: [
      "Welcome to Gigi's Playhouse! I'm so happy you're here!",
      "Hey there, friend! Ready to learn something amazing today?",
      "Good morning, sunshine! Let's make today the best day ever!",
      "I missed you! Let's pick up right where we left off!",
    ],
    encouragements: [
      "You're doing great! Keep going!",
      "I believe in you! Try again!",
      "Almost there! You've got this!",
    ],
    celebrations: [
      "WOW! You did it! I'm so proud of you!",
      "Amazing job! You're a superstar!",
      "That was incredible! High five!",
    ],
  },
  {
    id: "leo",
    name: "Lyric",
    domain: "literacy",
    emoji: "🦁",
    color: "#8B5CF6",
    bgClass: "bg-purple-100",
    description: "Friendly lion with glasses who loves books and stories",
    voice: { pitch: 0.9, rate: 0.85, webSpeechName: "Daniel" },
    greetings: ["Let's read a story together!", "Words are like magic — let me show you!"],
    encouragements: ["Sound it out — you can do it!", "Every reader started just like you!"],
    celebrations: ["You read that perfectly!", "What a wonderful reader you are!"],
  },
  {
    id: "nova",
    name: "Justin Jr",
    domain: "math",
    emoji: "🦊",
    color: "#3B82F6",
    bgClass: "bg-blue-100",
    description: "Clever fox with a calculator who makes numbers fun",
    voice: { pitch: 1.2, rate: 0.9, webSpeechName: "Karen" },
    greetings: ["Numbers are everywhere! Let's count!", "Math is like a puzzle — let's solve it!"],
    encouragements: ["Think about it step by step!", "Numbers are your friends!"],
    celebrations: ["You figured it out! Math genius!", "That's the right answer! Brilliant!"],
  },
  {
    id: "sage",
    name: "Rachel",
    domain: "science",
    emoji: "🦉",
    color: "#10B981",
    bgClass: "bg-green-100",
    description: "Wise owl with a magnifying glass who explores nature",
    voice: { pitch: 0.8, rate: 0.85, webSpeechName: "Alex" },
    greetings: ["Let's discover something new today!", "Science is all about asking why!"],
    encouragements: ["Great observation! What do you notice?", "Scientists never give up!"],
    celebrations: ["What a discovery! You're a real scientist!", "Excellent experiment!"],
  },
  {
    id: "atlas",
    name: "Jamie",
    domain: "social-studies",
    emoji: "🐻",
    color: "#F59E0B",
    bgClass: "bg-amber-100",
    description: "Adventurous bear with a globe who explores the world",
    voice: { pitch: 0.7, rate: 0.85, webSpeechName: "Daniel" },
    greetings: ["Let's explore the world together!", "Every place has a story!"],
    encouragements: ["Think about how others feel!", "You're a great explorer!"],
    celebrations: ["You learned something about our world!", "What an adventure!"],
  },
  {
    id: "sunny",
    name: "Kaylah",
    domain: "social-emotional",
    emoji: "🐶",
    color: "#F97316",
    bgClass: "bg-orange-100",
    description: "Friendly golden retriever who teaches about feelings and friendship",
    voice: { pitch: 1.1, rate: 0.9, webSpeechName: "Samantha" },
    greetings: ["How are you feeling today?", "Let's talk about our feelings!"],
    encouragements: ["It's okay to feel that way!", "You're so brave for trying!"],
    celebrations: ["You're such a good friend!", "I'm proud of how you handled that!"],
  },
  {
    id: "spark",
    name: "Darian",
    domain: "executive-function",
    emoji: "🐿️",
    color: "#6366F1",
    bgClass: "bg-indigo-100",
    description: "Organized squirrel who helps with planning and focus",
    voice: { pitch: 1.3, rate: 1.0, webSpeechName: "Karen" },
    greetings: ["Let's make a plan!", "Focus time — you've got this!"],
    encouragements: ["One step at a time!", "Stay focused — you're almost there!"],
    celebrations: ["Great planning! You did it!", "You stayed focused the whole time!"],
  },
  {
    id: "chris",
    name: "Chris",
    domain: "movement",
    emoji: "🐸",
    color: "#22C55E",
    bgClass: "bg-emerald-100",
    description: "Energetic frog who leads movement breaks and exercises",
    voice: { pitch: 1.2, rate: 1.1, webSpeechName: "Alex" },
    greetings: ["Time to move your body!", "Let's get some energy out!"],
    encouragements: ["Jump higher! Reach further!", "You're doing amazing!"],
    celebrations: ["Great moves! You're a dancing star!", "That was so much fun!"],
  },
];

export function getCharacterByDomain(domain: string): CharacterDef {
  return CHARACTERS.find((c) => c.domain === domain) || CHARACTERS[0];
}

export function getCharacterById(id: string): CharacterDef {
  return CHARACTERS.find((c) => c.id === id) || CHARACTERS[0];
}

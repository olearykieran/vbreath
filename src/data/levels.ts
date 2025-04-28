import { Level } from '../types';

export const levels: Level[] = [
  {
    id: 0,
    name: "Calm Start",
    meshType: "sphere",
    inhaleDur: 4,
    exhaleDur: 4,
    colorPalette: {
      primary: "#3B82F6",
      secondary: "#60A5FA",
      accent: "#93C5FD"
    },
    audio: {
      musicURL: "https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3",
      inhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
      exhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
    },
    premium: false
  },
  {
    id: 1,
    name: "Loving Heart",
    meshType: "sphere",
    inhaleDur: 4,
    exhaleDur: 6,
    colorPalette: {
      primary: "#EC4899",
      secondary: "#F472B6",
      accent: "#FBCFE8"
    },
    audio: {
      musicURL: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0da10f5d8.mp3",
      inhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
      exhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
    },
    premium: false
  },
  {
    id: 2,
    name: "Teddy Comfort",
    meshType: "sphere",
    inhaleDur: 3,
    exhaleDur: 3,
    colorPalette: {
      primary: "#B45309",
      secondary: "#D97706",
      accent: "#FDE68A"
    },
    audio: {
      musicURL: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
      inhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/19/audio_270f49b83d.mp3",
      exhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/19/audio_270f49b83d.mp3"
    },
    premium: false
  },
  {
    id: 3,
    name: "Deep Ocean",
    meshType: "torus",
    inhaleDur: 5,
    exhaleDur: 7,
    colorPalette: {
      primary: "#0284C7",
      secondary: "#0EA5E9",
      accent: "#38BDF8"
    },
    audio: {
      musicURL: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
      inhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/19/audio_270f49b83d.mp3",
      exhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/19/audio_270f49b83d.mp3"
    },
    premium: false
  },
  {
    id: 4,
    name: "Mountain Peaks",
    meshType: "icosahedron",
    inhaleDur: 4,
    exhaleDur: 8,
    colorPalette: {
      primary: "#4F46E5",
      secondary: "#6366F1",
      accent: "#818CF8"
    },
    audio: {
      musicURL: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0da10f5d8.mp3",
      inhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
      exhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
    },
    premium: true
  },
  {
    id: 5,
    name: "Cosmic Flow",
    meshType: "octahedron",
    inhaleDur: 6,
    exhaleDur: 6,
    colorPalette: {
      primary: "#9333EA",
      secondary: "#A855F7",
      accent: "#C084FC"
    },
    audio: {
      musicURL: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_7938da1c42.mp3",
      inhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
      exhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
    },
    premium: true
  },
  {
    id: 6,
    name: "Wim Hof Method",
    meshType: "dodecahedron",
    inhaleDur: 1.5,
    exhaleDur: 1.5,
    rounds: [
      { breathCount: 30, holdDuration: 60 },
      { breathCount: 30, holdDuration: 75 },
      { breathCount: 30, holdDuration: 90 }
    ],
    colorPalette: {
      primary: "#2563EB",
      secondary: "#1D4ED8",
      accent: "#60A5FA"
    },
    audio: {
      musicURL: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
      inhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
      exhaleSFX: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
    },
    premium: true
  }
];
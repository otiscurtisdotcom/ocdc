import { Color } from "@react-three/fiber";

export interface Site {
  title: string;
  text: string;
  link: string;
  color: Color;
}

export const sites: Site[] =[
  {
    title: 'STROLLIN',
    text: 'Angular / PixiJS',
    link: 'https://otiscurtisdotcom.github.io/strollin/',
    color: 0x8899cc,
  },
  {
    title: 'JAZZMACHINE',
    text: 'Tone.js',
    link: 'https://otiscurtisdotcom.github.io/jazzmachine/',
    color: 0x88bb99,
  },
  {
    title: 'E1FY',
    text: 'Angular',
    link: 'https://otiscurtisdotcom.github.io/eresoneforya/',
    color: 0xccbb88,
  },
  {
    title: 'VIDZ',
    text: 'React',
    link: 'https://otiscurtisdotcom.github.io/vidz/',
    color: 0x8899aa,
  },
  {
    title: 'RAPMACHINE',
    text: 'Tone.js',
    link: 'https://otiscurtisdotcom.github.io/rapmachine/',
    color: 0xaa9988,
  },
  {
    title: 'O-RIGHT',
    text: 'React',
    link: 'https://otiscurtisdotcom.github.io/o-right/',
    color: 0xddcc88,
  },
  {
    title: 'STORYMAKER',
    text: 'React',
    link: 'https://otiscurtisdotcom.github.io/storymaker/',
    color: 0xaacc88,
  },
]
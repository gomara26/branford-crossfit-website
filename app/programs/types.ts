export interface FAQ {
  question: string;
  answer: string;
}

export interface Program {
  title: string;
  description: string;
  idealFor: string[];
  schedule: string;
  slug: string;
  image: string;
  faq?: FAQ[];
} 
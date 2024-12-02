//paper.ts
export interface Paper {
  id: string;
  title: string;
  category: string;
  abstract: string;
  authors: string[];
  date: string;
  keywords: string[];
  pdfId: string;
  featured: boolean;
}
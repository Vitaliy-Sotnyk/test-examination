export default interface SearchedItem {
  id: number;
  title: string;
  description: string;
  promotion: { top_ad: boolean };
  params: Param[];
  location: Location;
  photos: Photo[];
  category: { type: string }; 
}

interface Param {
  key?: string;
  name?: string;
  value?: {
    value?: number,
    currency?: string,
    label?: string
  };
}

interface Location {
  city: { name: string, normalized_name: string };
  district?: { name: string };
  region: { name: string };
}

interface Photo {
  filename: string;
}
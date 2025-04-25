
export interface DocumentFile {
  id: string;
  name: string;
  nameAr?: string;
  type: string;
  size: number;
  url: string;
  status: 'uploaded' | 'uploading' | 'error' | 'required' | 'verified';
  uploadProgress?: number;
  lastModified: string;
  errorMessage?: string;
}

export interface DocumentType {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  required: boolean;
  acceptedFormats: string[];
  maxSize: number;
  files: DocumentFile[];
}

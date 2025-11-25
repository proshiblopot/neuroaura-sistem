
export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AnalysisResult {
  methodology: string;
  graphic_analysis: string;
  detailing: string;
  psycho_features: string;
  cognitive_level: {
    level: string;
    reasoning: string;
  };
  recommendations: string;
}

export interface ImageFile {
  file: File;
  previewUrl: string;
  base64: string;
}

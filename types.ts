
export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface CognitiveBlock {
  scenario?: string; // "СЦЕНАРІЙ А" або "СЦЕНАРІЙ Б"
  score?: number | null; // 0-9 для Сценарію А, або null/-1 для Сценарію Б
  level: string; // Рівень когнітивного розвитку
  criteria_breakdown?: string; // 9 критеріїв кодування (для Сценарію А)
  structural_analysis: string; // Структурна складність, диференційованість деталей та оригінальність
}

export interface ProjectiveBlock {
  graphomotor_analysis: string; // visual line intensity, line character, size & sheet placement
  emotional_state: string; // emotions, tension level, self-esteem, social adaptation
  projective_details: string; // Non-existent animal or HTP features
  recommendations: string; // indicative recommendations
}

export interface AnalysisResult {
  methodology: string;
  used_model?: string;
  cognitive_block: CognitiveBlock;
  projective_block: ProjectiveBlock;
  dss_note: string;

  // Backward compatibility fields
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


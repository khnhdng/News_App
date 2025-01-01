declare module 'react-native-voice' {
    export interface SpeechResultsEvent {
      value: string[];
    }
  
    export interface SpeechErrorEvent {
      error: {
        message: string;
        code: string;
      };
    }
  
    class Voice {
      static start(locale: string): Promise<void>;
      static stop(): Promise<void>;
      static destroy(): Promise<void>;
      static isRecognizing(): Promise<boolean>;
      static removeAllListeners(): void;
  
      static onSpeechStart: ((event: any) => void) | null;
      static onSpeechRecognized: ((event: any) => void) | null;
      static onSpeechEnd: ((event: any) => void) | null;
      static onSpeechError: ((event: SpeechErrorEvent) => void) | null;
      static onSpeechResults: ((event: SpeechResultsEvent) => void) | null;
      static onSpeechPartialResults: ((event: SpeechResultsEvent) => void) | null;
      static onSpeechVolumeChanged: ((event: { value: number }) => void) | null;
    }
  
    export default Voice;
  }
  
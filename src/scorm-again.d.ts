
// types/pipwerks.d.ts
declare module "pipwerks-scorm-api-wrapper" {
  interface SCORM {
    version: string;
    init(): boolean;
    get(cmiElement: string): string | null;
    set(cmiElement: string, value: string): boolean;
    quit(): void;
  }

  const SCORM: SCORM;
}

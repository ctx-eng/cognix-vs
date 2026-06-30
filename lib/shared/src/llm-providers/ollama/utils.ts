export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
}

export async function fetchLocalOllamaModels(baseUrl: string = 'http://localhost:11434'): Promise<OllamaModel[]> {
  try {
    const response = await fetch(`${baseUrl}/api/tags`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.models ?? [];
  } catch {
    return [];
  }
}

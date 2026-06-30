export interface ModelRef {
  providerId: string;
  apiVersionId: string;
  modelId: string;
}

export type ModelRefStr = string & { __brand: 'ModelRefStr' };

/**
 * Parses a model reference string into its components.
 * Supports two formats:
 * - New: "providerId::apiVersionId::modelId"
 * - Legacy: "providerId/modelId"
 */
export function parseModelRef(ref: ModelRefStr): ModelRef {
  const parts = ref.split('::', 3);
  if (parts.length >= 3) {
    return {
      providerId: parts[0],
      apiVersionId: parts[1],
      modelId: parts.slice(2).join('::'),
    };
  }
  const legacy = ref.split('/', 2);
  return {
    providerId: legacy[0] || 'unknown',
    apiVersionId: 'unknown',
    modelId: legacy[1] || ref,
  };
}

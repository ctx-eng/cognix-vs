export enum ProgrammingLanguage {
  JavaScript = 'javascript',
  TypeScript = 'typescript',
  Python = 'python',
  Go = 'go',
  Rust = 'rust',
  Java = 'java',
  Kotlin = 'kotlin',
  C = 'c',
  CPP = 'cpp',
  CSharp = 'csharp',
  Ruby = 'ruby',
  PHP = 'php',
  Swift = 'swift',
  ObjectiveC = 'objective-c',
  Scala = 'scala',
  Shell = 'shell',
  HTML = 'html',
  CSS = 'css',
  SQL = 'sql',
  Markdown = 'markdown',
  JSON = 'json',
  YAML = 'yaml',
  XML = 'xml',
  Dockerfile = 'dockerfile',
  Unknown = 'unknown',
}

const extensionMap: Record<string, ProgrammingLanguage> = {
  '.js': ProgrammingLanguage.JavaScript,
  '.jsx': ProgrammingLanguage.JavaScript,
  '.ts': ProgrammingLanguage.TypeScript,
  '.tsx': ProgrammingLanguage.TypeScript,
  '.py': ProgrammingLanguage.Python,
  '.go': ProgrammingLanguage.Go,
  '.rs': ProgrammingLanguage.Rust,
  '.java': ProgrammingLanguage.Java,
  '.kt': ProgrammingLanguage.Kotlin,
  '.c': ProgrammingLanguage.C,
  '.cpp': ProgrammingLanguage.CPP,
  '.cc': ProgrammingLanguage.CPP,
  '.cxx': ProgrammingLanguage.CPP,
  '.cs': ProgrammingLanguage.CSharp,
  '.rb': ProgrammingLanguage.Ruby,
  '.php': ProgrammingLanguage.PHP,
  '.swift': ProgrammingLanguage.Swift,
  '.m': ProgrammingLanguage.ObjectiveC,
  '.mm': ProgrammingLanguage.ObjectiveC,
  '.scala': ProgrammingLanguage.Scala,
  '.sh': ProgrammingLanguage.Shell,
  '.bash': ProgrammingLanguage.Shell,
  '.html': ProgrammingLanguage.HTML,
  '.css': ProgrammingLanguage.CSS,
  '.sql': ProgrammingLanguage.SQL,
  '.md': ProgrammingLanguage.Markdown,
  '.json': ProgrammingLanguage.JSON,
  '.yaml': ProgrammingLanguage.YAML,
  '.yml': ProgrammingLanguage.YAML,
  '.xml': ProgrammingLanguage.XML,
  '.dockerfile': ProgrammingLanguage.Dockerfile,
};

const markdownCodeBlockMap: Record<string, string> = {
  [ProgrammingLanguage.JavaScript]: 'javascript',
  [ProgrammingLanguage.TypeScript]: 'typescript',
  [ProgrammingLanguage.Python]: 'python',
  [ProgrammingLanguage.Go]: 'go',
  [ProgrammingLanguage.Rust]: 'rust',
  [ProgrammingLanguage.Java]: 'java',
  [ProgrammingLanguage.CPP]: 'cpp',
  [ProgrammingLanguage.CSharp]: 'csharp',
  [ProgrammingLanguage.Ruby]: 'ruby',
  [ProgrammingLanguage.PHP]: 'php',
  [ProgrammingLanguage.Swift]: 'swift',
  [ProgrammingLanguage.Shell]: 'bash',
  [ProgrammingLanguage.HTML]: 'html',
  [ProgrammingLanguage.CSS]: 'css',
  [ProgrammingLanguage.SQL]: 'sql',
  [ProgrammingLanguage.Markdown]: 'markdown',
  [ProgrammingLanguage.JSON]: 'json',
  [ProgrammingLanguage.YAML]: 'yaml',
  [ProgrammingLanguage.XML]: 'xml',
};

export function languageFromFilename(filename: string): ProgrammingLanguage {
  const ext = Object.entries(extensionMap).find(([key]) => filename.endsWith(key));
  return ext ? ext[1] : ProgrammingLanguage.Unknown;
}

export function markdownCodeBlockLanguageIDForFilename(filename: string): string | undefined {
  const lang = languageFromFilename(filename);
  return markdownCodeBlockMap[lang];
}

export function extensionForLanguage(language: ProgrammingLanguage): string | undefined {
  const entry = Object.entries(extensionMap).find(([, v]) => v === language);
  return entry?.[0];
}

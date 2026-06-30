export function reformatBotMessageForChat(text: string): string {
  return text.replace(/^## /gm, '### ').replace(/^# /gm, '## ');
}

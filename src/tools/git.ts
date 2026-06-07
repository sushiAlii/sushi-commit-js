import { execSync } from 'child_process';

export function getGitDiff(): string {
  try {
    const diff = execSync('git diff HEAD').toString().trim();

    return diff || 'No changes detected.';
  } catch (error) {
    console.error('Error getting git diff:', error);

    return 'Error: Not a git repository or git is not installed.';
  }
}

export function submitGitCommit(message: string): string {
  try {
    execSync('git add .');
    execSync(`git commit -m "${message}"`);

    return `🍣 Success! Committed changes with message: "${message}"`;
  } catch (error) {
    console.error('Error submitting git commit:', error);

    return `❌ Failed to execute commit command: ${error}`;
  }
}

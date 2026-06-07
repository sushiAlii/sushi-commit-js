import { execSync } from 'child_process';
import type { ExecutionResult } from '../types';

export function getGitDiff(): string {
  try {
    const diff = execSync('git diff HEAD').toString().trim();

    return diff || 'No changes detected.';
  } catch (error) {
    console.error('Error getting git diff:', error);

    return 'Error: Not a git repository or git is not installed.';
  }
}

export function submitGitCommit(message: string): ExecutionResult {
  try {
    execSync('git add .');
    execSync(`git commit -m "${message}"`);

    return {
      success: true,
      message: `🍣 Success! Committed changes with message: "${message}"`,
    };
  } catch (error) {
    console.error('Error submitting git commit:', error);

    return {
      success: false,
      message: `❌ Failed to execute commit command: ${error}`,
    };
  }
}

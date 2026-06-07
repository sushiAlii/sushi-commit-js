#!/usr/bin/env node

import Anthropic from '@anthropic-ai/sdk';
import { AgentContextStatus } from './constants';
import type { AgentContext, ExecutionResult } from './types';
import { getGitDiff, submitGitCommit } from './tools/git';
import { CommitAnalysisSchema } from './schemas/commit';

console.log('🍣 Valar Morghulis! Welcome to sushi-commit-js! ');

const anthropic = new Anthropic();

async function main() {
  const context: AgentContext = {
    diff: '',
    status: AgentContextStatus.Idle,
  };

  console.log('🍣 sushi-commit-js: Inspecting your workspace alterations...');
  context.status = AgentContextStatus.Observing;
  context.diff = getGitDiff();

  if (context.diff === 'No modifications found.') {
    console.log('✨ Your workspace is clean. Nothing to commit!');
    context.status = AgentContextStatus.Completed;
    return;
  }

  if (context.diff.startsWith('Error:')) {
    console.error(context.diff);
    context.status = AgentContextStatus.Failed;
    return;
  }

  console.log('🧠 Submitting diff payload to Claude for analysis...');
  context.status = AgentContextStatus.Thinking;

  try {
    const res = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      temperature: 0,
      system: `You are an expert software engineer. Analyze the provided 'git diff' text and generate a clean conventional commit message. 
      commit message should follow the format: <type>(<scope>): <description>.
      The 'type' should be one of the following: feat, fix, docs, style, refactor, perf, test, chore.
      The 'scope' should be a brief noun describing the area of the code affected (e.g., "auth", "ui", "api").
      The 'description' should be a concise summary of the changes made, written in imperative mood and not exceeding 72 characters.
      description should be clear and concise
      You MUST respond ONLY with a raw JSON object matching this schema structure:
      {
        "rationale": "Brief string summarizing your code review findings",
        "commitMessage": "feat/fix/docs: small and concise message under 72 chars"
      }`,
      messages: [{ role: 'user', content: `Here is my git diff:\n\n${context.diff}` }],
    });

    const contentBlock = res.content[0];
    if (contentBlock?.type !== 'text') {
      throw new Error('Claude returned a non-text block.');
    }

    const rawJson = JSON.parse(contentBlock.text.trim());
    context.analysis = CommitAnalysisSchema.parse(rawJson);

    console.log(`\n📋 Chef's Review Rationale: ${context.analysis.rationale}`);
    console.log(`🤖 Suggested Commit Command: "${context.analysis.commitMessage}"`);

    context.status = AgentContextStatus.Executing;
    const result: ExecutionResult = submitGitCommit(context.analysis.commitMessage);

    console.log(`\n${result.message}`);
    context.status = result.success ? AgentContextStatus.Completed : AgentContextStatus.Failed;
  } catch (error) {
    context.status = AgentContextStatus.Failed;
    console.error('\n🚨 Pipeline Failure:', error);
  }
}

main();

import z from 'zod';

export const CommitAnalysisSchema = z.object({
  rationale: z
    .string()
    .describe('A brief code review summarizing the core changes found in the diff.'),
  commitMessage: z.string().refine(
    (msg) => {
      return /^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: /.test(msg);
    },
    {
      message:
        "Commit message must follow Conventional Commits formatting (e.g., 'feat: add git tool')",
    }
  ),
});

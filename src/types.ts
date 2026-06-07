import type z from 'zod';
import type { CommitAnalysisSchema } from './schemas/commit';

export type CommitAnalysis = z.infer<typeof CommitAnalysisSchema>;

export interface ExecutionResult {
  success: boolean;
  message: string;
  output?: string;
}

export interface AgentContext {
  diff: string;
  analysis?: CommitAnalysis;
  status: 'idle' | 'observing' | 'thinking' | 'executing' | 'completed' | 'failed';
}

import { CompactMessage, ConversationSession } from './types.js';
/**
 * Parses Claude Code JSONL session files into scored `CompactMessage` arrays.
 *
 * Uses a two-phase search strategy: cheap raw-string pre-filter on each
 * JSONL line, then full JSON parse + context extraction only for hits.
 */
export declare class ConversationParser {
    private sessions;
    /**
     * Parse a single JSONL session file into scored messages.
     *
     * @param projectDir - Encoded project directory name.
     * @param filename - JSONL filename within the project directory.
     * @param query - Optional search query for relevance scoring.
     * @param timeFilter - Optional predicate to restrict by timestamp.
     * @param preFilterTerms - Optional terms for line-level pre-filter
     *   (lets non-query methods skip irrelevant lines).
     * @returns Array of parsed and scored compact messages.
     */
    parseJsonlFile(projectDir: string, filename: string, query?: string, timeFilter?: (timestamp: string) => boolean, preFilterTerms?: string[]): Promise<CompactMessage[]>;
    private extractContext;
    /** Adaptive content limit based on content type — more space for code/technical. */
    private getContentLimit;
    /**
     * Truncate content while preserving the most valuable portions.
     *
     * Detects content type (code, error, technical, conversational) and
     * applies a type-specific preservation strategy.
     *
     * @param content - Raw message content.
     * @param maxLength - Maximum character budget.
     * @returns Truncated content with key information preserved.
     */
    smartContentPreservation(content: string, maxLength: number): string;
    private detectContentType;
    private preserveCodeBlocks;
    private preserveErrorMessages;
    private preserveTechnicalContent;
    private intelligentTruncation;
    /** Extract Claude's most valuable insights from assistant messages. */
    private extractClaudeInsights;
    /** Extract code snippets with context — balanced limit for actionable content. */
    private extractCodeSnippets;
    /** Extract actionable items and next steps. */
    private extractActionItems;
    private extractProgressInfo;
    /** Extract the most valuable content by prioritizing high-information-density sentences. */
    private extractMostValuableContent;
    private hasStructuredContent;
    private preserveStructuredContent;
    private updateSessionInfo;
    /**
     * Retrieve a tracked session by ID.
     *
     * @param sessionId - The session UUID.
     * @returns Session metadata, or `undefined` if not yet seen.
     */
    getSession(sessionId: string): ConversationSession | undefined;
    /** Return all tracked sessions sorted by end time (most recent first). */
    getAllSessions(): ConversationSession[];
    private isValidTimestamp;
}

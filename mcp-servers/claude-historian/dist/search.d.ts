import { CompactMessage, SearchResult, FileContext, ErrorSolution, ToolPattern, PlanResult, SessionInfo } from './types.js';
/**
 * Full-text search engine over Claude Code conversation history.
 *
 * Scans JSONL session files across all `~/.claude/projects/` directories,
 * scores messages with multi-signal relevance ranking, and provides
 * high-level search operations (conversations, errors, tools, plans,
 * config, memories, tasks).
 */
export declare class HistorySearchEngine {
    private parser;
    private searchCache;
    private static readonly CACHE_MAX;
    private static readonly CACHE_TTL;
    constructor();
    private getCached;
    private setCache;
    /**
     * Fast pre-filter: check if a JSONL file contains a keyword without full JSON parsing.
     * Reads the raw file and does a case-insensitive string search. ~10x faster than
     * parsing every line as JSON for files that don't contain the keyword.
     */
    private fileContainsKeyword;
    /**
     * Search conversation history for messages matching a query.
     *
     * @param query - Free-text search query.
     * @param projectFilter - Optional project path or name to restrict scope.
     * @param timeframe - Optional time window ("today", "week", "month").
     * @param limit - Maximum results (default 15).
     * @returns Scored and ranked search results.
     */
    searchConversations(query: string, projectFilter?: string, timeframe?: string, limit?: number): Promise<SearchResult>;
    private analyzeQueryIntent;
    private getSemanticBoosts;
    private performOptimizedSearch;
    private gatherRelevantCandidates;
    private processProjectFocused;
    private isHighlyRelevant;
    private matchesQueryIntent;
    private selectTopRelevantResults;
    private messageMatchesSemanticType;
    private intelligentDeduplicate;
    private createIntelligentSignature;
    private processProjectDirectory;
    private processJsonlFile;
    private prioritizeResultsForClaudeCode;
    private deduplicateMessages;
    private isSummaryMessage;
    private isHighValueMessage;
    private classifyQueryType;
    private getOptimalLimit;
    private enhanceQueryIntelligently;
    private calculateRelevanceScore;
    private matchesTimeframe;
    /**
     * Find all operations touching a specific file path.
     *
     * @param filePath - Absolute or relative file path to search for.
     * @param limit - Maximum file context entries (default 25).
     * @returns File contexts sorted by most recent modification.
     */
    findFileContext(filePath: string, limit?: number): Promise<FileContext[]>;
    /**
     * Find past user queries semantically similar to the target.
     *
     * @param targetQuery - The query to find similar matches for.
     * @param limit - Maximum results (default 10).
     * @returns User messages with high semantic similarity scores.
     */
    findSimilarQueries(targetQuery: string, limit?: number): Promise<CompactMessage[]>;
    /**
     * Find past solutions for a given error pattern.
     *
     * @param errorPattern - Error message or pattern to search for.
     * @param limit - Maximum solutions (default 10).
     * @param project - Optional project filter.
     * @param timeframe - Optional time window.
     * @returns Error/solution pairs ranked by frequency and actionability.
     */
    getErrorSolutions(errorPattern: string, limit?: number, project?: string, timeframe?: string): Promise<ErrorSolution[]>;
    /**
     * Discover usage patterns and best practices for tools.
     *
     * @param toolName - Optional tool name to filter (all tools if omitted).
     * @param limit - Maximum patterns (default 20).
     * @param project - Optional project filter.
     * @param timeframe - Optional time window.
     * @returns Tool patterns with usage counts and practice recommendations.
     */
    getToolPatterns(toolName?: string, limit?: number, project?: string, timeframe?: string): Promise<ToolPattern[]>;
    /**
     * List recent sessions with metadata and accomplishment summaries.
     *
     * @param limit - Maximum sessions (default 10).
     * @param project - Optional project filter.
     * @param timeframe - Optional time window.
     * @returns Session info records sorted by recency.
     */
    getRecentSessions(limit?: number, project?: string, timeframe?: string): Promise<SessionInfo[]>;
    private calculateSessionQuality;
    private extractSessionAccomplishments;
    /**
     * Retrieve all messages from a specific session.
     *
     * @param encodedProjectDir - Encoded project directory name.
     * @param sessionId - Full or partial session UUID.
     * @returns All messages from the session (unscored).
     */
    getSessionMessages(encodedProjectDir: string, sessionId: string): Promise<CompactMessage[]>;
    private isLowValueContent;
    private isActualError;
    private isMetaErrorContent;
    private extractActualToolPatterns;
    private extractActualBestPractices;
    /**
     * Search plan files in `~/.claude/plans/` for matching content.
     *
     * @param query - Free-text search query.
     * @param limit - Maximum plan results (default 10).
     * @returns Matched plans with relevance scores and section info.
     */
    searchPlans(query: string, limit?: number): Promise<PlanResult[]>;
    private extractPlanTitle;
    private extractPlanSections;
    private extractFileReferences;
    private calculatePlanRelevance;
    /**
     * Search Claude configuration markdown files (rules, skills, agents, plans).
     *
     * @param query - Free-text search query.
     * @param limit - Maximum results (default 10).
     * @returns Search results from `~/.claude/` config files.
     */
    searchConfig(query: string, limit?: number): Promise<SearchResult>;
    /**
     * Search project memory markdown files.
     *
     * @param query - Free-text search query.
     * @param limit - Maximum results (default 10).
     * @returns Search results from memory markdown files.
     */
    searchMemories(query: string, limit?: number): Promise<SearchResult>;
    /**
     * Search task JSON files in `~/.claude/tasks/`.
     *
     * @param query - Free-text search query.
     * @param limit - Maximum results (default 10).
     * @returns Search results from task files.
     */
    searchTasks(query: string, limit?: number): Promise<SearchResult>;
}

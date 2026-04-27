import { SearchResult, FileContext, ErrorSolution, CompactMessage, PlanResult, SessionInfo, ToolPattern, CompactSummaryData } from './types.js';
/** Search result wrapper indicating data source and enhancement status. */
export interface UniversalSearchResult {
    source: 'claude-code' | 'claude-desktop';
    results: SearchResult;
    enhanced: boolean;
}
/**
 * Facade that delegates to `HistorySearchEngine` for Claude Code data.
 *
 * @remarks
 * Desktop search branches were removed in issue #70. All methods now
 * pass through directly to the Claude Code engine.
 */
export declare class UniversalHistorySearchEngine {
    private claudeCodeEngine;
    constructor();
    initialize(): Promise<void>;
    /**
     * Search conversation history.
     *
     * @param query - Free-text search query.
     * @param project - Optional project filter.
     * @param timeframe - Optional time window.
     * @param limit - Maximum results.
     * @returns Wrapped search results with source metadata.
     */
    searchConversations(query: string, project?: string, timeframe?: string, limit?: number): Promise<UniversalSearchResult>;
    /**
     * Find file operation context.
     *
     * @param filepath - File path to search for.
     * @param limit - Maximum results.
     */
    findFileContext(filepath: string, limit?: number): Promise<{
        source: string;
        results: FileContext[];
        enhanced: boolean;
    }>;
    /**
     * Find semantically similar past queries.
     *
     * @param query - Query to find similar matches for.
     * @param limit - Maximum results.
     */
    findSimilarQueries(query: string, limit?: number): Promise<{
        source: string;
        results: CompactMessage[];
        enhanced: boolean;
    }>;
    /**
     * Find past solutions for an error pattern.
     *
     * @param errorPattern - Error message or pattern.
     * @param limit - Maximum solutions.
     * @param project - Optional project filter.
     * @param timeframe - Optional time window.
     */
    getErrorSolutions(errorPattern: string, limit?: number, project?: string, timeframe?: string): Promise<{
        source: string;
        results: ErrorSolution[];
        enhanced: boolean;
    }>;
    /**
     * List recent sessions with metadata.
     *
     * @param limit - Maximum sessions.
     * @param project - Optional project filter.
     * @param timeframe - Optional time window.
     */
    getRecentSessions(limit?: number, project?: string, timeframe?: string): Promise<{
        source: string;
        results: SessionInfo[];
        enhanced: boolean;
    }>;
    /**
     * Discover tool usage patterns.
     *
     * @param toolName - Optional tool name filter.
     * @param limit - Maximum patterns.
     * @param project - Optional project filter.
     * @param timeframe - Optional time window.
     */
    getToolPatterns(toolName?: string, limit?: number, project?: string, timeframe?: string): Promise<{
        source: string;
        results: ToolPattern[];
        enhanced: boolean;
    }>;
    /**
     * Generate a compact summary for a specific session.
     *
     * Supports the "latest" keyword to auto-resolve the most recent session.
     * Scans all project directories to find the session file directly.
     *
     * @param sessionId - Session UUID or "latest".
     * @param maxMessages - Maximum messages to include (default 100).
     * @param focus - Optional focus filter ("tools", "files", "solutions", "all").
     * @returns Compact summary with tools, files, accomplishments, and decisions.
     */
    generateCompactSummary(sessionId: string, maxMessages?: number, focus?: string): Promise<{
        source: string;
        results: CompactSummaryData;
        enhanced: boolean;
    }>;
    /**
     * Search plan files.
     *
     * @param query - Free-text search query.
     * @param limit - Maximum plan results.
     */
    searchPlans(query: string, limit?: number): Promise<{
        source: string;
        results: PlanResult[];
        enhanced: boolean;
    }>;
    private extractToolsFromMessages;
    private extractFilesFromMessages;
    private extractAccomplishmentsFromMessages;
    private extractDecisionsFromMessages;
}

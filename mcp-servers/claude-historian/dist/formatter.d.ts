/**
 * Scroll-corner border formatter for MCP tool output.
 *
 * Every tool response is wrapped in a half-box border with a scroll emoji
 * as the top-left corner. The format maximizes information density while
 * remaining visually scannable in Claude Code's output pane.
 */
import { CompactMessage, SearchResult, FileContext, ErrorSolution, ToolPattern, PlanSearchResult, SessionInfo, CompactSummaryData } from './types.js';
/**
 * Formats MCP tool results into scroll-corner bordered output.
 *
 * Each public `format*` method corresponds to one MCP tool. Results are
 * JSON-structured, score-normalized, and wrapped in the half-box border.
 */
export declare class BeautifulFormatter {
    constructor();
    private formatTimestamp;
    private truncateText;
    private smartTruncation;
    /** Cached content type for CompactMessage objects — avoids repeated regex work in loops */
    private getMessageContentType;
    private detectContentType;
    private preserveCodeInSummary;
    private preserveErrorInSummary;
    private preserveTechnicalInSummary;
    private intelligentTextTruncation;
    /**
     * Return a content-type-aware character budget for display truncation.
     *
     * @param content - Raw message content to classify.
     * @returns Character limit (400-700) tuned to the detected content type.
     */
    getDynamicDisplayLength(content: string): number;
    /**
     * Format `search_conversations` results.
     *
     * @param result - Raw search results.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @param limit - Maximum results to include.
     * @returns Scroll-bordered formatted string.
     */
    formatSearchConversations(result: SearchResult, detailLevel?: string, limit?: number): string;
    /**
     * Format `search_config` results.
     *
     * @param result - Raw search results.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @param limit - Maximum results to include.
     * @returns Scroll-bordered formatted string.
     */
    formatConfigSearch(result: SearchResult, detailLevel?: string, limit?: number): string;
    /**
     * Format `search_tasks` results.
     *
     * @param result - Raw search results.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @param limit - Maximum results to include.
     * @returns Scroll-bordered formatted string.
     */
    formatTaskSearch(result: SearchResult, detailLevel?: string, limit?: number): string;
    /**
     * Format `search_memories` results.
     *
     * @param result - Raw search results.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @param limit - Maximum results to include.
     * @returns Scroll-bordered formatted string.
     */
    formatMemorySearch(result: SearchResult, detailLevel?: string, limit?: number): string;
    /**
     * Format `find_similar_queries` results.
     *
     * @param queries - Matched similar query messages.
     * @param originalQuery - The user's original query string.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @param limit - Maximum results to include.
     * @returns Scroll-bordered formatted string.
     */
    formatSimilarQueries(queries: CompactMessage[], originalQuery: string, detailLevel?: string, limit?: number): string;
    private clusterBySemantic;
    /**
     * Format `find_file_context` results.
     *
     * @param contexts - File operation contexts found.
     * @param filepath - The queried file path.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @returns Scroll-bordered formatted string.
     */
    formatFileContext(contexts: FileContext[], filepath: string, detailLevel?: string): string;
    private rankFileContextsByImpact;
    /** Extract actual file changes from Edit tool usage. */
    private extractFileChanges;
    /**
     * Format `get_error_solutions` results.
     *
     * @param solutions - Matched error/solution pairs.
     * @param errorPattern - The queried error pattern.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @param limit - Maximum results to include.
     * @returns Scroll-bordered formatted string.
     */
    formatErrorSolutions(solutions: ErrorSolution[], errorPattern: string, detailLevel?: string, limit?: number): string;
    private rankErrorSolutions;
    /**
     * Format `find_tool_patterns` results.
     *
     * @param patterns - Matched tool usage patterns.
     * @param toolName - Optional tool name filter.
     * @param limit - Maximum results to include.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @returns Scroll-bordered formatted string.
     */
    formatToolPatterns(patterns: ToolPattern[], toolName?: string, limit?: number, detailLevel?: string): string;
    private rankToolPatternsByValue;
    /**
     * Format `list_recent_sessions` results.
     *
     * @param sessions - Session metadata records.
     * @param project - Optional project name filter.
     * @param limit - Maximum results to include.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @returns Scroll-bordered formatted string.
     */
    formatRecentSessions(sessions: SessionInfo[], project?: string, limit?: number, detailLevel?: string): string;
    private rankSessionsByProductivity;
    /**
     * Format `extract_compact_summary` / `inspect` results.
     *
     * @param sessions - Summary data (typically one element).
     * @param sessionId - Optional session ID used in the header.
     * @returns Scroll-bordered formatted string.
     */
    formatCompactSummary(sessions: CompactSummaryData[], sessionId?: string): string;
    /**
     * Format `search_plans` results.
     *
     * @param result - Plan search results with relevance scores.
     * @param detailLevel - "summary" (default), "detailed", or "raw".
     * @param limit - Maximum results to include.
     * @returns Scroll-bordered formatted string.
     */
    formatPlanSearch(result: PlanSearchResult, detailLevel?: string, limit?: number): string;
    private extractPlanGoal;
    private extractKeyInsight;
    private cleanInsight;
}

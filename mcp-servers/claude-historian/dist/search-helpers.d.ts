/**
 * Static utility methods for search scoring, deduplication, and query analysis.
 *
 * All methods are stateless — the class is used purely as a namespace.
 * Called by `HistorySearchEngine` to boost, filter, and rank results.
 */
import { CompactMessage, FileContext } from './types.js';
/** Stateless utility methods for search scoring and query analysis. */
export declare class SearchHelpers {
    /**
     * Expand a query into semantically related terms.
     *
     * @param query - Raw user query string.
     * @returns Deduplicated array of the original query plus synonym expansions.
     */
    static expandQuery(query: string): string[];
    /**
     * Deduplicate messages by content signature, keeping the highest-scoring copy.
     *
     * @param messages - Candidate messages (may contain near-duplicates).
     * @returns Deduplicated array preserving the best-scored variant.
     */
    static deduplicateByContent(messages: CompactMessage[]): CompactMessage[];
    /**
     * Create a normalized content signature for deduplication.
     *
     * @param message - Message to fingerprint.
     * @returns String key combining files, tools, errors, and normalized content.
     */
    static createContentSignature(message: CompactMessage): string;
    /**
     * Calculate importance score based on "pain to rediscover" heuristic.
     *
     * Decisions and bugfixes score highest because they are the hardest
     * to reconstruct from scratch.
     *
     * @param content - Lowercased message content.
     * @returns Multiplicative boost factor (1.0 = no boost, up to 2.5).
     */
    static calculateImportanceScore(content: string): number;
    /**
     * Enhanced relevance scoring combining importance, technical boosts, and recency.
     *
     * @param message - Scored message to re-rank.
     * @param query - Original search query.
     * @returns Final relevance score capped at 10.
     */
    static calculateClaudeRelevance(message: CompactMessage, query: string): number;
    /**
     * Infer the dominant operation type from a set of messages.
     *
     * @param messages - Messages referencing a particular file.
     * @returns The inferred operation type ("edit", "read", etc.).
     */
    static inferOperationType(messages: CompactMessage[]): FileContext['operationType'];
    /**
     * Calculate semantic similarity between two queries (0-1).
     *
     * Uses word-level matching with technical synonym awareness,
     * prefix matching, and stemming. Requires at least one significant
     * word match to return a non-zero score.
     *
     * @param query1 - First query string.
     * @param query2 - Second query string.
     * @returns Similarity score between 0.0 and 1.0.
     */
    static calculateQuerySimilarity(query1: string, query2: string): number;
    /**
     * Check whether two queries share exact technical keyword matches.
     *
     * @param query1 - First query string.
     * @param query2 - Second query string.
     * @returns `true` if queries share a tech keyword or 2+ common keywords.
     */
    static hasExactKeywords(query1: string, query2: string): boolean;
    /**
     * Check for partial keyword matches (4+ character prefix overlap).
     *
     * @param query1 - First query string.
     * @param query2 - Second query string.
     * @returns `true` if any word pair shares a 4+ char prefix.
     */
    static hasPartialKeywords(query1: string, query2: string): boolean;
    /**
     * Character-level similarity check (60%+ positional character match).
     *
     * @param word1 - First word.
     * @param word2 - Second word.
     * @returns `true` if words are similar enough by character overlap.
     */
    static isWordSimilar(word1: string, word2: string): boolean;
    /**
     * Extract a brief solution context string from messages.
     *
     * @param messages - Solution messages.
     * @returns Concatenated content truncated to 200 characters.
     */
    static extractSolutionContext(messages: CompactMessage[]): string;
    /**
     * Extract common tool combo and file type patterns from messages.
     *
     * @param messages - Messages to analyze.
     * @returns Human-readable pattern strings (e.g. "Read -> Edit (3x successful)").
     */
    static extractCommonPatterns(messages: CompactMessage[]): string[];
    /** Return default best-practice strings (placeholder for future extraction). */
    static extractBestPractices(): string[];
    /**
     * Check whether content contains a given error pattern.
     *
     * Handles specific error codes (ENOENT, TypeError, etc.) separately
     * from generic error phrases, requiring progressively stricter matching
     * for more specific patterns.
     *
     * @param content - Message content to search.
     * @param errorPattern - Error pattern or phrase to match.
     * @returns `true` if the content matches the error pattern.
     */
    static hasErrorInContent(content: string, errorPattern: string): boolean;
}

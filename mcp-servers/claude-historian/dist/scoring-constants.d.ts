/**
 * Scoring constants for conversation relevance ranking.
 *
 * Weights are tuned for Claude Code conversations where technical
 * specificity (exact framework/tool names) matters more than generic
 * keyword overlap. See `calculateRelevanceScore` in `utils.ts`.
 */
/** Exact tech term match (e.g. "react" query matches "React"). */
export declare const EXACT_MATCH_SCORE = 10;
/** 5+ char supporting terms that are not core tech or generic. */
export declare const SUPPORTING_TERM_SCORE = 3;
/** General word matches (case-insensitive). */
export declare const WORD_MATCH_SCORE = 2;
/** Bonus when the full query phrase appears verbatim. */
export declare const EXACT_PHRASE_BONUS = 5;
/** Bonus when 60%+ of query words match. */
export declare const MAJORITY_MATCH_BONUS = 4;
/** Bonus for messages that use tools (tool_use / tool_result). */
export declare const TOOL_USAGE_SCORE = 5;
/** Bonus for messages containing file path references. */
export declare const FILE_REFERENCE_SCORE = 3;
/** Bonus when message CWD matches the queried project. */
export declare const PROJECT_MATCH_SCORE = 5;
/** Boost when a query term matches the project directory name. */
export declare const PROJECT_NAME_BOOST = 3;
/** Maximum multiplicative boost applied per term. */
export declare const MAX_MULTIPLICATIVE_BOOST = 4;
/**
 * Regex matching specific framework/tool names that act as "must-match" terms.
 *
 * @remarks
 * If a query contains one of these terms, content that lacks the term
 * receives a heavy penalty (but is not discarded — soft filter only).
 */
export declare const CORE_TECH_PATTERN: RegExp;
/**
 * Words that should never become core scoring terms even if 5+ characters.
 *
 * @remarks
 * These appear across many contexts and do not indicate specific
 * technical relevance. Filtering them prevents false-positive boosts.
 */
export declare const GENERIC_TERMS: Set<string>;

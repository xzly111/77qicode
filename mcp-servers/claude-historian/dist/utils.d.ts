import { ClaudeMessage, MessageContentBlock } from './types.js';
/** Return the Claude config base path, respecting CLAUDE_CONFIG_DIR env var. */
export declare function getClaudeBasePath(): string;
/** Return the absolute path to `~/.claude/projects/`. */
export declare function getClaudeProjectsPath(): string;
/** Return the absolute path to `~/.claude/plans/`. */
export declare function getClaudePlansPath(): string;
/** Return the absolute path to `~/.claude/tasks/`. */
export declare function getClaudeTasksPath(): string;
/** List all `.md` plan files in `~/.claude/plans/`. */
export declare function findPlanFiles(): Promise<string[]>;
/**
 * Recursively walk a directory and return all file paths.
 *
 * @param dir - Directory to walk.
 * @returns Flat array of absolute file paths.
 */
export declare function walkDirectory(dir: string): Promise<string[]>;
/**
 * Discover all Claude configuration markdown files (rules, skills, agents, plans).
 *
 * Searches both global `~/.claude/` and per-project `.claude/` directories.
 *
 * @returns Array of `{ path, category }` tuples.
 */
export declare function findClaudeMarkdownFiles(): Promise<{
    path: string;
    category: string;
}[]>;
/** List all `.json` task files under `~/.claude/tasks/`. */
export declare function findTaskFiles(): Promise<string[]>;
/**
 * Decode a Claude project directory name back to a filesystem path.
 *
 * @remarks Claude encodes paths by replacing `/` with `-`.
 * @param encodedPath - Encoded directory name (e.g. "-Users-v-Projects-foo").
 * @returns Decoded filesystem path (e.g. "/Users/v/Projects/foo").
 */
export declare function decodeProjectPath(encodedPath: string): string;
/**
 * Encode a filesystem path to Claude's project directory naming convention.
 *
 * @param path - Absolute filesystem path.
 * @returns Encoded directory name with `/` replaced by `-`.
 */
export declare function encodeProjectPath(path: string): string;
/**
 * List all project directories under `~/.claude/projects/`, sorted by mtime.
 *
 * Results are cached for 30 seconds to avoid redundant stat calls.
 *
 * @returns Encoded project directory names (most recently modified first).
 */
export declare function findProjectDirectories(): Promise<string[]>;
/**
 * List JSONL session files in a project directory, sorted by mtime.
 *
 * @param projectDir - Encoded project directory name.
 * @returns JSONL filenames (most recently modified first).
 */
export declare function findJsonlFiles(projectDir: string): Promise<string[]>;
/**
 * Extract searchable text content from a raw Claude message.
 *
 * Handles string content, text blocks, tool_use blocks (extracting
 * high-value fields like file paths and commands), and tool_result blocks.
 *
 * @param message - Raw message object with optional `content` field.
 * @returns Concatenated text content, or empty string if none.
 */
export declare function extractContentFromMessage(message: {
    content?: string | MessageContentBlock[];
}): string;
/**
 * Score a message's relevance to a search query.
 *
 * Uses multi-signal scoring: core tech term matching, supporting term
 * boosts, exact phrase bonus, tool/file/project context, and a soft
 * penalty for structural config content.
 *
 * @param message - Raw Claude message to score.
 * @param query - User's search query.
 * @param projectPath - Optional project path for context matching.
 * @param preExtractedContent - Pre-extracted content string (avoids re-extraction).
 * @param preComputedQueryWords - Pre-split query words (avoids re-splitting).
 * @returns Additive relevance score (higher is more relevant).
 */
export declare function calculateRelevanceScore(message: ClaudeMessage, query: string, projectPath?: string, preExtractedContent?: string, preComputedQueryWords?: string[]): number;
/** Normalize a timestamp string to ISO 8601 format. */
export declare function formatTimestamp(timestamp: string): string;
/**
 * Create a timestamp filter predicate for a named time range.
 *
 * @param timeframe - "today", "yesterday", "week", "month", or undefined (no filter).
 * @returns Predicate that returns `true` for timestamps within the range.
 */
export declare function getTimeRangeFilter(timeframe?: string): (timestamp: string) => boolean;
/**
 * Check whether a project path is a git worktree (`.git` is a file, not a directory).
 *
 * @param projectPath - Encoded project directory name.
 * @returns `true` if the project is a worktree checkout.
 */
export declare function isGitWorktree(projectPath: string): Promise<boolean>;
/**
 * Resolve a worktree's parent project directory.
 *
 * Reads the `.git` file to extract the `gitdir:` path, then derives
 * the parent project's encoded directory name.
 *
 * @param projectPath - Encoded worktree project directory name.
 * @returns Encoded parent project directory name, or `null` if not a worktree.
 */
export declare function getParentProjectFromWorktree(projectPath: string): Promise<string | null>;
/**
 * Expand project directory list with parent projects for worktree checkouts.
 *
 * @remarks Temporarily disabled for testing — returns input unchanged.
 * @param projectDirs - Encoded project directory names.
 * @returns Same array (expansion logic commented out).
 */
export declare function expandWorktreeProjects(projectDirs: string[]): Promise<string[]>;

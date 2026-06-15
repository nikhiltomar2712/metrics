#!/usr/bin/env node
"use strict";
/**
 * GitHub Analyzer CLI - TypeScript Version
 * A modern TypeScript implementation for analyzing GitHub repositories
 * with type safety and concurrent request handling
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubAnalyzerTS = void 0;
var axios_1 = require("axios");
var perf_hooks_1 = require("perf_hooks");
var GitHubAnalyzerTS = /** @class */ (function () {
    function GitHubAnalyzerTS(token) {
        this.token = token || process.env.GITHUB_TOKEN || null;
        this.client = axios_1.default.create({
            baseURL: 'https://api.github.com',
            headers: __assign({ 'Accept': 'application/vnd.github.v3+json' }, (this.token && { 'Authorization': "token ".concat(this.token) }))
        });
    }
    GitHubAnalyzerTS.prototype.getRepositoryInfo = function (owner, repo) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.get("/repos/".concat(owner, "/").concat(repo))];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        return [2 /*return*/, {
                                name: data.name,
                                description: data.description,
                                stars: data.stargazers_count,
                                forks: data.forks_count,
                                watchers: data.watchers_count,
                                language: data.language,
                                topics: data.topics || [],
                                createdAt: data.created_at,
                                updatedAt: data.updated_at,
                                openIssues: data.open_issues_count
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Failed to fetch repository info: ".concat(error_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GitHubAnalyzerTS.prototype.getContributors = function (owner, repo) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.get("/repos/".concat(owner, "/").concat(repo, "/contributors"), {
                                params: { per_page: 50 }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.map(function (contributor) { return ({
                                login: contributor.login,
                                contributions: contributor.contributions,
                                avatarUrl: contributor.avatar_url
                            }); })];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error("Failed to fetch contributors: ".concat(error_2));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GitHubAnalyzerTS.prototype.getLanguages = function (owner, repo) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.get("/repos/".concat(owner, "/").concat(repo, "/languages"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error("Failed to fetch languages: ".concat(error_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GitHubAnalyzerTS.prototype.calculateHealth = function (repo, contributors) {
        var score = 0;
        var insights = [];
        // Star metric (0-25 points)
        if (repo.stars >= 1000) {
            score += 25;
            insights.push('🌟 Excellent community engagement');
        }
        else if (repo.stars >= 500) {
            score += 20;
            insights.push('⭐ Good community interest');
        }
        else if (repo.stars >= 100) {
            score += 15;
            insights.push('📈 Growing community');
        }
        else {
            insights.push('🚀 Building community awareness');
        }
        // Contributor metric (0-25 points)
        if (contributors.length >= 50) {
            score += 25;
            insights.push('👥 Strong contributor base');
        }
        else if (contributors.length >= 20) {
            score += 20;
            insights.push('🤝 Active community');
        }
        else if (contributors.length >= 5) {
            score += 15;
            insights.push('👤 Growing team');
        }
        else {
            insights.push('👤 Building contributor network');
        }
        // Fork metric (0-20 points)
        if (repo.forks >= repo.stars * 0.3) {
            score += 20;
            insights.push('🔀 High fork-to-star ratio');
        }
        else if (repo.forks >= repo.stars * 0.1) {
            score += 15;
            insights.push('🔀 Moderate fork activity');
        }
        else {
            score += 10;
        }
        // Issue metric (0-15 points)
        if (repo.openIssues < 20) {
            score += 15;
            insights.push('✅ Well-maintained issue tracker');
        }
        else if (repo.openIssues < 50) {
            score += 10;
            insights.push('📋 Manageable issue backlog');
        }
        else {
            insights.push('⚠️ Consider addressing issue backlog');
        }
        // Activity metric (0-15 points)
        var lastUpdate = new Date(repo.updatedAt).getTime();
        var daysSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60 * 24);
        if (daysSinceUpdate < 7) {
            score += 15;
            insights.push('🔥 Actively maintained');
        }
        else if (daysSinceUpdate < 30) {
            score += 10;
            insights.push('✓ Regularly maintained');
        }
        else if (daysSinceUpdate < 90) {
            score += 5;
            insights.push('⏱️ Maintenance may be slowing');
        }
        var rating = this.scoreToRating(score);
        return { score: score, rating: rating, insights: insights };
    };
    GitHubAnalyzerTS.prototype.scoreToRating = function (score) {
        if (score >= 90)
            return 'Excellent';
        if (score >= 70)
            return 'Good';
        if (score >= 50)
            return 'Fair';
        return 'Needs Improvement';
    };
    GitHubAnalyzerTS.prototype.analyze = function (owner, repo) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, _a, repoInfo, contributors, languages, health, analysisTime;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        startTime = perf_hooks_1.performance.now();
                        return [4 /*yield*/, Promise.all([
                                this.getRepositoryInfo(owner, repo),
                                this.getContributors(owner, repo),
                                this.getLanguages(owner, repo)
                            ])];
                    case 1:
                        _a = _b.sent(), repoInfo = _a[0], contributors = _a[1], languages = _a[2];
                        health = this.calculateHealth(repoInfo, contributors);
                        analysisTime = Math.round((perf_hooks_1.performance.now() - startTime) * 100) / 100;
                        return [2 /*return*/, {
                                repository: repoInfo,
                                contributors: contributors,
                                languages: languages,
                                health: health,
                                analysisTime: analysisTime
                            }];
                }
            });
        });
    };
    return GitHubAnalyzerTS;
}());
exports.GitHubAnalyzerTS = GitHubAnalyzerTS;
// CLI Interface
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var args, repoPath, token, tokenIdx, _a, owner, repo, analyzer, result_1, topContributors, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    args = process.argv.slice(2);
                    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
                        console.log("\nGitHub Analyzer CLI - TypeScript Version\nUsage: npx github-analyzer-ts <owner/repo> [options]\n\nOptions:\n  --token TOKEN    GitHub API token (or set GITHUB_TOKEN environment variable)\n  --help, -h       Show this help message\n\nExample:\n  npx github-analyzer-ts torvalds/linux\n  npx github-analyzer-ts facebook/react --token ghp_xxxxx\n    ");
                        process.exit(0);
                    }
                    repoPath = args[0];
                    if (args.includes('--token')) {
                        tokenIdx = args.indexOf('--token');
                        if (tokenIdx + 1 < args.length) {
                            token = args[tokenIdx + 1];
                        }
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = repoPath.split('/'), owner = _a[0], repo = _a[1];
                    if (!owner || !repo) {
                        throw new Error('Invalid repository format. Use: owner/repo');
                    }
                    analyzer = new GitHubAnalyzerTS(token);
                    console.log("\n\uD83D\uDCCA Analyzing ".concat(owner, "/").concat(repo, "...\n"));
                    return [4 /*yield*/, analyzer.analyze(owner, repo)];
                case 2:
                    result_1 = _b.sent();
                    // Display results
                    console.log('╔════════════════════════════════════════════════════════╗');
                    console.log('║           GITHUB REPOSITORY ANALYSIS REPORT            ║');
                    console.log('╚════════════════════════════════════════════════════════╝\n');
                    console.log("\uD83D\uDCE6 Repository: ".concat(result_1.repository.name));
                    if (result_1.repository.description) {
                        console.log("\uD83D\uDCDD Description: ".concat(result_1.repository.description));
                    }
                    console.log("\n\uD83D\uDCCA Statistics:");
                    console.log("  \u2B50 Stars: ".concat(result_1.repository.stars));
                    console.log("  \uD83D\uDD00 Forks: ".concat(result_1.repository.forks));
                    console.log("  \uD83D\uDC41\uFE0F Watchers: ".concat(result_1.repository.watchers));
                    console.log("  \u26A0\uFE0F Open Issues: ".concat(result_1.repository.openIssues));
                    console.log("\n\uD83D\uDC65 Contributors: ".concat(result_1.contributors.length));
                    topContributors = result_1.contributors.slice(0, 5);
                    topContributors.forEach(function (c, idx) {
                        console.log("  ".concat(idx + 1, ". ").concat(c.login, " (").concat(c.contributions, " commits)"));
                    });
                    console.log("\n\uD83D\uDCBB Languages:");
                    Object.entries(result_1.languages)
                        .sort(function (_a, _b) {
                        var a = _a[1];
                        var b = _b[1];
                        return b - a;
                    })
                        .slice(0, 5)
                        .forEach(function (_a) {
                        var lang = _a[0], bytes = _a[1];
                        var percent = ((bytes / Object.values(result_1.languages).reduce(function (a, b) { return a + b; }, 0)) * 100).toFixed(1);
                        console.log("  ".concat(lang, ": ").concat(percent, "%"));
                    });
                    console.log("\n\uD83C\uDFE5 Health Assessment:");
                    console.log("  Health Score: ".concat(result_1.health.score, "/100"));
                    console.log("  Rating: ".concat(result_1.health.rating));
                    console.log("\n  Insights:");
                    result_1.health.insights.forEach(function (insight) {
                        console.log("  ".concat(insight));
                    });
                    console.log("\n\u23F1\uFE0F Analysis completed in ".concat(result_1.analysisTime, "ms\n"));
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    console.error("\u274C Error: ".concat(error_4 instanceof Error ? error_4.message : String(error_4)));
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main();

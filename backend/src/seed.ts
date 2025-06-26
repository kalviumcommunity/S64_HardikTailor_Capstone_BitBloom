// seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CodingQuestion  from './models/codingQuestion';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'your-fallback-uri-here';

export const questions = [
  {
    title: "Two Sum",
    slug: "two-sum",
    url: "https://leetcode.com/problems/two-sum",
    topics: ["Array", "Hash Table"],
    difficulty: "Easy"
  },
  {
    title: "Valid Anagram",
    slug: "valid-anagram",
    url: "https://leetcode.com/problems/valid-anagram",
    topics: ["Hash Table", "String"],
    difficulty: "Easy"
  },
  {
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    url: "https://leetcode.com/problems/merge-two-sorted-lists",
    topics: ["Linked List"],
    difficulty: "Easy"
  },
  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
    topics: ["Array", "Dynamic Programming"],
    difficulty: "Easy"
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    url: "https://leetcode.com/problems/valid-parentheses",
    topics: ["Stack", "String"],
    difficulty: "Easy"
  },
  {
    title: "Palindrome Number",
    slug: "palindrome-number",
    url: "https://leetcode.com/problems/palindrome-number",
    topics: ["Math"],
    difficulty: "Easy"
  },
  {
    title: "Fizz Buzz",
    slug: "fizz-buzz",
    url: "https://leetcode.com/problems/fizz-buzz",
    topics: ["Math"],
    difficulty: "Easy"
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    url: "https://leetcode.com/problems/binary-search",
    topics: ["Binary Search", "Array"],
    difficulty: "Easy"
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    url: "https://leetcode.com/problems/maximum-subarray",
    topics: ["Array", "Dynamic Programming"],
    difficulty: "Easy"
  },
  {
    title: "Invert Binary Tree",
    slug: "invert-binary-tree",
    url: "https://leetcode.com/problems/invert-binary-tree",
    topics: ["Tree", "DFS"],
    difficulty: "Easy"
  },

  // === MEDIUM - Logical ===
  {
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    url: "https://leetcode.com/problems/add-two-numbers",
    topics: ["Linked List", "Math"],
    difficulty: "Medium"
  },
  {
    title: "3Sum",
    slug: "3sum",
    url: "https://leetcode.com/problems/3sum",
    topics: ["Array", "Two Pointers"],
    difficulty: "Medium"
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    url: "https://leetcode.com/problems/group-anagrams",
    topics: ["Hash Table", "String"],
    difficulty: "Medium"
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters",
    topics: ["String", "Hash Table", "Sliding Window"],
    difficulty: "Medium"
  },
  {
    title: "Course Schedule",
    slug: "course-schedule",
    url: "https://leetcode.com/problems/course-schedule",
    topics: ["Graph", "Topological Sort"],
    difficulty: "Medium"
  },
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    url: "https://leetcode.com/problems/number-of-islands",
    topics: ["DFS", "BFS", "Matrix"],
    difficulty: "Medium"
  },
  {
    title: "Daily Temperatures",
    slug: "daily-temperatures",
    url: "https://leetcode.com/problems/daily-temperatures",
    topics: ["Monotonic Stack", "Array"],
    difficulty: "Medium"
  },
  {
    title: "Kth Largest Element in an Array",
    slug: "kth-largest-element-in-an-array",
    url: "https://leetcode.com/problems/kth-largest-element-in-an-array",
    topics: ["Heap", "Sorting"],
    difficulty: "Medium"
  },
  {
    title: "LRU Cache",
    slug: "lru-cache",
    url: "https://leetcode.com/problems/lru-cache",
    topics: ["Design", "Hash Table", "Linked List"],
    difficulty: "Medium"
  },
  {
    title: "Rotting Oranges",
    slug: "rotting-oranges",
    url: "https://leetcode.com/problems/rotting-oranges",
    topics: ["BFS", "Matrix"],
    difficulty: "Medium"
  },

  // === HARD - Company Level ===
  {
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    url: "https://leetcode.com/problems/median-of-two-sorted-arrays",
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    difficulty: "Hard"
  },
  {
    title: "Regular Expression Matching",
    slug: "regular-expression-matching",
    url: "https://leetcode.com/problems/regular-expression-matching",
    topics: ["DP", "Recursion", "String"],
    difficulty: "Hard"
  },
  {
    title: "Merge k Sorted Lists",
    slug: "merge-k-sorted-lists",
    url: "https://leetcode.com/problems/merge-k-sorted-lists",
    topics: ["Heap", "Linked List", "Divide and Conquer"],
    difficulty: "Hard"
  },
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    url: "https://leetcode.com/problems/trapping-rain-water",
    topics: ["Array", "Two Pointers", "Stack"],
    difficulty: "Hard"
  },
  {
    title: "Longest Valid Parentheses",
    slug: "longest-valid-parentheses",
    url: "https://leetcode.com/problems/longest-valid-parentheses",
    topics: ["String", "DP", "Stack"],
    difficulty: "Hard"
  },
  {
    title: "Word Ladder II",
    slug: "word-ladder-ii",
    url: "https://leetcode.com/problems/word-ladder-ii",
    topics: ["BFS", "Backtracking"],
    difficulty: "Hard"
  },
  {
    title: "Maximal Rectangle",
    slug: "maximal-rectangle",
    url: "https://leetcode.com/problems/maximal-rectangle",
    topics: ["Stack", "DP", "Matrix"],
    difficulty: "Hard"
  },
  {
    title: "Palindrome Partitioning II",
    slug: "palindrome-partitioning-ii",
    url: "https://leetcode.com/problems/palindrome-partitioning-ii",
    topics: ["DP", "String"],
    difficulty: "Hard"
  },
  {
    title: "Alien Dictionary",
    slug: "alien-dictionary",
    url: "https://leetcode.com/problems/alien-dictionary",
    topics: ["Graph", "Topological Sort"],
    difficulty: "Hard"
  },
  {
    title: "Sliding Window Maximum",
    slug: "sliding-window-maximum",
    url: "https://leetcode.com/problems/sliding-window-maximum",
    topics: ["Deque", "Heap", "Sliding Window"],
    difficulty: "Hard"
  }
];




const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await CodingQuestion.deleteMany({});
    const inserted = await CodingQuestion.insertMany(questions);
    console.log(`${inserted.length} questions seeded.`);
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();

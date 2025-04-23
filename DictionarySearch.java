import java.io.*;
import java.util.*;


class Node {
    Map<Character, Node> children = new HashMap<>();
    boolean isEndOfWord = false;
}

//Trie class to handle insertion, search, and fuzzy suggestion
class Trie {
    private final Node root = new Node();

    /**
     * Inserts a word into the Trie.
     * Time Complexity: O(L), where L = length of the word.
     * Space Complexity: O(L)
     */
    public void insert(String word) {
        Node current = root;
        for (char ch : word.toCharArray()) {
            current = current.children.computeIfAbsent(ch, c -> new Node());
        }
        current.isEndOfWord = true;
    }

    /**
     * Searches for an exact word in the Trie.
     * Time Complexity: O(L), where L = length of the word
     */
    public boolean search(String word) {
        Node current = root;
        for (char ch : word.toCharArray()) {
            if (!current.children.containsKey(ch)) return false;
            current = current.children.get(ch);
        }
        return current.isEndOfWord;
    }

    /**
     * Uses DFS + edit distance to generate lightweight fuzzy suggestions.
     * Time Complexity: Approx O(N * L^2), where N is the number of nodes and L is word length.
     */
    public List<String> suggest(String word) {
        List<String> results = new ArrayList<>();
        suggestHelper(root, "", word, results);
        return results;
    }

    /**
     * Helper function for suggest().
     * Performs DFS traversal of the Trie and computes edit distance with the target word.
     * Stops when more than 5 suggestions are found (for performance).
     */
    private void suggestHelper(Node node, String currentWord, String target, List<String> results) {
        if (results.size() > 5) return;
        if (node.isEndOfWord && editDistance(currentWord, target) <= 1) {
            results.add(currentWord);
        }
        for (Map.Entry<Character, Node> entry : node.children.entrySet()) {
            suggestHelper(entry.getValue(), currentWord + entry.getKey(), target, results);
        }
    }

    /**
     * Computes edit distance between two words
     * Time Complexity: O(L^2)
     * Space Complexity: O(L^2)
     * Here L is word length
     */
    private int editDistance(String a, String b) {
        int[][] dp = new int[a.length()+1][b.length()+1];
        for (int i = 0; i <= a.length(); i++) {
            for (int j = 0; j <= b.length(); j++) {
                if (i == 0) dp[i][j] = j;
                else if (j == 0) dp[i][j] = i;
                else if (a.charAt(i-1) == b.charAt(j-1)) dp[i][j] = dp[i-1][j-1];
                else dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i][j-1], dp[i-1][j]));
            }
        }
        return dp[a.length()][b.length()];
    }
}

public class DictionarySearch {
    public static void main(String[] args) {
        Trie trie = new Trie();

        try (BufferedReader reader = new BufferedReader(new FileReader("list.txt"))) {
            String word;
            while ((word = reader.readLine()) != null) {
                trie.insert(word.trim());
            }
            System.out.println("Dictionary loaded.");
        } catch (IOException e) {
            System.err.println("Failed to load dictionary: " + e.getMessage());
        }

        // Accept user input
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.print("\nEnter word to search (or 'exit'): ");
            String input = scanner.nextLine().trim();
            // Handle exit condition
            if (input.equals("exit")) break;

            // Corner Case: Empty input
            if (input.isEmpty()) {
                System.out.println("Please enter a valid word.");
                continue;
            }

            if (trie.search(input)) {
                System.out.println("Word found in dictionary "+input);
            } else {
                System.out.println("Word not found.");
                List<String> suggestions = trie.suggest(input.toLowerCase());
                if (!suggestions.isEmpty()) {
                    System.out.println("Did you mean?");
                    for (String suggestion : suggestions) {
                        System.out.println(" - " + suggestion);
                    }
                } else {
                    System.out.println("No suggestions found.");
                }
            }
        }
    }
}

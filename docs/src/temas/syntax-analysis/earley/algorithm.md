---
title: The Earley Algorithm Explained
---
<!-- KatEX example

# This is a markdown file

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>

a formula $J \left( \theta_0, \theta_1 \right) = \frac{1}{2m}\sum\limits_{i=1}^m \left( h_{\theta}(x^{(i)})-y^{(i)} \right)^{2}$ and more text
-->

# {{ $frontmatter.title }}

Let be a grammar $G = (\Sigma, V, P, Start)$ and $x$ an input string $x = a_{1}a_{2} \ldots a_{n}$.

A **state** is an element $(X \longrightarrow \alpha \bullet \beta, j)$ where 
$X \longrightarrow \alpha \beta \in P$ is a  production in the set of  grammar productions  $P$, and 
$j \in \{0 \ldots n \}$ is a position in the input string $x = a_{1}a_{2} \ldots a_{n}$.

The set of *active states* when the  input prefix $a_1 \ldots a_k$ is being analyzed is called $S_k$. 

More precisely, $S_k$ is the set of states $(X \longrightarrow \alpha \bullet \beta, j)$  whose production rule $X \longrightarrow \alpha \beta$ appears in a derivation from the $Start$ symbol 

$Start \overset{*}{\Longrightarrow} a_{1}a_{2} \ldots a_{j-1}X\omega \underset{X \longrightarrow \alpha \beta}{\Longrightarrow } a_{1}a_{2} \ldots a_{j-1} \alpha \beta \omega 
\overset{*}{\Longrightarrow} a_{1}a_{2} \ldots a_j \ldots a_{k} \beta \omega$ 

Observe that it holds that $ \alpha \overset{*}{\Longrightarrow} a_{j} \ldots a_k$

and so the production $X \longrightarrow \alpha \beta$ can  still be used for derivation at position $k$. 

The parser is seeded with $S_0$ consisting of only the top-level rule. The parser then repeatedly executes three operations: 

1. prediction, 
2. scanning, and 
3. completion.


These three operations are repeated until no new states can be added to the set $S_k$ 

## Prediction 

1. $\forall s = (X \longrightarrow \alpha \bullet Y \beta, j)  \in S_k$ (where *j* is the start of the substring), and $Y \in V$ is in the set of non terminals
2. add states $(Y \longrightarrow \bullet \gamma, k)$ to $S_k$ $\forall Y \longrightarrow \gamma$ grammar productions having *Y* on the left hand side.

Duplicate states are not added to the state set, only new ones. 

## Scanning 

If $a_{k} \in \Sigma$ is the next terminal in the input stream, then $\forall s \in S_{k-1}$ of the form $s = (X \longrightarrow \alpha \bullet a_{k} \beta, j)$ , add 
$s = (X \longrightarrow \alpha a_{k} \bullet \beta, j)$ to $S_{k}$.

## Completion

$\forall s \in S_{k}$  of the form $s = (Y \longrightarrow \gamma \bullet, j)$, 
find all states in $S_j$ of the form $(X \longrightarrow \alpha \bullet Y \beta, i)$ and add $(X \longrightarrow \alpha Y \bullet \beta, i)$ to $S_k$.



## Acceptance

The algorithm accepts if an state with the form $(Start \longrightarrow \gamma \bullet, 0)$ ends up in $S_n$, where $Start$ is the start symbol of the grammar $G$ and $n$ is the input length. 

If there are several of these states it means the grammaris ambiguous. 

If there are none, the input is rejected.

## Pseudocode

We augment the initial grammar with  the rule `γ → •S`  

```js

function EarleyParse(words, grammar) {

    function init(words) {
        let S = [];
        for(k =0; k <= words.length; k++) {
          S[k] = new Set();
        }
        return S;     
    }

    let S = init(words);

    function PREDICTOR((A → α•Bβ, j), k, grammar) {
      grammar.rules(B).forEach((B → γ) => S[k].add((B → •γ, k)))
    }

    function SCANNER((A → α•aβ, j), k, words) {
      if (words[k].match(a.regexp)) S[k+1].add((A → αa•β, j))
    }

    function COMPLETER((B → γ•, s), k) {
      S[s].forEach((A → α•Bβ, j) ) => S[k].add((A → αB•β, j))
    }

    S[0].add((γ → •S, 0));
    for(k = 0: k <= words.length; k++) {
        S[k].forEach(state => {  // S[k] can expand during this loop
            if (!state.isFinished()) 
                if (state.NextElement() in grammar.NonTerminal) 
                    PREDICTOR(state, k, grammar)         // non-terminal
                else
                    SCANNER(state, k, words)             // terminal
            else 
                COMPLETER(state, k)
        })
    }
    return S;
}

```

## Example

```
# https://en.wikipedia.org/wiki/Earley_parser#Example

P -> S

S -> S "+" M
   | M

M -> M "*" T
   | T

T -> "1"
   | "2"
   | "3"
   | "4"
```

```console
➜  examples git:(main) ✗ nearleyc wikipedia.ne -o wikipedia.js 
➜  examples git:(main) ✗ nearley-test wikipedia.js -i '2+3*4'
Table length: 6
Number of parses: 1
Parse Charts
Chart: 0
0: {P →  ● S}, from: 0
1: {S →  ● S "+" M}, from: 0
2: {S →  ● M}, from: 0
3: {M →  ● M "*" T}, from: 0
4: {M →  ● T}, from: 0
5: {T →  ● "1"}, from: 0
6: {T →  ● "2"}, from: 0
7: {T →  ● "3"}, from: 0
8: {T →  ● "4"}, from: 0

Chart: 1
0: {T → "2" ● }, from: 0
1: {M → T ● }, from: 0
2: {M → M ● "*" T}, from: 0
3: {S → M ● }, from: 0
4: {S → S ● "+" M}, from: 0
5: {P → S ● }, from: 0

Chart: 2
0: {S → S "+" ● M}, from: 0
1: {M →  ● M "*" T}, from: 2
2: {M →  ● T}, from: 2
3: {T →  ● "1"}, from: 2
4: {T →  ● "2"}, from: 2
5: {T →  ● "3"}, from: 2
6: {T →  ● "4"}, from: 2

Chart: 3
0: {T → "3" ● }, from: 2
1: {M → T ● }, from: 2
2: {M → M ● "*" T}, from: 2
3: {S → S "+" M ● }, from: 0
4: {S → S ● "+" M}, from: 0
5: {P → S ● }, from: 0

Chart: 4
0: {M → M "*" ● T}, from: 2
1: {T →  ● "1"}, from: 4
2: {T →  ● "2"}, from: 4
3: {T →  ● "3"}, from: 4
4: {T →  ● "4"}, from: 4

Chart: 5
0: {T → "4" ● }, from: 4
1: {M → M "*" T ● }, from: 2
2: {M → M ● "*" T}, from: 2
3: {S → S "+" M ● }, from: 0
4: {S → S ● "+" M}, from: 0
5: {P → S ● }, from: 0


Parse results: 
[
  [
    [ [ [ [ '2' ] ] ], '+', [ [ [ '3' ] ], '*', [ '4' ] ] ]
  ]
]
```

## Earley Parsing Explained

* [Earley Parsing Explained](https://loup-vaillant.fr/tutorials/earley-parsing/) by Loup

## Toby Ho on the Earley Parsing Algorithm

<youtube id="WNKw1tiskSM"></youtube>

## Earley Parsing by Natalie Parde

<youtube id="1j6hB3O4hAM"></youtube>


## Wikipedia

* [Earley parser](https://en.wikipedia.org/wiki/Earley_parser)

## Optimizing Right Recursion

* [Optimising Right Recursion](https://loup-vaillant.fr/tutorials/earley-parsing/right-recursion) by Loup 

* [Joop Leo’s optimizations for right-Recursion]({{site.baseurl}}/assets/pdfs/joop-leo-parse-algorithm-optimization-for-right-recursion.pdf) original paper

## NearleyJS

See section [NearleyJS](nearley)
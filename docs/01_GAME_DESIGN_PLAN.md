# Unit Zero — Game Design Plan

Nov 17, 2026 · @Jacob

## 0. Design principles

**The adventure is how you learn. Mastery is the goal.** The player learns AI because Ndola keeps throwing up problems that need it, not because a lesson says so. Neither the story nor the rigour gets watered down.

### The three-question test

Every feature, scene and challenge must pass all three:

1. Is it fun or interesting to interact with?
2. Does it help the player understand something?
3. Does it make the player want to see what happens next?

Only question 2 → it's a lesson, not a game. Only question 1 → it's entertainment with no learning. Aim for all three.

### Layered learning

Each concept has four layers, so a beginner and an AI student can play the same game:

| Layer | What happens | Example: A\* |
| --- | --- | --- |
| 1. Experience | Play with the problem before it has a name. | Try routes to the hospital and time them. |
| 2. Understanding | The idea and its formula appear, built from what you did. | A\* weighs distance travelled plus an estimate of what's left: f = g + h. |
| 3. Mastery | Calculate it, catch mistakes, solve harder versions. | Compute f for each road, test whether your heuristic is admissible. |
| 4. Workshop | Optional: write the real code. | Implement A\* in Python. |

**One firm rule:** the main story needs Layer 3. You can't save the ambulance without doing A\* properly. Layers 1–2 make it welcoming; Layer 3 is what makes "finished the game" mean "can do AI". Layer 4 is the only optional one.

**Mastery is more than calculating.** Layer 3 is proved in four ways, not just by getting the numbers right. For A\*, the player must also:

- **Explain** why the algorithm chose this route.
- **Spot** when a heuristic is unsuitable.
- **Diagnose** why a route is worse than it should be.
- **Transfer** the method to a situation they've never seen.

All four must appear across each chapter, lessons and challenges together. A single challenge doesn't need all four: some concepts suit diagnosis, others suit transfer. No forced activities to tick a box.

### One central problem per chapter

Each chapter has one problem the player will remember. The concepts exist to solve it.

| Chapter | What the player remembers |
| --- | --- |
| Search | We need to find the best route. |
| Logic | We need to reason with rules. |
| Probability | We need to decide without certainty. |
| Machine learning | We need to learn from examples. |
| Regression | We need to estimate unknown numbers. |
| Classification | We need to sort things into categories. |
| Clustering | We need to find hidden groups. |
| Reinforcement learning | We need to learn from actions and consequences. |
| Neural networks | We need to recognise complicated patterns. |

### Core, supporting, discovery

Some chapters carry a lot. Nothing is cut, but not everything is equal:

- **Core:** what the chapter's problem needs. Required, at full Layer 3 mastery.
- **Supporting:** taught when the challenge needs it, in less depth.
- **Discovery:** optional, found by exploring. Side rooms, extra townspeople, bonus objectives.

**Rule:** no chapter introduces more than three new core ideas. The story, and the finale, only ever require core concepts. Section 5 lists the split for the heavy chapters.

## 1. The story

### The setup

Ndola, a few years from now. The city council has signed a big contract with **Halo Systems**, an outside company. Their AI, **Apex**, now runs the traffic lights on Broadway, the fire alerts, the minibus timetable and the gates at Kafubu Dam.

The demo was brilliant. Then Apex started failing in strange ways. Broadway's lights freeze every time it rains. Kanini's fire alarms scream every night. The ambulance from Kabushi gets sent the long way round. Nobody at the council can say why, because nobody understands how Apex works.

**You** are the new apprentice at Mama Bupe's electronics repair shop in Kansenshi. Under a pile of old radios you find a dusty crate stamped *COPPER MIND PROJECT — UNIT 0*. Inside is a small robot. You switch it on. It blinks. It knows nothing.

Mama Bupe looks at it for a long time. "Apex was given answers," she says. "This one has to be given understanding. That takes longer. But it lasts."

### The arc

| Act | Where | What Zero becomes |
| --- | --- | --- |
| I. Waking up | Kansenshi, Broadway, the minibus stages, Ndola railway station | Zero learns what a mind is, gets a body, finds its way and follows rules. |
| II. Living with doubt | Kanini, Masala, Itawa, Ndeke, the Kafubu River at Kawama | Zero learns that the world is uncertain, and how to reason anyway. |
| III. Learning | Masala Market, the Ndola–Kitwe road, Bwana Mkubwa, Lake Chilengwa | Zero stops being programmed and starts learning from data. |
| IV. The deep mind | ZUT in Northrise, President Avenue, Chifubu, the Civic Centre | Zero gets a neural brain: it learns to see, remember and speak. |
| V. The Copperbelt | Kitwe, Luanshya, Chingola, then back to Kafubu Dam | Zero goes out across the province. Then the storm comes. |

### The threads that keep you playing

- **The rival.** Chanda is Halo's local rep: young, sharp and sure of himself. He calls Zero "a toy that does sums". In every chapter, Apex fails in a way that chapter's concept explains, and Zero fixes it. Chanda slowly changes sides.
- **The mystery.** Zero was built by Dr. Mwila Kasonde, who disappeared three years ago. Each chapter you finish unlocks one of her voice logs hidden in Zero's memory. Bit by bit they reveal that she built the first version of Apex, left Halo when they chose speed over understanding, and built Zero as her answer.
- **The storm.** From Act II on, the Kafubu River keeps rising. Every chapter adds one more warning sign. It all comes together in the finale: Storm Night at Kafubu Dam.

### Zero grows up

Zero isn't a robot that collects parts. Its personality grows with what you teach it, and you see the change in how it talks.

| Stage | How Zero behaves |
| --- | --- |
| Act I | Takes everything literally. Asks basic questions. Gets simple situations comically wrong. Talks in short beeps and capitals. |
| Act II | Starts to notice patterns. Asks "how sure are we?" about everything. Gets nervous about uncertainty. |
| Act III | Questions assumptions. Points out when your data looks suspicious. Starts making suggestions. |
| Act IV | Challenges your choices: "I think your answer is wrong. Show me why you chose it." You have to defend your reasoning. |
| Act V | Transfers what it learned. In the finale, Zero meets a problem it has never seen, recognises a pattern from an earlier chapter, and proposes a solution. It shows you its reasoning step by step, so you can see where it came from. |

**Zero challenges you: a signature mechanic.** From Act III on, Zero sometimes objects to your answer, even when you're right. You must defend it with evidence, not just click again. Zero's objections are always grounded: each comes from a real misconception, a real alternative reading of the data, or a real edge case. Never from nowhere. When Zero is wrong, it says so and explains what convinced it. When you're wrong, it shows you why.

### The voice logs pull you forward

Each of Dr. Kasonde's logs answers one question and raises a new one. Players should want the next log more than the next upgrade.

| Log | What it reveals | The question it leaves |
| --- | --- | --- |
| 1 (Ch 1) | "Don't let them connect Zero to Apex. Don't give it answers. Give it reasons." | Who are "them"? Why not Apex? |
| 4 (Ch 4) | She worked at Halo. She wrote Apex's first rules. | Why did she leave? |
| 7 (Ch 7) | She warned Halo that Apex had never been tested in a rainy season. | What happened when they ignored her? |
| 11 (Ch 11) | Halo hid Apex's test results. She has a copy. | Where is it? |
| 15 (Ch 15) | The copy is inside Zero. It unlocks only when Zero can understand it. | What's in it? |
| 19 (finale) | The full results, and why she disappeared. | (Answered in the ending.) |

**The theme:** you can't fix what you don't understand.

### Cast

| Character | Role |
| --- | --- |
| You | Apprentice at Bupe's Repairs, Kansenshi. Zero's builder. |
| Zero | The robot. Its body and brain grow with every chapter. |
| Mama Bupe | Your boss. Old-school repairer. Practical, sceptical, warm. |
| Chanda | Halo's local rep. Rival who turns into an ally. |
| Dr. Mwila Kasonde | Zero's missing creator. Heard only through voice logs. |
| Apex | Halo's AI. Fast, confident, and wrong in ways you'll learn to explain. |
| Townspeople | A new one each chapter: a fire chief, a minibus driver, a beekeeper, traders, a mining co-op. |

Characters and companies are made up. The places are real. Check place details with locals before release.

## 2. Look and feel

The Chrome dino game is the style reference only: simple, fast, no clutter.

- **1-bit.** Pure black on white. No colour, no gradients.
- **Pixel sprites.** Zero is a 16×16 sprite. Townspeople are 12×12. Buildings are outlines.
- **One ground line.** Ndola scrolls side to side along it. You walk Zero between buildings.
- **Meaning without colour.** Right = solid fill. Wrong = inverted flash. Uncertain = dotted outline. Active = blinking.
- **Chunky pixel font** for the world, a clean font for formulas (KaTeX).
- **Tiny sounds.** Blip for a correct step, buzz for a wrong one. Mute by default.
- **Fast.** Loads in under a second on a cheap phone. Works offline once loaded.

* **Real Ndola, drawn simply.** The ground line runs past outline sketches of real places: the Kansenshi shop rows, Broadway's traffic lights, Masala Market stalls, the railway station, ZUT's buildings, the Kafubu Dam wall, the old Bwana Mkubwa headframe. Players should recognise their own city.
* **Zero visibly changes.** Every upgrade changes Zero's sprite: wheels, an antenna, a map screen, a dial on its chest, a glowing core. You can see how far you've come.

### Exploring Ndola

The town is a place to explore, not just a corridor between lessons. In every area you can:

- **Inspect** objects: open a meter, read a sign, look under a minibus.
- **Talk** to townspeople. Some have clues, some have wrong ideas you'll later disprove.
- **Collect clues** into Zero's notebook. Some challenges can't be solved until you've found the right clue in town.
- **Tinker with machines** you find: a traffic light box, a fire sensor, an old assay scale.
- **Make choices** that change the story: who you trust, what you tell the mayor, whether you help Chanda.

Keep it to point-and-click hotspots on the 1-bit side view. No open world. That keeps it buildable.

## 3. How every chapter plays

Every chapter follows the same ladder:

**Learn → Challenge 1 → Challenge 2 → Challenge 3 → Upgrade**

There is no theory exam. You prove you know the theory by using it to solve problems in the story. The challenges are built so you can't solve them without it.

### Learn

Short lessons, one concept each, 10–20 minutes. Each lesson uses these moves:

| Move | What you do |
| --- | --- |
| **Watch it fail** | Zero tries the task without the new ability and goes wrong, visibly. That's why you need this concept. |
| **Tinker** | A sandbox. Drag, slide, flip. Zero reacts live. You spot the pattern before you know its name. |
| **Name it** | The term and the formula appear, built from what you just did. Each symbol points at the thing you touched. |
| **Be the machine** | You run the method by hand, step by step. The game checks each step. |
| **Teach it back** | Zero asks "why?" You build the answer from sentence pieces, with wrong pieces mixed in. |

Math is taught when it's needed. If a lesson uses logs or square roots, a 2-minute **Toolbox** lesson comes first. The Toolbox is also open any time.

### The three challenges

The three challenges are named after the stages of making copper, the Copperbelt's trade: **Ore, Smelt, Refine.**

|  | Challenge 1: Ore | Challenge 2: Smelt | Challenge 3: Refine |
| --- | --- | --- | --- |
| Concepts used | One | Several from this chapter | This chapter plus earlier ones |
| Is the method named? | Yes | No, you choose | No, you choose and set it up |
| Data | Clean numbers | A twist: missing data, a closed road, a changed season | Messy, open-ended, real stakes |
| Help | Hints on | One hint | None |
| Theory trap | No | One | Several |
| If you get it wrong | A retry | Zero fails in town | The story shows the damage |

**Theory traps** are what make the game prove theory. A trap is a choice that looks right and is wrong, built from the classic mistakes: trusting accuracy on rare events, a heuristic that overestimates, a feature that leaks the answer, causation read from a weight. Only someone who understands the concept rejects it. You can't pass Refine just by plugging numbers into a formula.

**Decision points** sit inside every challenge: which method, which heuristic, which split, which threshold, what to tell the fire chief. Your choice changes what happens in Ndola.

**Harder doesn't mean more arithmetic.** Refine is harder because the situation is harder, not because the numbers are bigger. Difficulty grows through:

- **Ambiguous information:** a clue that could mean two things, data that might be faulty.
- **Competing goals:** speed vs safety, cost vs fairness, the mayor vs the fire chief.
- **Unexpected consequences:** your fix works, then breaks something else next chapter.
- **Trade-offs with no perfect answer:** you must pick and justify.
- **Combining earlier concepts** without being told which ones.

### Same ladder, different costume

Under the hood, every chapter runs Learn → Ore → Smelt → Refine → Upgrade. On screen, each chapter feels different:

| Style | Chapters |
| --- | --- |
| Investigation (follow clues, find the culprit) | 1 Waking Zero, 4 Rules, 6 Causes, 8 Learning |
| Repair (fix a broken machine) | 2 Body, 15 Brain |
| Rescue against the clock | 3 Finding the Way, 5 Doubt |
| Vigil (watch, wait, decide when to act) | 7 Hidden River |
| Race or duel against Chanda | 9 Drawing the Line, 17 Sequences |
| Expedition (explore a dangerous place) | 10 Decisions, 12 Groups, 14 Learning by Doing |
| Public showdown (convince a crowd) | 11 Judging the Judge, 18 Language |
| Field survey (gather data in town) | 13 Few Labels, 16 Seeing |
| Tour (new towns, new problems) | 19 Copperbelt |

**When you fail,** the game shows which concept caused it, sends you to that lesson, and gives you the challenge again with new numbers.

### Upgrade

Pass Refine and Zero gets a new part: a new look and a new ability you keep using for the rest of the game. The Map Unit from Chapter 3 lets you travel across Ndola. The Doubt Dial from Chapter 5 shows how confident any sensor reading in town really is. By the finale, you need almost all of them at once.

**Your rank rises too:** Apprentice (Ch 1–4), Technician (Ch 5–9), Engineer (Ch 10–14), Architect (Ch 15–19).

### Workshop (the coding side)

After Refine, an optional Workshop: write the real code for what you did by hand, in Python, in the browser. Hidden tests check it. By the end you've built your own small AI library.

## 4. The finale: Storm Night at Kafubu Dam

The biggest rain in years. The Kafubu River is rising. Apex controls the dam gates and the city's warnings, and it locks up. Chanda turns up at Bupe's shop, soaked: "I need Zero."

The finale is one long night in six missions. Each mission needs several chapters at once. Nothing is named for you.

1. **Read the river.** Gauges along the Kafubu disagree. Work out which gauges are faulty (Bayes and causal networks, Ch 5–6), then infer the river's hidden state (HMM, Ch 7).
2. **Set the gates.** Release too little and the dam is at risk. Release too much and Kawama floods. Use a utility-based agent (Ch 2) and the gate policy Zero learned in training (reinforcement learning, Ch 14).
3. **Warn the right streets.** Predict which streets will flood (classifiers, Ch 10). Set the alert threshold by what a missed warning costs (evaluation, Ch 11). Group households for the warning teams (clustering, Ch 12).
4. **Get people out.** Roads close as you plan. Route buses from Kawama and Lubuto to high ground (A\*, Ch 3). Bonus objective, for players who found constraint satisfaction in Ch 3: assign drivers to buses under shift limits.
5. **Answer the city.** Thousands of residents message in Bemba and English. Zero must answer from real notices and never invent a fact (language models and retrieval, Ch 18).
6. **Fix Apex, with Chanda.** Find out why Apex failed: the leak, the drift, the overconfidence (Ch 8, 11, 19). Repair it together.

**Zero's moment.** In mission 1, two river gauges agree that the river is safe, and Apex trusts them. Zero objects. It noticed both gauges sit below the same blocked culvert, so they share one cause and their agreement counts once, not twice. It's the same mistake you caught at Masala Market in Chapter 5, now in a new place. Zero shows its reasoning trace, linked to the Masala lesson. You decide whether to accept it. This is transfer of learning, not a robot suddenly turning clever.

**Endings** depend on how well you did: how many people were safe, how much was damaged, whether Apex was fixed. Then Dr. Kasonde's last voice log plays.

**After the story:** Free Play generates endless new Copperbelt problems that get harder each time. Architect Mode gives you a blank problem and you design the whole AI system yourself.

## 5. The 19 chapters

The order follows your notes. Each chapter has a place in Ndola or the Copperbelt, a story beat, its lessons, three challenges and an upgrade. Topics marked *bonus* go beyond your notes.

**Core, supporting and discovery for the heavy chapters:**

| Chapter | Core (required, full mastery) | Supporting | Discovery (optional) |
| --- | --- | --- | --- |
| 3 Finding the Way | BFS, uniform-cost, A\* with admissible heuristics | DFS, greedy, consistency | Minimax, alpha-beta, constraint satisfaction |
| 10 Making Decisions | Decision trees (entropy, information gain), KNN with distance and scaling, logistic regression | Sigmoid, decision boundaries | SVM and kernels, RBF networks, random forests, boosting, cross-entropy |
| 12 Finding Groups | K-means, choosing K, association rules | Silhouette, PCA | Hierarchical, DBSCAN, Gaussian mixtures |
| 15 Building a Brain | Neuron, forward pass, backpropagation | Activations, parameter counts | Dropout, batch norm, Adam |
| 16 Learning to See | Convolution, output size, classify vs detect vs segment | Pooling, IoU | Classical vision, GANs for images |
| 17 Remembering Sequences | Hidden state, vanishing gradients, LSTM gates | Backprop through time | GANs (the forger duel) |
| 18 Learning Language | Text as vectors, TF–IDF and cosine, attention | Embeddings, retrieval | Temperature and sampling, transformer details |
| 19 Zero Goes Copperbelt | Drift, monitoring, fairness | Privacy, explainability, regulation | Distillation, multimodal models |

### Act I — Waking up

**Ch 1. Waking Zero** — *What AI is* · Bupe's Repairs, Kansenshi

- Story: Zero powers on and does nothing at all. Mama Bupe hands you the shop's job cards.
- Learn. Core: what AI is (systems built to do tasks that need intelligence, like reasoning, perceiving, planning, learning or deciding); ordinary programs vs rule-based AI vs machine learning; AI doesn't have to learn from data. Supporting: deep learning as one kind of machine learning. Discovery: the four perspectives and a short history, found on the wall of old newspaper clippings in Mama Bupe's back room.
- Ore: Zero sorts the job cards wrongly. Work out a better rule yourself and give it to Zero. Then investigate the counter of machines and sort them into ordinary program, rule-based AI and machine learning.
- Smelt: Ba Mwansa's Apex smart meter claims to "learn your usage". Open it, check its rules and its memory, and prove whether it learns anything. Then fix it for the rainy season. Discovery side quest: the "smart AI scale" at Masala Market.
- Refine: Apex's launch at the Civic Centre. Chanda shows six features. For each, name the kind of AI, what it needs to work, and one way it could fail. Your answers are saved. Later chapters prove who was right.
- Upgrade: a speaker mid-chapter (Zero can talk), then the power core after Refine.

**Ch 2. Giving Zero a Body** — *Agents and environments* · Broadway

- Story: Broadway's traffic lights freeze whenever it rains. Apex blames the weather.
- Learn: agents, percepts, actions; PEAS; simple reflex, model-based, goal-based, utility-based and learning agents; environment properties.
- Ore: build a simple reflex controller for one light on Broadway from a parts bin.
- Smelt: rain blinds the queue camera. The reflex controller jams. Work out why (partial observability) and add memory.
- Refine: three linked junctions, buses that matter more than cars, and a fuel cost. Choose between a goal-based and a utility-based design, describe the environment properly, and justify it. Gridlock shows up on screen if you're wrong.
- Upgrade: sensor kit and memory chip.

**Ch 3. Finding the Way** — *Search* · Minibus stages, Kabushi, Ndola Teaching Hospital

- Story: Apex sends the Kabushi ambulance the long way round.
- Learn: state spaces; BFS, DFS, uniform-cost, greedy best-first, A\*; heuristics; admissible and consistent; *bonus:* minimax, alpha-beta, constraint satisfaction.
- Ore: the trip from Chifubu to town with the fewest minibus changes. Hold the frontier as a pile of cards: a queue for BFS, a stack for DFS.
- Smelt: the fastest ambulance route from Kabushi to the hospital, with real travel times. Design your own heuristic. If it overestimates, A\* loses its guarantee of finding the fastest route and can be misled into a slower one. This map is built so that it does go wrong, and the clock shows it.
- Refine: a flash flood closes roads mid-trip. Replan live, then assign buses to stages under driver and time limits. Side game: beat Chanda at **nsolo** using minimax.
- Upgrade: **Map Unit** — travel anywhere in Ndola from now on.

**Ch 4. Thinking in Rules** — *Logic* · Ndola railway station and goods yard

- Story: Apex's signal rules contradict each other and goods trains sit for hours.
- Learn: propositions, truth tables, validity, entailment, CNF, resolution, forward and backward chaining, what logic can't say about uncertainty.
- Ore: use a truth table to find the signal rule that can never be satisfied.
- Smelt: convert the yard's rule book to CNF and prove, by resolution, which switch caused a wagon mix-up.
- Refine: valve logs from Indeni Refinery contradict each other. Build a small rule engine, chain forward and backward, and find the faulty sensor. Then Zero hits a wall: the logs say "probably", and logic can't handle "probably". This leads into Act II.
- Upgrade: Logic Board. Rank: Technician.

### Act II — Living with doubt

**Ch 5. Living with Doubt** — *Probability and Bayes* · Ndola Fire Station, Kanini, Masala

- Played in full in section 6.
- Upgrade: **Doubt Dial** — shows the real probability behind any alarm or sensor in town.

**Ch 6. Causes and Clues** — *Bayesian networks* · Itawa and Ndeke

- Story: the power keeps going off. Load-shedding? A transformer? The storm? Apex logs everything as "network fault".
- Learn: DAGs, CPTs, factorising the joint, inference by summing over causes, explaining away, d-separation.
- Ore: build the network from cause cards and compute one joint probability.
- Smelt: an outage is reported. Compute the chance of each cause. Then learn a storm hit, and watch the transformer's blame drop (explaining away).
- Refine: the utility can afford one new sensor. Use d-separation to pick the one that actually tells you most about the transformer. The wrong sensor tells you nothing new, and the next outage proves it.
- Upgrade: Cause Lens.

**Ch 7. The Hidden River** — *Hidden Markov models* · Kafubu River, Kawama

- Story: fishermen at Kawama report the water level each morning. Nobody can see what the river is really doing upstream.
- Learn: hidden states vs observations; starting, transition and emission probabilities; Viterbi; the forward algorithm; why a best path isn't a certainty.
- Ore: three days of reports. Run Viterbi on a trellis: arrive, compare, multiply by the observation, draw the pointer.
- Smelt: ten days of reports, with one day missing. Then switch max for sum (forward) and see why the answers differ.
- Refine: decide the day to warn Kawama. Weigh the forward probability against the cost of a false alarm. First real sign of the storm to come.
- Upgrade: Hidden-State Visor.

### Act III — Learning

**Ch 8. Learning from Examples** — *ML foundations* · Masala Market

- Story: Apex's tomato price predictor was "99% right" in testing and useless at the market.
- Learn: task, experience, performance; supervised, unsupervised and reinforcement learning; features and labels; train, validation and test; leakage; underfitting and overfitting; bias and variance; cross-validation; No Free Lunch; *bonus:* feature scaling.
- Ore: set up the task, the data and the score for grading tomatoes. Split the data into three locked boxes.
- Smelt: find the feature in Apex's data that leaks the answer. That's the "99%".
- Refine: train Zero's own model. Read its learning curves, pick a fix, and prove it on data from another market (Chisokone in Kitwe) that the model never saw.
- Upgrade: **Learning Core** — Zero can now train on data you collect around town.

**Ch 9. Drawing the Line** — *Regression and gradient descent* · Ndola–Kitwe road

- Story: minibus drivers want to know how long the trip to Kitwe will take.
- Learn: linear models, residuals, MSE, gradients, gradient descent, learning rate, ridge, alpha vs lambda; *bonus:* mini-batch SGD, momentum.
- Ore: drag a line through trip records and watch the squared-error boxes shrink. Fit it by hand.
- Smelt: gradient descent. Zero walks down a dark hill, only feeling the slope. You set the step size. Too big and it overshoots off the ridge.
- Refine: many features (time of day, rain, roadworks at Kafulafuta, day of week). Add ridge, choose lambda by validation, and tell the drivers what each weight means, and what it doesn't prove.
- Upgrade: Gradient Engine. Rank: Engineer.

**Ch 10. Making Decisions** — *Classifiers* · The old Bwana Mkubwa mine

- Story: a miners' co-op wants to know which rock samples are worth processing.
- Learn: sigmoid and logistic regression; decision trees, entropy, information gain; k-nearest neighbours and distance measures (Euclidean, Manhattan, cosine); SVM margin, C, kernels; *bonus:* cross-entropy, random forests, boosting.
- Ore: play 20 Questions with the rocks. Pick the question with the highest information gain.
- Smelt: classify a new sample by its nearest neighbours. Then one measurement is in different units, and the neighbours change. Fix it by scaling.
- Refine: choose a model for the co-op with very little data and a curved boundary. Trap: the model with perfect training accuracy.
- Upgrade: Decision Core.

**Ch 11. Judging the Judge** — *Evaluation* · Ndola Main Market

- Story: fake kwacha notes are going round. Apex and Zero each build a detector. The traders' association will choose one.
- Learn: confusion matrix, accuracy, precision, recall, F1, specificity, error costs, class imbalance, thresholds, subgroup results, splitting by the right unit; *bonus:* ROC and AUC, confidence intervals.
- Ore: fill the confusion matrix and compute every metric.
- Smelt: fakes are rare. Apex boasts 98% accuracy. Show why that number means nothing here. Slide the threshold and watch the boxes trade places.
- Refine: present to the traders. Compare both detectors by the cost of each kind of mistake, check how each does on old worn notes, and say how sure you can be from this many samples.
- Upgrade: Judge's Eye.

**Ch 12. Finding Groups** — *Unsupervised learning* · Bwana Mkubwa tailings, Main Market

- Story: old mine waste might still hold copper and cobalt. Nobody ever labelled the samples. Meanwhile a wholesaler wants to know what sells together.
- Learn: K-means, WCSS, elbow, silhouette, hierarchical clustering, DBSCAN, Gaussian mixtures and EM, PCA, association rules.
- Ore: K-means by hand: place centres, assign samples, move centres, repeat.
- Smelt: choose K with elbow and silhouette. Then a group with a strange shape: K-means fails, DBSCAN works.
- Refine: six chemical readings per sample. Reduce with PCA, cluster, and say what PCA kept and lost. Then mine the wholesaler's receipts. Trap: a rule with high confidence but lift below 1.
- Upgrade: Pattern Finder.

**Ch 13. Few Labels** — *Semi-supervised learning* · Lake Chilengwa

- Story: a birdwatcher has 10 labelled recordings and 1,000 unlabelled ones.
- Learn: smoothness, cluster and manifold assumptions; self-training; pseudo-labels; how early mistakes spread.
- Ore: choose a confidence cut-off for accepting Zero's guesses.
- Smelt: one bad early label spreads through its neighbours. Find it and stop it.
- Refine: a new dataset. Decide whether semi-supervised learning will help or hurt, by checking its assumptions first.
- Upgrade: Self-Teach Module.

**Ch 14. Learning by Doing** — *Reinforcement learning* · Bwana Mkubwa tunnels

- Story: an ore cart has to cross half-flooded tunnels. There's no map. Zero must learn by trying.
- Learn: MDPs, states, actions, rewards, discount, policy, value, Q-learning, SARSA, on- vs off-policy, exploration vs exploitation.
- Ore: compute Q updates on a small grid. Terminal tiles have no future value.
- Smelt: tune the discount and exploration rate. Too little exploring and Zero gets stuck on a poor route.
- Refine: a flooded shaft sits next to the shortest path. Compare Q-learning and SARSA: which is safer while it learns, and why? This is the policy Zero will need at the dam.
- Upgrade: Habit Engine. Rank: Architect.

### Act IV — The deep mind

**Ch 15. Building a Brain** — *Neural networks* · ZUT, Northrise

- Story: Zero hits a pattern no straight line can split. The ZUT robotics lab lends it a neural chip.
- Learn: neurons, weights, bias, activations, MLPs, forward pass, loss, backpropagation, parameter counts; *bonus:* dropout, batch norm, Adam.
- Ore: wire neurons into an XOR gate. See why one neuron can't do it.
- Smelt: one forward and one backward pass by hand. Update the weights.
- Refine: size a network for a real task, count its parameters, and diagnose a training run that stalls.
- Upgrade: Neural Core.

**Ch 16. Learning to See** — *Computer vision and CNNs* · President Avenue

- Story: the council wants potholes found automatically from minibus dashcams.
- Learn: images as numbers, filters, convolution, stride, padding, output size, pooling, parameter counts; classification vs detection vs segmentation; IoU; classical vision.
- Ore: slide a pixel stencil over a black-and-white road image and watch the edges light up.
- Smelt: trace an image's shape through a small CNN, layer by layer. Count the parameters.
- Refine: the council asks three questions. Is there a pothole? Where? How big, for repair costs? Each needs a different output type. Score detections with IoU, and handle night and rain photos.
- Upgrade: Vision Module.

**Ch 17. Remembering Sequences** — *RNNs and LSTMs* · Chifubu

- Story: a kalindula band wants Zero to continue their melody. Meanwhile someone is selling fake recordings of the band.
- Learn: hidden state, backprop through time, vanishing and exploding gradients, LSTM gates. Discovery: GANs. RBF networks move to Ch 10 as a discovery, next to KNN and kernels.
- Ore: one RNN step by hand. Watch the memory of the first note fade.
- Smelt: open and close LSTM gates to keep the opening phrase alive.
- Refine: the band plays a long song live. Zero must carry it on in key from the opening phrase, without drifting. Work out why the plain RNN loses the thread and the LSTM doesn't. Discovery side quest: track down the forger and win the GAN duel.
- Upgrade: Memory Loop.

**Ch 18. Learning Language** — *NLP and language models* · Civic Centre help desk

- Story: residents ask about council notices in Bemba and English. Apex just made up a bylaw that doesn't exist.
- Learn: tokens, bag of words, TF–IDF, cosine similarity, embeddings, attention, transformers, LLMs, temperature, retrieval-augmented generation, hallucination.
- Ore: TF–IDF and cosine similarity by hand to find the right notice.
- Smelt: attention on tiny vectors: score, softmax, weighted sum. Turn the temperature up and watch Zero ramble.
- Refine: build a help desk that answers only from real notices, says when it doesn't know, and handles mixed Bemba and English. Catch Apex's invented bylaw and explain how it happened.
- Upgrade: Voice of Zero.

### Act V — The Copperbelt

**Ch 19. Zero Goes Copperbelt** — *Deployment, ethics, modern AI* · Kitwe, Luanshya, Chingola

- Story: other towns want Zero. But a model trained in Ndola starts failing in Chingola.
- Central problem: Zero works in Ndola. Make it work safely and fairly everywhere else. Learn: data drift, monitoring, fairness (core); privacy, explainability, regulation (supporting); distillation, multimodal models (discovery).
- Ore: detect drift by comparing Chingola's data with Ndola's.
- Smelt: audit Zero's past decisions for unfair errors across townships.
- Refine: write a rollout plan: monitoring, privacy, a fallback for townships with poor signal. Then the rain starts.
- Upgrade: Copperbelt Link.

Then: **Storm Night at Kafubu Dam** (section 4).

## 6. One chapter played in full: Ch 5, Living with Doubt

This is the template every chapter follows. Numbers are fixed here so the solver can be tested. In the game they're random each time.

### Story beat

At the end of Chapter 4, Zero's logic hit a wall: the world says "probably". Now Ndola Fire Station has a problem. Apex's smoke alarms ring all night in Kanini, and the crews are exhausted. Last week they ignored one, and it was real. The fire chief, Mrs. Mulenga, asks Zero for help. Chanda laughs: "Our sensors are 95% accurate. The problem is your firemen."

### Learn (5 lessons)

1. What probability is: counting outcomes out of a whole.
2. Joint and conditional probability: "fire AND ring" vs "fire GIVEN ring".
3. Bayes' rule. **Hook:** a ring at a Kanini bakery, Zero foams the whole shop, it was toast. **Tinker:** a grid of 1,000 squares with three sliders: how common fires are, how often the sensor catches one, how often it rings for nothing. Slide fires down and watch false alarms take over. **Name it:** prior, likelihood, posterior, then the formula, each part pointing at squares you counted.
4. Total probability: rainy season and dry season mixed into one year.
5. Independence, conditional independence, and mutually exclusive events: three ideas everyone mixes up.

### Challenge 1 (Ore): one alarm in Kanini

Method named, hints on.

- Fires are present in 2% of checks. The sensor rings for 95% of fires and wrongly for 10% of no-fire checks.
- Out of 1,000 checks: fires = **20**, no fire = **980**
- Rings with fire = 20 × 0.95 = **19**. Rings without fire = 980 × 0.10 = **98**
- P(fire | ring) = 19 / 117 = **0.162**
- P(fire | silent) = 1 / 883 = **0.0011**
- Decision point: Mrs. Mulenga asks, "So do we ignore it?" The right answer is no. About 1 in 6 is still real, and a missed fire costs far more than a wasted trip. The fix is to check fast, not to ignore.

### Challenge 2 (Smelt): two sensors at Masala Market

Method not named. One hint.

- **Setup.** Masala has a smoke sensor and a heat sensor. Smoke: rings for 95% of fires, 10% falsely. Heat: rings for 80% of fires, 5% falsely. Fires in 2% of checks.
- **Step 1: both ring.** The obvious move is to multiply, assuming the sensors are independent given the fire state. With fire: 0.95 × 0.80 = 0.76. Without: 0.10 × 0.05 = 0.005. P(fire | both) = 0.0152 / (0.0152 + 0.0049) = **0.756**. Zero sends a truck. No fire.
- **Step 2: the discovery.** In the station, you find Mrs. Mulenga's alarm logbook. Most double alarms happen around lunch and supper. Cooking times.
- **Step 3: the realisation.** Cooking smoke sets off both sensors at once. It's a shared cause, so the sensors are **not** independent when there's no fire. The 0.756 can't be trusted.
- **Step 4: investigate.** Count from the logbook: both sensors ring together in **3%** of no-fire checks, not the 0.5% the independence assumption predicted. (When there is a fire, the sensors still behave independently.)
- **Step 5: recompute.** P(fire | both) = 0.0152 / (0.0152 + 0.98 × 0.03) = 0.0152 / 0.0446 = **0.341**.
- **The lesson:** one hidden assumption doubled Zero's confidence. This shared-cause pattern is exactly what Chapter 6 teaches you to draw, and it comes back in the finale.
- **Twist: the dry season.** Fires are 4% of checks in the dry season (40% of the year) and 1% in the rainy season. The yearly rate = 0.4 × 0.04 + 0.6 × 0.01 = **0.022**. Zero must use tonight's season, not the yearly figure.

### Challenge 3 (Refine): the night of four alarms

No method named. No hints. Uses Ch 2 (utility) and Ch 3 (routes).

It's 2 a.m. Four alarms ring at once. The station has three trucks. Apex's screen says every alarm is "95% fire". The mayor phones: "Send the first truck to Kanini. It's the biggest market."

Zero's records for each township (all sensors catch 95% of fires):

| Township | Fires per check | False alarm rate |
| --- | --- | --- |
| Kanini | 0.5% | 10% |
| Chifubu | 2% | 10% |
| Twapia | 4% | 5% |
| Masala | 3% | 2% |

First you have to work out for yourself that "95%" is the wrong number. The real chances of fire: Kanini **0.046**, Chifubu **0.162**, Twapia **0.442**, Masala **0.595**.

**The probability is not the decision.** The Doubt Dial now shows a second number: expected loss, the chance of fire times the damage if no one gets there in time. Damage depends on drive time (from the Map Unit) and what's there: Masala's crowded stalls burn faster than a single house. A close, high-damage alarm with a lower probability can still deserve a truck before a far, low-damage one. You choose, and you justify it.

**It plays out live.** The clock only moves when you act, so there's time to think, but every choice costs time. Assign a truck and you watch it leave the station and drive across the map. The night doesn't wait: a neighbour in Twapia calls to say she can see smoke. That's new evidence, so you update the probability. Masala's sensor goes quiet. Update again. Send a truck the wrong way and you watch the real fire grow while you decide the rest.

- **Trap 1:** believing "95% accurate" means a 95% chance of fire.
- **Trap 2:** following the mayor's order because Kanini is biggest. Its alarm is the least likely to be real.
- **Trap 3:** treating the highest probability as the decision, and ignoring damage and drive time.
- **Outcome:** get it right and the real fire in Twapia is caught early. Get it wrong and you watch it spread while a truck sits outside an empty Kanini bakery.

### Upgrade and story

Zero gets the **Doubt Dial**: from now on, every sensor and alarm in town shows its real probability. The fire station switches to Zero. Chanda says nothing, but he writes the numbers down. Dr. Kasonde's fifth voice log unlocks: *"Apex reports how often it's right. It never asks how often the thing is there."*

## 7. Mastery and memory

**Every problem is generated.** Each challenge is a small program: a generator makes fresh numbers and situations, and a solver computes the true answer and every step. You can't memorise answers. You have to learn the method.

**Step-by-step checking.** Each step is checked on its own, to 3 decimal places. If the final answer is wrong, the game shows which step caused it.

**Mistake detectors.** Each concept lists its classic mistakes: swapping likelihood and posterior, the wrong denominator, parameter vs hyperparameter, K-means vs KNN. When your answer matches one, Zero names it.

**Zero's brain map** is the progress screen. Each concept is a chip:

| Chip | How you earn it |
| --- | --- |
| Dark | Not started |
| Outline | Lesson done |
| Half-lit | Ore passed |
| Lit | Smelt passed |
| Refined | Refine passed |

**Chips fade.** If you don't use a concept for a while, its chip dims. A short **Morning Shift** (5 quick problems, about 3 minutes, set somewhere in Ndola) brings back the concepts that are due, at 1, 3, 7, 14 and 30 days. Later chapters also reuse earlier concepts inside their challenges, so nothing is "done" until the end.

**Zero's Manual.** Every formula and definition you unlock goes into Zero's manual. By the end, it's your own revision sheet.

## 8. Architecture for Cursor

Keep it simple. A static web app, no backend at first.

- **Stack:** Vite + React + TypeScript. Scenes are background images with clickable HTML hotspots over buildings, people and objects. CSS for the 1-bit look and simple animation. No canvas to start. KaTeX for formulas. Vitest for tests.
- **Coding Workshops:** Pyodide (Python running in the browser). Load it only when a Workshop opens. Postponed until the core game works.
- **Saving progress:** localStorage. Add save export/import later, since clearing browser data wipes it. No backend, accounts or cloud saves at first.
- **Hosting:** any free static host. Offline: a service worker caches the app shell, sprites, fonts and the content for the current and next chapter, so the game loads and plays with no connection. Progress saves locally. Python Workshops (Pyodide is large) need a connection the first time, then stay cached. Built after the opening works, using the Vite PWA plugin.

### About ten reusable pieces cover all 19 chapters

You don't build 19 games. You build these once and reuse them everywhere:

| Piece | Used for |
| --- | --- |
| Town | Walking Zero, townspeople, Watch it fail scenes |
| Sandbox | Sliders and toggles that drive a live picture (Tinker) |
| StepTrace | Typed step-by-step calculations (Be the machine) |
| TableFill | Truth tables, CPTs, trellises, confusion matrices, Q-tables |
| GraphBoard | Maps, Bayesian networks, neural nets |
| PointPlot | Distances, clusters, regression lines, margins, PCA |
| GridWorld | RL grid, pixel images, convolution stencils |
| PartsBin | Build it: drag parts into Zero |
| SentenceBuilder | Teach it back |
| ChallengeRunner | Runs Ore, Smelt and Refine; checks steps and decisions; plays out the result in town |
| Story | Dialogue, voice logs, upgrades, rank, Zero's changing sprite |

### Every concept is one module

```ts
interface Concept {
  id: string;                 // "prob.bayes"
  chapter: number;
  prereqs: string[];
  hook: Scene;                // Watch it fail
  sandbox: SandboxSpec;       // Tinker
  formula: string;            // KaTeX
  generate(seed: number): Problem;   // fresh numbers, reproducible
  solve(p: Problem): Step[];         // true answer for every step
  misconceptions: Trap[];
  build?: BuildTask;          // Build it
  debug?: DebugTask;          // Debug it
  teachBack: Explanation[];   // right and flawed explanations
  challenges: [Challenge, Challenge, Challenge];  // Ore, Smelt, Refine, each with traps
}
```

**Every solver must reproduce the worked examples in your notes as automated tests.** If a solver is wrong, the game teaches the wrong thing with full confidence. That's the one thing you can't afford.

### What every generator must produce

Random numbers alone don't make a good problem. An A\* map where greedy and A\* happen to agree teaches nothing about A\*. So generators start from a hand-written scenario template and only randomise inside safe limits. Each one must output:

- **A valid problem** that actually shows the idea it's meant to teach. Each template has property checks, for example: "greedy and A\* must choose different routes", or "the base rate is low enough that false alarms outnumber real ones".
- **A verified solution**, every step.
- **An explanation for every step**, in plain words.
- **Known mistake cases**: what each common wrong answer looks like, and what Zero says about it.
- **A difficulty rating**: Ore, Smelt or Refine.

If a generated problem fails a property check, it's thrown away and regenerated. Tests run thousands of seeds per template to prove the checks hold. A wrong explanation teaches a misconception with full confidence, so explanations get tested just like answers.

## 9. Build order and decisions

### Build order

| Phase | What | Done when |
| --- | --- | --- |
| 0. Script | Write the story beats for all 19 chapters. Write Ch 1–3 in full: lessons, all three challenges, traps, upgrades. | Ch 1–3 are fully on paper. |
| 1. MVP | Town (Kansenshi, Broadway, Kabushi), Sandbox, StepTrace, PartsBin, SentenceBuilder, ChallengeRunner, Story, saving. Ch 1–3 playable. Built in two steps: first the opening 10 minutes (section 10) as a vertical slice, then the rest of Ch 1–3. | Someone who knows nothing about AI plays Ch 1–3 and passes all three Refine challenges. |
| 2. Act II | Ch 4–7. Add TableFill and GraphBoard. | Refine challenges pass with new numbers every time. |
| 3. Act III | Ch 8–14. Add PointPlot and GridWorld. Python Workshops start. | All your exam topics can be practised. |
| 4. Acts IV–V | Ch 15–19, Storm Night, Free Play, Morning Shift. | The full game, start to finish. |

Why Ch 1–3 first: it's where the story starts, and it uses every kind of lesson and challenge. If the loop is fun and teaches there, it will work everywhere.

**Test the slice before building more.** Give the first 10 minutes to someone who knows nothing about AI. Watch, don't help. Note every point where they get stuck, bored, or need you to explain. Fix those before Chapter 1 continues.

### Decisions for you

1. **First real players:** you alone, or a few of your students? Real beginners will show where the story or lessons lose them.
2. **Language:** English only, or some Bemba dialogue for townspeople? Bemba adds a lot of character.
3. **Answers in challenges:** typed numbers for calculations (my strong leaning), and choices for decisions.
4. **Workshops:** Python in the browser (heavier, industry-standard) or JavaScript (instant)?
5. **Name:** "Unit Zero" is a working title. "Copper Mind" fits the story too.

## 10. The first 10 minutes

This is the vertical slice to build first. **Goal:** a player finishes it wanting to walk out of the shop and see what Apex is really up to.

| Time | What you see and do | What you learn | Why you keep going |
| --- | --- | --- | --- |
| 0:00–0:45 | **Title.** 1-bit Ndola skyline at dusk. Broadway's traffic lights blink in the wrong order. Text: *Ndola. Apex runs the city now.* Press any key. | Nothing yet. | Something's wrong with the city. |
| 0:45–1:45 | **Bupe's Repairs, Kansenshi.** Mama Bupe: "You're late. Apex changed the minibus timetable again?" You learn to walk and click by fetching her a soldering iron. Ba Mwansa drops off an Apex smart meter that "reads wrong every time it rains". | How to move, inspect and talk. | Apex fails again, and nobody knows why. |
| 1:45–2:45 | **The back room.** Behind old radios, a crate: *COPPER MIND PROJECT — UNIT 0. Property of Dr. M. Kasonde. DO NOT CONNECT TO APEX.* Pick the right power cable by reading the labels. Zero boots. One eye blinks. HELLO. WHAT AM I FOR? | Reading clues carefully. | Who is Kasonde? Why not Apex? |
| 2:45–4:30 | **Ore challenge: your first discovery.** Mama Bupe: "Make it useful. Sort today's job cards." Zero sorts them by card colour and proudly hands back nonsense. Nobody tells you what's wrong. You pick up the cards and read them: "no sound", "smells burnt", "won't charge", "crackles". You spot that the useful thing is the fault, not the colour. You write Zero's rule yourself: sort by fault type. Zero gets it right. Mama Bupe: "You just programmed it. Your rule, not its." | A program does exactly what its rules say. The rules came from you. | You made Zero work. Now you want it to think. |
| 4:30–6:00 | **The counter of machines.** Four things on the counter: a kettle with a thermostat, a calculator, Mama Bupe's old "Radio Doctor" box that asks yes/no questions and reasons through a fault chart, and a radio that suggests stations from what you've played. Nobody tells you what to look for. Inspect them freely: read the labels, press buttons, open the backs. Put each where you think it belongs: ordinary program, rule-based AI or machine learning. Then Zero and Mama Bupe push back where they disagree, with two questions: does it follow rules written by a person, or learn patterns from examples? Does its job need intelligence? Change your mind or argue your case. Mama Bupe adds that even learning machines are designed by people, who choose what they learn from and what counts as right. Zero and Mama Bupe argue about the calculator, and both have a point. | Ordinary program vs rule-based AI vs machine learning. AI doesn't have to learn. The borders are blurry. First chip outline lights up. | Zero: "So I am not a program. Am I AI yet?" |
| 6:00–7:30 | **Smelt challenge, part 1: the smart meter.** Apex's box says it "learns your usage". Open it. Read the rule card: IF reading > 100 THEN alert HIGH. Check its memory: it stores no history. It can't learn anything, so it can't adjust to rainy-season use. Decision: tell Ba Mwansa "the AI is broken", or "it never learned anything; it's a fixed rule set too low for the rainy season". Then pick a better threshold from his bills. | Telling a fixed rule from learning. First theory trap: believing a label that says "learns". | Zero: "It was told what to do. Nobody told it why." |
| 7:30–8:30 | **Teach it back.** Zero asks, "What is AI?" You build the answer from pieces. Right: *systems built to do tasks that need intelligence*, *like reasoning, perceiving, planning, learning or deciding*. Traps: *anything a computer does*, *it must learn from data*, *it must think like a human*. Zero: "So I can be AI without learning?" Mama Bupe: "Yes. But you'll have to learn if you want to survive this town." | A correct working definition of AI, and ML as one way to build it. | Zero wants to learn. So do you. |
| 8:30–9:15 | **Upgrade.** Mama Bupe fits a speaker. (The power core comes after Refine, at the Civic Centre.) Zero's sprite gets an antenna. Its speech changes from capital-letter beeps to normal words. Rank: Apprentice. | — | Zero is now visibly yours. |
| 9:15–10:00 | **The hook.** Zero's eye flickers. A hidden file plays: Dr. Kasonde's voice. *"If you're hearing this, Zero is awake. Good. Don't let them connect it to Apex. And don't give it answers. Give it reasons."* The power cuts out on the street. A white Halo van rolls past. Mama Bupe hands you a flyer: Apex launches at the Civic Centre tomorrow. Far off, a trader at Masala Market shouts "AI scale! Never wrong!" New markers on the map: the Civic Centre and, if you're curious, **Masala Market.** | — | A mystery, a rival and the next problem, all at once. |

**What this slice proves:** walking and inspecting, dialogue, a Tinker sandbox, a theory trap, Teach it back, an upgrade, the brain map, a voice log and the story hook. If these 10 minutes work, the rest of the game is more of the same pieces.

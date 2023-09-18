---
title: LeCun 2022 Notes
date: 2023-07-07
short: true
---

## A Path Towards Autonomous Machine Intelligence

- coming in from I-JEPA paper
- general thesis is that world models support moving BC language models -> actually intelligent AI, see "dark matter of intelligence" interview
- system consisting of configurator module, perception module, world model module, cost module, short-term memory module, actor module
- mode 1: reactive behavior, using encoder to generate world state, then passing to policy module that does no planning. can use memory however
  - classic policy gradient stuff more or less
- mode 2: planning, explicitly simulating. costly, can only really focus on one complex task at a time
- solution: learn divergence between BC and mode 2, train policy module to use in mode-1 that appx this search method
- cost module: immutable and trainable

### Designing and Training the World Model

$z \in \mathcal{Z}$ inline test

$$z \in \mathcal{Z}$$

- train the model thru SSL; but the problem is undersampling the true underlying environment thru training data. unfortunately we can't just simulate like normal RL since we don't have defined full MDP
- energy-based models (EBM) measure compatability measures $F(x,y)$ > predict y from x, since y \in Y, set of possible valid answers
- model needs to represent multiple predictions, can use latent variables to do so (LVEBM) E_w(x,y,z). given (x,y), find \hat{z} = \argmin_{z \in \mathcal{Z}} E_w(x,y,z). Then F_w(x,y) = E_w(x,y,\hat{z})
- at training time we compute a w to parameterize the energy function to best fit the training pairs. need to construct architecture and loss function. generally simple but susceptable to collapse (E(x, y) = k \forall y)
  - predictive or deterministic-generative doesnt, non-det gen can if z is malformed, autoencoders can if the encoder is higher dim than the original, joint embedding can if encodings s_x and s_y don't contain enough information
- how to prevent? contrastive and regularized methods
  - contrastive: increasing in F_w(x,y), decreasing in F_w(x,\hat{y}). eg distance dependent hinge loss. easy to generate and baked into GANs, masked auto-encoders, BUT picking a suitable y_hat is non trivial, and if y is high-dim then curse of dim. requires us to generate exponential amounts of data to contrast with
  - regularized beats this by pushing down energy of training samples and minimizing volume of y-space to which low energy is given
- JEPA encodes (with not necessarily identical encoders) x and y to s_x and s_y, energy is E_w(x,y,z) = D(s_y, Pred(s_x, z)), minimized over z
  - performs prediction in representation space, ie for a video we dont generate every pixel of every frame in the future (Q: for inference, do we then train a decoder as well? compounding error here?)
  - train by max info content on encoders, minimize info content on z (ie regularize), and minimize pred error on divergence from predictor
    - VAEs max entropy on stochastic var z
    - VICReg is a way to train, maps s_x s_y to higher dim embeddings v_x v_y with expander (few layered NN), loss function drives cov(v_y) -> I, stdev of each component of s_y, v_y above a threshold (same for x)
  - JEPA pushes irrelevant details into the latent var, or eliminated by encoder (better than generative, which has to rely on latent alone)
  - hierarchical planning learned thru multiple encoding schemes (net of neural nets, kinda?)
- environment naturally stochastic (either aleatoric or epistmetically so) -> moved into the latent variable
  - different types of prediction may also employ different architecture, e.g. short term in video could use local feature vectors, while long term could use transformers
- writeable memory of world state > state vector is simpler, just update diff

### Designing and Training the Actor

- actor should 1. infer optimal actions given predictions, 2. produce latent variable configs, 3. train policy networks for mode-1 actions

### Designing the Configurator

- Main controller of the agent, controls all other modules
- Assigns subgoals and configures cost module for said goals

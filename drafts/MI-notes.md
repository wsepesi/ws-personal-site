---
title: Mech Interp Mega Notes Doc
date: 2023-10-17
short: true
---

## Intro to Circuits

three claims:

- features are fundamental building block of NNs - "features"
- features are connected by weights, forming circuits - "circuits"
- these circuits are found in analogous forms across models and tasks - "universality"

### features

- this isnt actually proven as of 2020, eg all the "early layers are curve detectors, late layers are face detectors" stuff had legit pushback
- edge detectors believed in, but high level stuff isnt
- e.g. curve detectors, for each orientation, in all non trivial vision nets
  - looking at mixed3b layer on inceptionv1, 2014 imagenet champion CNN
  - do they really detect curves? 7 rationales
    - feature visualization; we can fire these reliably (go read this article)
    - imagenet examples -> firing
    - synthetic examples -> firing
    - joint tuning -> take dataset that causes to fire, rotate 90 degrees, learn, the rotated one then fires and the original doesnt
    - feature implementation -> curve detection algorithm from weights of entire circuit
    - feature use -> downstream usage is circle detectors, spirals etc
    - handwritten circuits -> handset weights reproduce behavior
- high low frequency detectors
  - ok curve detectors make sense, but can we find features that are unintuitive?
  - found in early vision, half the field is low freq the other half is high freq ie useful for background / foreground
    - additional motivation for valors of interpretability as a "natural science," eventually could help us ascertain useful traits of the world at large that we haven't thought about
- pose invariant dog head detector
  - high level feature. visualization is pretty funny lol
- polysemantic neurons
  - not all neurons exude one feature. eg one in inception that is cat faces, cat legs, front of cars
  - major challenge. hard to do real circuit analysis if things might get reused a ton
  - also hints at parameter inefficiency? why does one neuron need to take on all these tasks, theoretically it would be better at specialization?
  
### circuits

- "features are connected by weights, forming circuits"
  - tightly linked subgraphs
- resulting connections are meaningful, i.e. have structure and symmetry. since linked by float weights, we can start reading algorithms off the network weights
- curve detectors redux
  - the ones we discussed are created by earlier, weaker detectors + line detectors
  - 5x5 conv -> 5x5 matrix w positive induces further excitement
  - positive weights arranged in shape of curve detector (at next layer, not prev)! corresponds to that convolved matrix in that position; basically looking for tangent curves at the previous spot. also negative for opposite curves at previous layer, essentially de-emphasizing
- dog head detection
  - higher level, spans 4 layers
  - imagenet needs lots of dedication to animal detection; particular different species of dog -> lots of dedicated "dog head" neurons lol
  - two symmetric pathways of L / R facing fur, then heads, then heads + neck, then orientation invariant head / head + neck from "union" over the pathways
  - this is complex behavior! completely learned
  - weights also make sense, either looking at head L / R or trying to concentrate to the center on the union cases
- cars in superposition
  - car detector constructed logically from car top, bottom, body. again convolution weights are relevant
  - but THEN it is passed apart into dog detectors. essentially built up pure, then ripped apart
  - can conceivably imagine this is because they are unrelated, and we can just store that info together, and dissect later

### universality

- rudimentary research so far, but we do see curve detectors, high-low detectors form in similar patterns across ImageNet trained networks (eg VGG, alexnet)
- if hypothesis holds in NNs, can it also hold for real biology? this is currently not studied, but would be important to reinform us. also, curve detectors are present in biological nets
- importance boils down to our model of circuits as cells (natural science motif) being common cells instead of disparate

### interpretability as natural science

- view as a pre-paradigmatic field. "not sure what questions to ask, definitions to define"
- eval hard, DL ppl want benchmarks, HCI wants studies. etc
- authors offer natural science as lens; "neural network as object of empirical investigation"

## An Overview of Early Vision in InceptionV1

- why study early vision? easy to get a look at, and likely universal
- first 1056 neurons of inceptionv1. which is plenty to be complicated

### playing cards with neurons, and more intro

- neuron families detect same feature in different orientation or color, same families occur across models
  - this work defines families in the first 5 layers, manually. similar work tries this automatically but misses / mislabels details
  - essentially aiming for period table of neurons. as we discover more "unanticipated" circuits eg high low detectors, we can then locate these in other networks, expand our knowledge
- we use feature visualizations, i.e. optimized images to see activation
- check [this](https://microscope.openai.com/models/inceptionv1/mixed5b_5x5_bottleneck_0?models.op.feature_vis.type=channel&models.op.technique=feature_vis) out

### layers

see article

## Curve Detectors

### intro / story of curve detectors

- again, disagreement on existence of meaningful features, curve detectors as vehicle for this
- sparse activations, invariant to color texture etc
- existence of this is profound -- one, falls out of gradient descent with meaning, no incentive in training to be interpretable, make curve detectors etc. much more abstract task
- and curve detector algorithms in general are UNSOLVED (!!!), intractable to run locally, not resistant to noise etc. the model learns an efficient representation of this over the first 5 conv layers
- 4 main claims: causality, generality, purity, family

### details

- vis and data analysis reveals neurons not polysemantic. looking at 3b:379 preactivation logprob plot, mean -200, 11% fires (since negative zeroed by relu), exponential graph. key notes here:
  - exponential over gaussian, long tail
  - random dataset quilt of samples makes sense, mean makes sense since its like non curving (not positive or negative reflection of searched curve)
  - verified by linear attribution coming from 3a layer to show what types of image caused 3b379 to fire
- human labeling of 800 images underperforms network curve detecting. superhuman here, especially on subtle curves
- mean expected value shows neuron detects primarily curves or slight curves, even though the frequency of nonweighted activations is negligible
- further experiments in joint tuning curves by rotating image and compare to family of neurons, activation bump shifts as we rotate
- synthetic curve activation works similarly, and activates at extreme values (25 sigma the dataset). invariant to fill and color
  - angles cause problems, especially at sharper degrees, which makes sense

radial tuning curves

- positive activations over 360 degrees, wrap around circle. render multiple neurons on same circle to vis how families work
- comparing 3b to conv2d2 we see much more pure radials, where layer 2 has echoes showing its not a pure curve detector. 3a still a little goofy
  - 4a goes too hard in the paint and overadjusts, starts becoming like "3d circle at an angle like a top of a cup" detectors

curve detectors as its own algorithm

- efficient curve extraction in out of domain images, eg highlighting blood vessels
- combing is a visual artifact; occurs across models and datasets. speculated to be either a) byproduct of many real world curve examples having combing lines, eg clocks and tires, or b) contrast lines perpindicular to "guide" detection or c) just an artifact of some natural way to implement curve detectors and not contributing to quality
  - also happens in actual monkey visual cortex lol

## Feature Visualization

visualization by optimization

- start with noise, optimize with derivates to generate a maximally exciting image
- reflects real images, at times can bring light to exact what is being detected (eg building roof vs sky?)
- can also optimize for diversity, ie have 4 different outputs maximally "diverse" from each other yet still jointly optimizing the activation. reveals multiple things the neuron detects
  - pretty interesting, lots of examples that subvert expectations
- individual neurons are tricky then, can we look at something else?
  - work in activation space, each neuron activation is a vector -> vector space. get word2vec like properties on neuron linear combinations
  - meaningful directions in this space is shaky. can also interpolate between neurons which is interesting
- directly optimizing doesnt really work actually, produces nn illusions, weird responses to noise etc
  - think adversarial examples
  - so we regularize!
  - spectrum of no reg -> freq penalty -> transformation robustness -> learned prior -> dataset examples
- or we can precondition the gradient itself
  - work in the fourier basis as a transform space, with frequences scaled -> decorrelated space

## Going Deeper With Convolutions

### quick / architecture notes

- efficient modules to reduce parameter count from previous ILSVRC challenges, and also work in blocks of designed / optimized layers
- follows network in network ideology, using 1x1 convs as dim-reduction (in exchange for more channels), then larger convs
- sparsity at the filter level, but dense matmuls to take advantage of hardware regime
- module: 1x1, 3x3, 5x5 conv, 3x3 max pool. another 1x1 before 3 and 5, after pool
- entire network is 2 conv layers, then 9 inception modules; with two early leaving pseudo classifications to help in training. all classifiers are a conv, 2x FC, softmax and out

## Naturally Occurring Equivariance in Neural Networks

- recall: equivariance is presence of similar detectors, flipped, rotated, scale, hue etc. contrast with invariance. circuit motif
  - perspective particularly interesting
- equivariant circuits in 3 varieties: i->e, e->i, e->e
  - i->e eg high low full neuron to half half, at 90 deg rotations
  - e->i as 90 deg contrasts -> color center circle / outer difference
    - b/w color circuit particularly interesting
  - e->e curve to curve, but also contrast to line detector
- equivariance from architecture; forced equivariant neurons learn very similar patterns to our natural equivariance. this is good! we don't need to do group theory!

## High Low Detectors

- synthetic tuning curves replicate again
- e->e supported
- NMF to seperate high and low components of detector, recovering contributing neurons (done forwards and backwards, works both ways)
  - resulting factors work on examples, and are invariant
- downstream used in boundary detectors, double boundary, texture, hourglass. logically reads off of weights. some other stuff too but boundaries the most important
  - not just edge detectors, which comes from this hi low background. these live in mixed4a
- universality holds: notably at ~same %age of network depth. NMF works too

## Curve Circuits

- aims to reverse engineer curve detectors, 50k params but a legible algorithm read off the weights
  - due to equivariance reducing complexity
- curve detector implemented with artificial ANN, reproducing behavior
- used downstream to build larger features; removal reduces accuracy of model as a whole by a few %

## Visualizing Weights

- weights meaningful but obfuscated
  - hard to ground in meaning at later layers (not just RGB channels), crazy dimensionality, direct connections maybe not whole source of meaning
- solutions:
  - NMF down to RGB
    - not much network wide context, but good sanity check on structure. eg weight banding occuring in last few layers of models w global avg pooling
  
### contextualization

- 2d conv layer has [x pos, y pos, input chan, output chan] dim tensor weight. fix output and input to vis in 2d, show those as feature vis at neuron level. can do grid of possible input outputs, as in article
- indirect interactions: eg resnets. work with expanded weights (basically just multiply them out). can be used to deal with bottleneck layers (eg dim reduction with the 1x1 convs) that result in lots of polysemantic neurons

## Branch Specialization

- veins to organ systems: specialization when the NN splits into branches
- first seen in AlexNet first layer, which branches for GPU efficiency but ends up specializing on BW and color gabor filters (!!)
- happens in other models, in later layers, in residual branches, even in vanilla conv nets
  - particularly salient in inception bc "inception blocks" are just 4 branches
  - for resnets, we reinterpret the connections as just long distance parallelism, streaming together into something with high polysemanticity
- why does this happen?
  - positive feedback loop model, each part of the branch incentivized to form relevant features to eachother to reduce loss
- later layers
  - (look at alexnet) harder to study, needs feature vis. but reveals more subtle connection, lots of smaller clusters. cant conclusively say we arent just seeing noise here
  - in inception, easier to look at since 5x5 conv has largest conv size and is smallest branch. 3a, 3b, 4a all specialize (see details on article)
    - this is truly specialization, since clustering is highly unlikely if uniform. eg all 9 BW detectors in 5x5 for 3a, even tho it has 32 of 256 neurons. 10e-8 odds. all 30 curve detectors in 5x5 3b, 96/480 total, 10e-20. conv size may be confounding tho
- consistency
  - occurs repeatedly cross architecture and task
    - specially the detector BW color break: retraining alexnet on places, still works. train other archs with similar early branches
  - why? these things happen anyway without branches. maybe branches are just surfacing structure that happens anyway
    - take SVD on weights branched vs unbranched, first component is color. second is freq, and if we add more branches to let freq surface, it actually segments that too (!)

## Weight Banding

- last layer of imagenet convnet with global avg pooling has strong horizontal line motif across all or almost all weights
- horizontally invariant, vertically changing. preserves vertical spatial info lost in pooling
- trained a simplified arch to do ablations. first off rotation by 90 deg rotates weights, sanity check
- avg pooling only on x axis makes banding on last layer (5b) go away, but reappears on penultimate layer 5a
- approaches where it persisted include: attention layer (!), mask, split + fc + concat, global max pool and then fc
- works on diff architectures, 90 deg trick too

## Multimodal Neurons in ANNs

- concept: real life neurons respond to person, sketch, idea. do artifical neurons? tldr yes to person, sketch, kinda on text
  - with weaker firing with similar concepts, eg trump neuron also fires for pence (more weakly)
  - topic neurons too. or color neurons (including images of the words banana lemon yellow, not just the color)
- all in CLIP. resnet + transformer for text. zero shot classification (ie not given class probs, just figure it out) from OAI in 2021. image text pairs with contrastive loss. studied midsized model RN50-x4
- language side of the model needs to learn word embeddings with abstract topic features, and or vision side. so we can directly examine this (and potentially reveal bias, eg a "terrorism / islam" neuron)
  - note fundamentally different than what we've been previously looking at, evidenced by typography attack. actually text fucks up the model
- look at neurons in final conv layer, majority interpretable. see article for tour of subjects
  - prompt between "any / text / face / architecture / indoor / logo / nature / pose", all makes sense
  - some polysemanticity
  - interestingly, some are concepts, some are gerund, some are political figures. gay neuron, toxicity neuron. potentially useful in that regard, but may fire on an image with an antithetical caption
  - surprisingly (or not surprisingly) many abstract concepts in culture, ie historical figures (of course dataset is also explanatory here)
- semantic similarity: surprise neuron to soyface, or even just eyes when mouth is covered, also words like OMG. repeats across themes
- regions and regional concepts bundled
  - subregional too, represents west east central south africa even though it was trained on english language data
- rmk: neurons arrange themselves into a hierarchy that very approximately follows the imagenet hierarchy. explains why a shitbox version of an imagenet classifier does actually quite well (relatively)
- can create cross img text logit. and then given a neuron activation, find maximal text response. these check out
- can also go other way: large list of emotion words, figure out which linear comb of restricted emotion neurons correspond. e.g. bored = grumpy + relaxed
  - physical objects can also be used to code emotions, e.g. lightning for power. or funnily enough 2000-2012 is a period the language side thinks is embarrassing so the vision side uses it to make our visualization
  - spurious correlations: e.g. confident is largely made of "overweight"
  - overall can create feeling atlas by using NMF to arrange and color emotions. mirrors feeling wheel
- section on typographic attacks. kinda non interesting today

## A Mathematical Framework for Transformer Circuits

- focus on two layers or less, only attention blocks
- high level concepts:
  - attention heads individual operations, outputting result into residual stream
  - attention only models can be written as sum of interpretable end to end functions
  - lots of linear structure
  - attention heads have two circuits, QK and OV, K Q W vecs are intermediate results of low rank matrices
  - all components of transformer communicate by writing to different subspaces of residual stream
  
### transformer overview

- again, look at only attention. FC layers are 1) not novel and 2) frankly harder to interpret, goal of future work. also ignore bias terms, and layernorm for simplicity. focus on autoregressive decoder only
- residual stream:
  - deeply linear, no activations
  - "virtual weights", eg. distant layers can be expressed in terms of "weights" which are lin combs of intermediate layers
  - stream is just a high dim vector space, layers can communicate using subspaces. information sticks around until deleted, and embeddings in and out only act on small subset of dims, so the rest are basically just a memory channel. attention heads also only act on small subsets
  - contrast with FF layers in transformer blocks, stream has to feed in and out of many more neurons than it has dims, causing bottleneck. also implies massive superposition happening
- note transformer heads independently additive
- 

## transformers thread TODO: o

## Toy Models of Superposition

### intro

- we want neurons to be interpretable: ie represent certain feature, or property of image, etc
- not always true; sometimes easy to find this (faces in convnet), sometimes impossible. why?
- models represent more features than dimensions using superposition, more vectors than orthogonal basis (plus interference)
- used to store additional features, but can also perform computation while in this state -> NNs we train simulate theoretical, higher dim sparse networks
  
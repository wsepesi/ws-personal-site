---
title: Mech Interp Mega Notes Doc
date: 2023-10-17
short: true
---

## Intro to Circuits

here[https://distill.pub/2020/circuits/zoom-in/]
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

### architecture notes

- 

## Toy Models of Superposition

### intro

- we want neurons to be interpretable: ie represent certain feature, or property of image, etc
- not always true; sometimes easy to find this (faces in convnet), sometimes impossible. why?
- models represent more features than dimensions using superposition, more vectors than orthogonal basis (plus interference)
- used to store additional features, but can also perform computation while in this state -> NNs we train simulate theoretical, higher dim sparse networks
  
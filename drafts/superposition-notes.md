---
title: Mech Interp Mega Notes Doc
date: 2023-10-17
short: true
---

## Intro to Circuits

here[https://distill.pub/2020/circuits/zoom-in/]
three claims:

- features are fundamental building block of NNs
- features are connected by weights, forming circuits
- these circuits are found in analogous forms across models and tasks

### features

- this isnt actually proven as of 2020, eg all the "early layers are curve detectors, late layers are face detectors" stuff had legit pushback

## Toy Models of Superposition

### intro

- we want neurons to be interpretable: ie represent certain feature, or property of image, etc
- not always true; sometimes easy to find this (faces in convnet), sometimes impossible. why?
- models represent more features than dimensions using superposition, more vectors than orthogonal basis (plus interference)
- used to store additional features, but can also perform computation while in this state -> NNs we train simulate theoretical, higher dim sparse networks
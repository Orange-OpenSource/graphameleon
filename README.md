# Graphameleon Web extension

**Graphameleon** is a Web Browser Extension which collects and semantizes Web navigation traces.

**UNDER CONSTRUCTION, thanks for your patience!**

Following research on the [NORIA-O](https://github.com/Orange-OpenSource/noria-ontology) and [DynaGraph](https://github.com/Orange-OpenSource/dynagraph) projects, the Graphameleon Web extension brings visualization and recording of Web navigation traces at the browser level.
Then, leveraging knowledge graph representations, to perform User and Entity Behavior Analytics (UEBA) and Anomaly Detection (AD).

The extension incorporates an internal semantical mapping module that relies on the [RMLmapper](https://rml.io/) library to construct a RDF knowledge graph during navigation.
Additionally, it utilizes the [React-Force-Graph](https://github.com/vasturiano/react-force-graph) visualization library, allowing users to view their navigation traces in a 3D representation of the knowledge graph.

If you use this software in a scientific publication, please cite:

> Benjamin Stach, Lionel Tailhardat, Yoan Chabot, and Raphaël Troncy. 2023.
> Web Navigation Capture for Anomaly Detection: a Web Browser-Level Approach Leveraging Knowledge Graphs.

BibTex format:

```bibtex
@inproceedings{graphemeleon-2023,
  title = {{Web Navigation Capture for Anomaly Detection: a Web Browser-Level Approach Leveraging Knowledge Graphs}},
  author = {{Benjamin Stach} and {Lionel Tailhardat} and {Yoan Chabot} and {Rapha\"el Troncy}},
  year = {2023}
}
```

Repository structure :

```tree
📁 graphameleon
└───...
```

## License

[BSD-4-Clause](LICENSE.txt)

## Copyright

Copyright (c) 2022-2023, [Orange](https://hellofuture.orange.com/). All rights reserved.

## Maintainer

* [Benjamin STACH](mailto:benjaminstach.pro@gmail.com)
* [Lionel TAILHARDAT](lionel.tailhardat@orange.com)
* [Yoan CHABOT](yoan.chabot@orange.com)
* [Raphaël TRONCY](raphael.troncy@eurecom.fr)

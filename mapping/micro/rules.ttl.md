

   
# Graphameleon - micro
   
   
**Version:**

* 0.1.0
   
**Authors**:

    
* Benjamin STACH
   
    
* Lionel TAILHARDAT
   

**Mapping file:**
rules.ttl

**Description**: RML mapping for data collection using Graphameleon in micro mode.


**Date created**: 01-10-2023

**License**:
* https://github.com/Orange-OpenSource/graphameleon/blob/main/LICENSE.txt (v0.1.0)


------


## **Namespaces used in the document**

| Prefix       |               IRI.                   |
| :----------- | :----------------------------------  |
| rml     | http://semweb.mmlab.be/ns/rml# |
| map     | http://mapping.example.com/ |
| core     | https://ontology.unifiedcyberontology.org/uco/core# |
| types     | https://ontology.unifiedcyberontology.org/uco/types# |
| v     | http://rdf.data-vocabulary.org/# |
| grel     | http://users.ugent.be/~bjdmeest/function/grel.ttl# |
| ucoact     | https://ontology.unifiedcyberontology.org/uco/action# |
| ucobs     | https://ontology.unifiedcyberontology.org/uco/observable# |
| dct     | http://purl.org/dc/terms/ |
| schema1     | http://schema.org/ |
| ql     | http://semweb.mmlab.be/ns/ql# |
| rr     | http://www.w3.org/ns/r2rml# |
| sd     | http://www.w3.org/ns/sparql-service-description# |
| void1     | http://rdfs.org/ns/void#exampleResource |
| gpl     | http://graphameleon.com# |



## Mappings
>[!NOTE]
>1. **Source**: This is where you define the source of your data, which can be a relational database, a CSV file, or any other structured data source. The logical source specifies the location and format of your source data.
>2. **Subject**: This part of the mapping defines how the data from the logical source will be used to create RDF subjects, typically using templates and column mappings.
>3. **Predicate Object**: These describe how the data from the logical source will be used to generate RDF triples, indicating relationships between subjects and objects.
>4. **JoinCondition**: is used to specify the conditions under which two data sources or tables should be joined when creating RDF triples through mappings.


## map_id_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#HTTP_CON_{id}
``` 
- **Predicate Object**

| Predicate | Object |
|:----------|:-------|
| a | ucobs:httpConnectionFacet |
| ucobs:requestMethod | {method} |
| core:startTime | {start_time} |
| core:endTime | {end_time} |
| ucobs:hasFacet | http://graphameleon.com#URL_{url_iri} |
- **RDF triples**
```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%
flowchart LR
S["http://graphameleon.com#HTTP_CON_{id}"] -->|"a"| object1("ucobs:httpConnectionFacet")
S["http://graphameleon.com#HTTP_CON_{id}"] -->|"ucobs:requestMethod"| object2("{method}")
S["http://graphameleon.com#HTTP_CON_{id}"] -->|"core:startTime"| object3("{start_time}")
S["http://graphameleon.com#HTTP_CON_{id}"] -->|"core:endTime"| object4("{end_time}")
S["http://graphameleon.com#HTTP_CON_{id}"] -->|"ucobs:hasFacet"| object5("http://graphameleon.com#URL_{url_iri}")
    
``` 
## map_ip_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#IP_{ip_iri}
``` 
- **Predicate Object**

| Predicate | Object |
|:----------|:-------|
| a | ucobs:IPAddressFacet |
| ucobs:addressValue | {ip} |
- **RDF triples**
```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%
flowchart LR
S["http://graphameleon.com#IP_{ip_iri}"] -->|"a"| object1("ucobs:IPAddressFacet")
S["http://graphameleon.com#IP_{ip_iri}"] -->|"ucobs:addressValue"| object2("{ip}")
    
``` 
## map_host_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#DOMAIN_{host_iri}
``` 
- **Predicate Object**

| Predicate | Object |
|:----------|:-------|
| a | ucobs:DomainNameFacet |
| ucobs:addressValue | {host} |
- **RDF triples**
```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%
flowchart LR
S["http://graphameleon.com#DOMAIN_{host_iri}"] -->|"a"| object1("ucobs:DomainNameFacet")
S["http://graphameleon.com#DOMAIN_{host_iri}"] -->|"ucobs:addressValue"| object2("{host}")
    
``` 
## map_url_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#URL_{url_iri}
``` 
- **Predicate Object**

| Predicate | Object |
|:----------|:-------|
| a | ucobs:URLFacet |
| ucobs:fullValue | {url} |
- **RDF triples**
```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%
flowchart LR
S["http://graphameleon.com#URL_{url_iri}"] -->|"a"| object1("ucobs:URLFacet")
S["http://graphameleon.com#URL_{url_iri}"] -->|"ucobs:fullValue"| object2("{url}")
    
``` 


- **Join Condition**:
    - Source triples map: **map_url_000**
    - Target triples map: **map_ip_000**
    - Function: **equal(ip, ip)**

```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%

flowchart LR
S1["http://graphameleon.com#URL_{url_iri}"] -->|"ucobs:host"| object1("http://graphameleon.com#IP_{ip_iri}")

``` 


- **Join Condition**:
    - Source triples map: **map_url_000**
    - Target triples map: **map_host_000**
    - Function: **equal(host, host)**

```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%

flowchart LR
S2["http://graphameleon.com#URL_{url_iri}"] -->|"ucobs:host"| object2("http://graphameleon.com#DOMAIN_{host_iri}")

``` 

 



----

**This documentation was generated using**  *[RMLdoc](https://oeg-upm.github.io/rmldoc/)*.



   
# Graphameleon - macro
   
   
**Version:**

* 2.1.0
   
**Authors**:

    
* Benjamin STACH
   
    
* Lionel TAILHARDAT
   

**Mapping file:**
rules.ttl

**Description**: RML mapping for data collection using Graphameleon in macro mode.


**Date created**: 14-03-2024

**License**:
* https://github.com/Orange-OpenSource/graphameleon/blob/main/LICENSE.txt (v2.1.0)


------


## **Namespaces used in the document**

| Prefix       |               IRI.                   |
| :----------- | :----------------------------------  |
| rml     | http://semweb.mmlab.be/ns/rml# |
| ucoact     | https://ontology.unifiedcyberontology.org/uco/action# |
| gpl     | http://graphameleon.com# |
| types     | https://ontology.unifiedcyberontology.org/uco/types# |
| rr     | http://www.w3.org/ns/r2rml# |
| dct     | http://purl.org/dc/terms/ |
| map     | http://mapping.example.com/ |
| ucobs     | https://ontology.unifiedcyberontology.org/uco/observable# |
| core     | https://ontology.unifiedcyberontology.org/uco/core# |
| v     | http://rdf.data-vocabulary.org/# |
| void1     | http://rdfs.org/ns/void#exampleResource |
| sd     | http://www.w3.org/ns/sparql-service-description# |
| schema1     | http://schema.org/ |
| ql     | http://semweb.mmlab.be/ns/ql# |



## Mappings
>[!NOTE]
>1. **Source**: This is where you define the source of your data, which can be a relational database, a CSV file, or any other structured data source. The logical source specifies the location and format of your source data.
>2. **Subject**: This part of the mapping defines how the data from the logical source will be used to create RDF subjects, typically using templates and column mappings.
>3. **Predicate Object**: These describe how the data from the logical source will be used to generate RDF triples, indicating relationships between subjects and objects.
>4. **JoinCondition**: is used to specify the conditions under which two data sources or tables should be joined when creating RDF triples through mappings.


## map_request_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#TRACE_{id}
``` 
- **Predicate Object**

| Predicate | Object |
|:----------|:-------|
| a | ucoact:ObservableAction |
| core:value | {action_id} |
| core:objectCreatedTime | {stime} |
| core:tag | {type} |
| types:threadPreviousItem | http://graphameleon.com#TRACE_{previous} |
| ucobs:object | http://graphameleon.com#HTTPCON_{id} |
- **RDF triples**
```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%
flowchart LR
S["http://graphameleon.com#TRACE_{id}"] -->|"a"| object1("ucoact:ObservableAction")
S["http://graphameleon.com#TRACE_{id}"] -->|"core:value"| object2("{action_id}")
S["http://graphameleon.com#TRACE_{id}"] -->|"core:objectCreatedTime"| object3("{stime}")
S["http://graphameleon.com#TRACE_{id}"] -->|"core:tag"| object4("{type}")
S["http://graphameleon.com#TRACE_{id}"] -->|"types:threadPreviousItem"| object5("http://graphameleon.com#TRACE_{previous}")
S["http://graphameleon.com#TRACE_{id}"] -->|"ucobs:object"| object6("http://graphameleon.com#HTTPCON_{id}")
    
``` 
## map_http_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#HTTPCON_{id}
``` 
- **Predicate Object**

| Predicate | Object |
|:----------|:-------|
| a | ucobs:HTTPConnectionFacet |
| ucobs:startTime | {stime} |
| ucobs:endTime | {etime} |
| core:tag | {dest} |
| core:tag | {site} |
| core:tag | {user} |
| core:tag | {mode} |
| ucobs:hasFacet | http://graphameleon.com#URL_{url_id} |
- **RDF triples**
```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%
flowchart LR
S["http://graphameleon.com#HTTPCON_{id}"] -->|"a"| object1("ucobs:HTTPConnectionFacet")
S["http://graphameleon.com#HTTPCON_{id}"] -->|"ucobs:startTime"| object2("{stime}")
S["http://graphameleon.com#HTTPCON_{id}"] -->|"ucobs:endTime"| object3("{etime}")
S["http://graphameleon.com#HTTPCON_{id}"] -->|"core:tag"| object4("{dest}")
S["http://graphameleon.com#HTTPCON_{id}"] -->|"core:tag"| object5("{site}")
S["http://graphameleon.com#HTTPCON_{id}"] -->|"core:tag"| object6("{user}")
S["http://graphameleon.com#HTTPCON_{id}"] -->|"core:tag"| object7("{mode}")
S["http://graphameleon.com#HTTPCON_{id}"] -->|"ucobs:hasFacet"| object8("http://graphameleon.com#URL_{url_id}")
    
``` 
## map_interaction_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#TRACE_{id}
``` 
- **Predicate Object**

| Predicate | Object |
|:----------|:-------|
| a | ucoact:ObservableAction |
| core:value | {action_id} |
| core:createdBy | {ua} |
| core:objectCreatedTime | {stime} |
| core:tag | {type} |
| types:threadPreviousItem | http://graphameleon.com#TRACE_{previous} |
| ucobs:location | http://graphameleon.com#URL_{url_id} |
- **RDF triples**
```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%
flowchart LR
S["http://graphameleon.com#TRACE_{id}"] -->|"a"| object1("ucoact:ObservableAction")
S["http://graphameleon.com#TRACE_{id}"] -->|"core:value"| object2("{action_id}")
S["http://graphameleon.com#TRACE_{id}"] -->|"core:createdBy"| object3("{ua}")
S["http://graphameleon.com#TRACE_{id}"] -->|"core:objectCreatedTime"| object4("{stime}")
S["http://graphameleon.com#TRACE_{id}"] -->|"core:tag"| object5("{type}")
S["http://graphameleon.com#TRACE_{id}"] -->|"types:threadPreviousItem"| object6("http://graphameleon.com#TRACE_{previous}")
S["http://graphameleon.com#TRACE_{id}"] -->|"ucobs:location"| object7("http://graphameleon.com#URL_{url_id}")
    
``` 
## map_backlink_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#TRACE_{previous}
``` 
- **Predicate Object**

| Predicate | Object |
|:----------|:-------|
| types:threadNextItem | http://graphameleon.com#TRACE_{id} |
- **RDF triples**
```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%
flowchart LR
S["http://graphameleon.com#TRACE_{previous}"] -->|"types:threadNextItem"| object1("http://graphameleon.com#TRACE_{id}")
    
``` 
## map_base_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#URL_{url_id}
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
S["http://graphameleon.com#URL_{url_id}"] -->|"a"| object1("ucobs:URLFacet")
S["http://graphameleon.com#URL_{url_id}"] -->|"ucobs:fullValue"| object2("{url}")
    
``` 
## map_ip_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#IP_{ip_id}
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
S["http://graphameleon.com#IP_{ip_id}"] -->|"a"| object1("ucobs:IPAddressFacet")
S["http://graphameleon.com#IP_{ip_id}"] -->|"ucobs:addressValue"| object2("{ip}")
    
``` 
## map_url_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#URL_{url_id}
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
S["http://graphameleon.com#URL_{url_id}"] -->|"a"| object1("ucobs:URLFacet")
S["http://graphameleon.com#URL_{url_id}"] -->|"ucobs:fullValue"| object2("{url}")
    
``` 


- **Join Condition**:
    - Source triples map: **map_url_000**
    - Target triples map: **map_ip_000**
    - Function: **equal(ip, ip)**

```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%

flowchart LR
S1["http://graphameleon.com#URL_{url_id}"] -->|"ucobs:host"| object1("http://graphameleon.com#IP_{ip_id}")

``` 


- **Join Condition**:
    - Source triples map: **map_url_000**
    - Target triples map: **map_domain_000**
    - Function: **equal(host, host)**

```mermaid
%%{ init : { "theme" : "base", "flowchart" : { "curve" : "linear" }}}%%

flowchart LR
S2["http://graphameleon.com#URL_{url_id}"] -->|"ucobs:host"| object2("http://graphameleon.com#DOMAIN_{host_id}")

``` 

 ## map_domain_000
- **Source**

```bash
data.json
``` 
- **Subject**
```bash
http://graphameleon.com#DOMAIN_{host_id}
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
S["http://graphameleon.com#DOMAIN_{host_id}"] -->|"a"| object1("ucobs:DomainNameFacet")
S["http://graphameleon.com#DOMAIN_{host_id}"] -->|"ucobs:addressValue"| object2("{host}")
    
``` 




----

**This documentation was generated using**  *[RMLdoc](https://oeg-upm.github.io/rmldoc/)*.

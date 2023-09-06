/*
 * Copyright (c) 2022-2023 Orange. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 *     1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *     2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *     3. All advertising materials mentioning features or use of this software must display the following acknowledgement:
 *     This product includes software developed by Orange.
 *     4. Neither the name of Orange nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Orange "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Orange BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
IMPORTANT:

Here are the definitions of the default semantical mapping rules (RML).
Because Web extensions are unable to internally load files, we store the file content as raw strings.
*/

const micro = `
@prefix rr: <http://www.w3.org/ns/r2rml#> .
@prefix rml: <http://semweb.mmlab.be/ns/rml#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix ql: <http://semweb.mmlab.be/ns/ql#> .
@prefix map: <http://mapping.example.com/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix sd: <http://www.w3.org/ns/sparql-service-description#> .
@prefix gpl: <http://graphameleon.com#> .
@prefix core: <https://ontology.unifiedcyberontology.org/uco/core#> .
@prefix ucoact: <https://ontology.unifiedcyberontology.org/uco/action#> .
@prefix ucobs: <https://ontology.unifiedcyberontology.org/uco/observable#> .
@prefix types: <https://ontology.unifiedcyberontology.org/uco/types#> .

map:jc_000 rr:child "ip" ;
	rr:parent "ip" .

map:jc_001 rr:child "host" ;
	rr:parent "host" .

map:map_domain_000 rml:logicalSource map:source_003 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "domain" ;
	rr:predicateObjectMap map:pom_014, map:pom_015 ;
	rr:subjectMap map:s_003 .

map:map_http_000 rml:logicalSource map:source_000 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "http" ;
	rr:predicateObjectMap map:pom_000, map:pom_001, map:pom_002, map:pom_003, map:pom_004, map:pom_005, map:pom_006, map:pom_007 ;
	rr:subjectMap map:s_000 .

map:map_ip_000 rml:logicalSource map:source_002 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "ip" ;
	rr:predicateObjectMap map:pom_012, map:pom_013 ;
	rr:subjectMap map:s_002 .

map:map_url_000 rml:logicalSource map:source_001 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "url" ;
	rr:predicateObjectMap map:pom_008, map:pom_009, map:pom_010, map:pom_011 ;
	rr:subjectMap map:s_001 .

map:om_000 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/observable#HTTPConnectionFacet" ;
	rr:termType rr:IRI .

map:om_001 rml:reference "stime" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_002 rml:reference "etime" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_003 rml:reference "dest" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_004 rml:reference "site" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_005 rml:reference "user" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_006 rml:reference "mode" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_007 rdf:type rr:ObjectMap ;
	rr:template "http://graphameleon.com#URL_{url_id}" ;
	rr:termType rr:IRI .

map:om_008 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/observable#URLFacet" ;
	rr:termType rr:IRI .

map:om_009 rml:reference "url" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_010 rdf:type rr:ObjectMap ;
	rr:joinCondition map:jc_000 ;
	rr:parentTriplesMap map:map_ip_000 .

map:om_011 rdf:type rr:ObjectMap ;
	rr:joinCondition map:jc_001 ;
	rr:parentTriplesMap map:map_domain_000 .

map:om_012 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/observable#IPAddressFacet" ;
	rr:termType rr:IRI .

map:om_013 rml:reference "ip" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_014 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/observable#DomainNameFacet" ;
	rr:termType rr:IRI .

map:om_015 rml:reference "host" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:pm_000 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_001 rdf:type rr:PredicateMap ;
	rr:constant ucobs:startTime .

map:pm_002 rdf:type rr:PredicateMap ;
	rr:constant ucobs:endTime .

map:pm_003 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_004 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_005 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_006 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_007 rdf:type rr:PredicateMap ;
	rr:constant ucobs:hasFacet .

map:pm_008 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_009 rdf:type rr:PredicateMap ;
	rr:constant ucobs:fullValue .

map:pm_010 rdf:type rr:PredicateMap ;
	rr:constant ucobs:host .

map:pm_011 rdf:type rr:PredicateMap ;
	rr:constant ucobs:host .

map:pm_012 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_013 rdf:type rr:PredicateMap ;
	rr:constant ucobs:addressValue .

map:pm_014 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_015 rdf:type rr:PredicateMap ;
	rr:constant ucobs:addressValue .

map:pom_000 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_000 ;
	rr:predicateMap map:pm_000 .

map:pom_001 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_001 ;
	rr:predicateMap map:pm_001 .

map:pom_002 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_002 ;
	rr:predicateMap map:pm_002 .

map:pom_003 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_003 ;
	rr:predicateMap map:pm_003 .

map:pom_004 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_004 ;
	rr:predicateMap map:pm_004 .

map:pom_005 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_005 ;
	rr:predicateMap map:pm_005 .

map:pom_006 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_006 ;
	rr:predicateMap map:pm_006 .

map:pom_007 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_007 ;
	rr:predicateMap map:pm_007 .

map:pom_008 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_008 ;
	rr:predicateMap map:pm_008 .

map:pom_009 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_009 ;
	rr:predicateMap map:pm_009 .

map:pom_010 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_010 ;
	rr:predicateMap map:pm_010 .

map:pom_011 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_011 ;
	rr:predicateMap map:pm_011 .

map:pom_012 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_012 ;
	rr:predicateMap map:pm_012 .

map:pom_013 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_013 ;
	rr:predicateMap map:pm_013 .

map:pom_014 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_014 ;
	rr:predicateMap map:pm_014 .

map:pom_015 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_015 ;
	rr:predicateMap map:pm_015 .

map:rules_000 <http://rdfs.org/ns/void#exampleResource> map:map_domain_000, map:map_http_000, map:map_ip_000, map:map_url_000 ;
	rdf:type <http://rdfs.org/ns/void#Dataset> .

map:s_000 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#HTTPCON_{id}" .

map:s_001 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#URL_{url_id}" .

map:s_002 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#IP_{ip_id}" .

map:s_003 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#DOMAIN_{host_id}" .

map:source_000 rml:iterator "$.request[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_001 rml:iterator "$.request[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_002 rml:iterator "$.request[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_003 rml:iterator "$.request[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .


`

const macro = `
@prefix rr: <http://www.w3.org/ns/r2rml#> .
@prefix rml: <http://semweb.mmlab.be/ns/rml#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix ql: <http://semweb.mmlab.be/ns/ql#> .
@prefix map: <http://mapping.example.com/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix sd: <http://www.w3.org/ns/sparql-service-description#> .
@prefix gpl: <http://graphameleon.com#> .
@prefix core: <https://ontology.unifiedcyberontology.org/uco/core#> .
@prefix ucoact: <https://ontology.unifiedcyberontology.org/uco/action#> .
@prefix ucobs: <https://ontology.unifiedcyberontology.org/uco/observable#> .
@prefix types: <https://ontology.unifiedcyberontology.org/uco/types#> .

map:jc_000 rr:child "ip" ;
	rr:parent "ip" .

map:jc_001 rr:child "host" ;
	rr:parent "host" .

map:map_backlink_000 rml:logicalSource map:source_002 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "backlink" ;
	rr:predicateObjectMap map:pom_013 ;
	rr:subjectMap map:s_002 .

map:map_base_000 rml:logicalSource map:source_004 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "base" ;
	rr:predicateObjectMap map:pom_022, map:pom_023 ;
	rr:subjectMap map:s_004 .

map:map_domain_000 rml:logicalSource map:source_007 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "domain" ;
	rr:predicateObjectMap map:pom_030, map:pom_031 ;
	rr:subjectMap map:s_007 .

map:map_http_000 rml:logicalSource map:source_003 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "http" ;
	rr:predicateObjectMap map:pom_014, map:pom_015, map:pom_016, map:pom_017, map:pom_018, map:pom_019, map:pom_020, map:pom_021 ;
	rr:subjectMap map:s_003 .

map:map_interaction_000 rml:logicalSource map:source_000 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "interaction" ;
	rr:predicateObjectMap map:pom_000, map:pom_001, map:pom_002, map:pom_003, map:pom_004, map:pom_005, map:pom_006 ;
	rr:subjectMap map:s_000 .

map:map_ip_000 rml:logicalSource map:source_006 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "ip" ;
	rr:predicateObjectMap map:pom_028, map:pom_029 ;
	rr:subjectMap map:s_006 .

map:map_request_000 rml:logicalSource map:source_001 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "request" ;
	rr:predicateObjectMap map:pom_007, map:pom_008, map:pom_009, map:pom_010, map:pom_011, map:pom_012 ;
	rr:subjectMap map:s_001 .

map:map_url_000 rml:logicalSource map:source_005 ;
	rdf:type rr:TriplesMap ;
	rdfs:label "url" ;
	rr:predicateObjectMap map:pom_024, map:pom_025, map:pom_026, map:pom_027 ;
	rr:subjectMap map:s_005 .

map:om_000 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/action#ObservableAction" ;
	rr:termType rr:IRI .

map:om_001 rml:reference "action_id" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_002 rml:reference "ua" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_003 rml:reference "stime" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_004 rml:reference "type" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_005 rdf:type rr:ObjectMap ;
	rr:template "http://graphameleon.com#TRACE_{previous}" ;
	rr:termType rr:IRI .

map:om_006 rdf:type rr:ObjectMap ;
	rr:template "http://graphameleon.com#URL_{url_id}" ;
	rr:termType rr:IRI .

map:om_007 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/action#ObservableAction" ;
	rr:termType rr:IRI .

map:om_008 rml:reference "action_id" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_009 rml:reference "stime" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_010 rml:reference "type" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_011 rdf:type rr:ObjectMap ;
	rr:template "http://graphameleon.com#TRACE_{previous}" ;
	rr:termType rr:IRI .

map:om_012 rdf:type rr:ObjectMap ;
	rr:template "http://graphameleon.com#HTTPCON_{id}" ;
	rr:termType rr:IRI .

map:om_013 rdf:type rr:ObjectMap ;
	rr:template "http://graphameleon.com#TRACE_{id}" ;
	rr:termType rr:IRI .

map:om_014 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/observable#HTTPConnectionFacet" ;
	rr:termType rr:IRI .

map:om_015 rml:reference "stime" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_016 rml:reference "etime" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_017 rml:reference "dest" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_018 rml:reference "site" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_019 rml:reference "user" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_020 rml:reference "mode" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_021 rdf:type rr:ObjectMap ;
	rr:template "http://graphameleon.com#URL_{url_id}" ;
	rr:termType rr:IRI .

map:om_022 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/observable#URLFacet" ;
	rr:termType rr:IRI .

map:om_023 rml:reference "url" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_024 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/observable#URLFacet" ;
	rr:termType rr:IRI .

map:om_025 rml:reference "url" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_026 rdf:type rr:ObjectMap ;
	rr:joinCondition map:jc_000 ;
	rr:parentTriplesMap map:map_ip_000 .

map:om_027 rdf:type rr:ObjectMap ;
	rr:joinCondition map:jc_001 ;
	rr:parentTriplesMap map:map_domain_000 .

map:om_028 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/observable#IPAddressFacet" ;
	rr:termType rr:IRI .

map:om_029 rml:reference "ip" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:om_030 rdf:type rr:ObjectMap ;
	rr:constant "https://ontology.unifiedcyberontology.org/uco/observable#DomainNameFacet" ;
	rr:termType rr:IRI .

map:om_031 rml:reference "host" ;
	rdf:type rr:ObjectMap ;
	rr:termType rr:Literal .

map:pm_000 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_001 rdf:type rr:PredicateMap ;
	rr:constant core:value .

map:pm_002 rdf:type rr:PredicateMap ;
	rr:constant core:createdBy .

map:pm_003 rdf:type rr:PredicateMap ;
	rr:constant core:objectCreatedTime .

map:pm_004 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_005 rdf:type rr:PredicateMap ;
	rr:constant types:threadPreviousItem .

map:pm_006 rdf:type rr:PredicateMap ;
	rr:constant ucobs:location .

map:pm_007 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_008 rdf:type rr:PredicateMap ;
	rr:constant core:value .

map:pm_009 rdf:type rr:PredicateMap ;
	rr:constant core:objectCreatedTime .

map:pm_010 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_011 rdf:type rr:PredicateMap ;
	rr:constant types:threadPreviousItem .

map:pm_012 rdf:type rr:PredicateMap ;
	rr:constant ucobs:object .

map:pm_013 rdf:type rr:PredicateMap ;
	rr:constant types:threadNextItem .

map:pm_014 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_015 rdf:type rr:PredicateMap ;
	rr:constant ucobs:startTime .

map:pm_016 rdf:type rr:PredicateMap ;
	rr:constant ucobs:endTime .

map:pm_017 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_018 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_019 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_020 rdf:type rr:PredicateMap ;
	rr:constant core:tag .

map:pm_021 rdf:type rr:PredicateMap ;
	rr:constant ucobs:hasFacet .

map:pm_022 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_023 rdf:type rr:PredicateMap ;
	rr:constant ucobs:fullValue .

map:pm_024 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_025 rdf:type rr:PredicateMap ;
	rr:constant ucobs:fullValue .

map:pm_026 rdf:type rr:PredicateMap ;
	rr:constant ucobs:host .

map:pm_027 rdf:type rr:PredicateMap ;
	rr:constant ucobs:host .

map:pm_028 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_029 rdf:type rr:PredicateMap ;
	rr:constant ucobs:addressValue .

map:pm_030 rdf:type rr:PredicateMap ;
	rr:constant rdf:type .

map:pm_031 rdf:type rr:PredicateMap ;
	rr:constant ucobs:addressValue .

map:pom_000 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_000 ;
	rr:predicateMap map:pm_000 .

map:pom_001 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_001 ;
	rr:predicateMap map:pm_001 .

map:pom_002 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_002 ;
	rr:predicateMap map:pm_002 .

map:pom_003 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_003 ;
	rr:predicateMap map:pm_003 .

map:pom_004 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_004 ;
	rr:predicateMap map:pm_004 .

map:pom_005 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_005 ;
	rr:predicateMap map:pm_005 .

map:pom_006 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_006 ;
	rr:predicateMap map:pm_006 .

map:pom_007 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_007 ;
	rr:predicateMap map:pm_007 .

map:pom_008 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_008 ;
	rr:predicateMap map:pm_008 .

map:pom_009 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_009 ;
	rr:predicateMap map:pm_009 .

map:pom_010 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_010 ;
	rr:predicateMap map:pm_010 .

map:pom_011 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_011 ;
	rr:predicateMap map:pm_011 .

map:pom_012 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_012 ;
	rr:predicateMap map:pm_012 .

map:pom_013 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_013 ;
	rr:predicateMap map:pm_013 .

map:pom_014 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_014 ;
	rr:predicateMap map:pm_014 .

map:pom_015 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_015 ;
	rr:predicateMap map:pm_015 .

map:pom_016 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_016 ;
	rr:predicateMap map:pm_016 .

map:pom_017 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_017 ;
	rr:predicateMap map:pm_017 .

map:pom_018 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_018 ;
	rr:predicateMap map:pm_018 .

map:pom_019 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_019 ;
	rr:predicateMap map:pm_019 .

map:pom_020 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_020 ;
	rr:predicateMap map:pm_020 .

map:pom_021 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_021 ;
	rr:predicateMap map:pm_021 .

map:pom_022 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_022 ;
	rr:predicateMap map:pm_022 .

map:pom_023 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_023 ;
	rr:predicateMap map:pm_023 .

map:pom_024 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_024 ;
	rr:predicateMap map:pm_024 .

map:pom_025 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_025 ;
	rr:predicateMap map:pm_025 .

map:pom_026 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_026 ;
	rr:predicateMap map:pm_026 .

map:pom_027 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_027 ;
	rr:predicateMap map:pm_027 .

map:pom_028 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_028 ;
	rr:predicateMap map:pm_028 .

map:pom_029 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_029 ;
	rr:predicateMap map:pm_029 .

map:pom_030 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_030 ;
	rr:predicateMap map:pm_030 .

map:pom_031 rdf:type rr:PredicateObjectMap ;
	rr:objectMap map:om_031 ;
	rr:predicateMap map:pm_031 .

map:rules_000 <http://rdfs.org/ns/void#exampleResource> map:map_backlink_000, map:map_base_000, map:map_domain_000, map:map_http_000, map:map_interaction_000, map:map_ip_000, map:map_request_000, map:map_url_000 ;
	rdf:type <http://rdfs.org/ns/void#Dataset> .

map:s_000 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#TRACE_{id}" .

map:s_001 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#TRACE_{id}" .

map:s_002 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#TRACE_{previous}" .

map:s_003 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#HTTPCON_{id}" .

map:s_004 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#URL_{url_id}" .

map:s_005 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#URL_{url_id}" .

map:s_006 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#IP_{ip_id}" .

map:s_007 rdf:type rr:SubjectMap ;
	rr:template "http://graphameleon.com#DOMAIN_{host_id}" .

map:source_000 rml:iterator "$.interaction[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_001 rml:iterator "$.request[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_002 rml:iterator "$[*][*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_003 rml:iterator "$.request[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_004 rml:iterator "$.interaction[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_005 rml:iterator "$.request[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_006 rml:iterator "$.request[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

map:source_007 rml:iterator "$.request[*]" ;
	rml:referenceFormulation ql:JSONPath ;
	rml:source "data.json" ;
	rdf:type rml:LogicalSource .

`
export { micro, macro }

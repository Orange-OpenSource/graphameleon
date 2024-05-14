# Copyright (c) 2022-2024 Orange. All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
#     1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
#     2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
#     3. All advertising materials mentioning features or use of this software must display the following acknowledgement:
#     This product includes software developed by Orange.
#     4. Neither the name of Orange nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY Orange "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Orange BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

SHELL := /bin/bash
ROOT_DIR := $(PWD)

SPARQL_ENGINE := ~/.local/jena/bin/sparql
DEMO_DATA := GPL_1715666564668.ttl

## makefile for the Graphameleon project -- demo folder
help:	## Show this help.
	# Get lines with double dash comments and display it
	@fgrep -h "## " $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/## //'

rq-count-class:	## Run local SPARQL query for class instances
	@echo -e "\033[35m > Run SPARQL query -- class instances\033[0m"
	@${SPARQL_ENGINE} --query rq/count-classInstances.sparql --data ${DEMO_DATA} --results text
	@echo -e "\033[35m > Done  \033[0m"

rq-get-endpoints:	## Run local SPARQL query for endpoint
	@echo -e "\033[35m > Run SPARQL query -- endpoints\033[0m"
	@${SPARQL_ENGINE} --query rq/get-navigation-endpoints.sparql --data ${DEMO_DATA} --results text
	@echo -e "\033[35m > Done  \033[0m"

rq-get-activity:	## Run local SPARQL query for activity
	@echo -e "\033[35m > Run SPARQL query -- activity\033[0m"
	@${SPARQL_ENGINE} --query rq/get-navigation-activity.sparql --data ${DEMO_DATA} --results text
	@echo -e "\033[35m > Done  \033[0m"

rq-get-connection-tags:	## Run local SPARQL query for connection
	@echo -e "\033[35m > Run SPARQL query -- connection tags\033[0m"
	@${SPARQL_ENGINE} --query rq/get-connection-tags.sparql --data ${DEMO_DATA} --results text
	@echo -e "\033[35m > Done  \033[0m"

rq: rq-count-class rq-get-endpoints rq-get-connection-tags rq-get-activity
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

## makefile for the Graphameleon project
help:	## Show this help.
	# Get lines with double dash comments and display it
	@fgrep -h "## " $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/## //'

lint-turtle:	## Check Turtle syntax
	@echo -e "\033[35m > Check turtle syntax\033[0m - requires TurtleValidator: npm install -g turtle-validator (see https://github.com/IDLabResearch/TurtleValidator)"
	@find mapping/ -type f -name *.ttl -printf "\n%f\n" -exec /usr/local/bin/ttl {} \;

	@echo -e "\033[35m > Done  \033[0m"

lint: lint-turtle

doc-rml:  ## Generate documentation for RML
	@echo -e "\033[35m > Generate documentation for RML \033[0m - requires RMLdoc: see https://github.com/oeg-upm/rmldoc"
	@find mapping/ -type f -name *.ttl \
		-printf "\n%f\n" \
		-exec rmldoc -i {} -o {}.md \;
	@echo -e "\033[35m > Done  \033[0m"

#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PipeLineStack } from "../lib/pipeline-stack";

const app = new cdk.App();
new PipeLineStack(app, "PipeLineStack");

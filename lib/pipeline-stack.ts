import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as codecommit from "aws-cdk-lib/aws-codecommit";
import * as awsPipeline from "aws-cdk-lib/pipelines";
import { PipelineStage } from "./pipeline-stages";

export class PipeLineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const repo = new codecommit.Repository(this, "PipeLineTest", {
      repositoryName: "PipeLineTest",
    });

    const pipeline = new awsPipeline.CodePipeline(this, "Pipeline", {
      pipelineName: "TestPipeLine",
      synth: new awsPipeline.CodeBuildStep("SynthStep", {
        input: awsPipeline.CodePipelineSource.codeCommit(repo, "main"),
        installCommands: [
          "npm install -g aws-cdk",
          "npm install -g npm@latest",
        ],
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const deploy = new PipelineStage(this, "Deploy");
    const deployStage = pipeline.addStage(deploy);
  }
}

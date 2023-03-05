import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambdaProps from "aws-cdk-lib/aws-lambda";
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";

import { Construct } from "constructs";

export class CdkPipeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeFn = new lambda.NodejsFunction(this, "PipeFn", {
      runtime: lambdaProps.Runtime.NODEJS_18_X,
      entry: "lambda/hello.ts",
      handler: "handler",
    });

    const pipeApi = new apigw.LambdaRestApi(this, "PipeEndPoint", {
      handler: pipeFn,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
      },
    });

    const items = pipeApi.root.addResource("items");
    items.addMethod("GET");
  }
}

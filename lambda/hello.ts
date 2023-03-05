import { APIGatewayEvent, Context } from "aws-lambda";

exports.handler = async function (event: APIGatewayEvent, context: Context) {
  const returnHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,PATCH",
    "Access-Control-Allow-Credentials": true,
  };
  return {
    statusCode: 200,
    headers: returnHeaders,
    body: JSON.stringify({ message: "hey how are you" }),
  };
};

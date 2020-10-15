import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import {Expiration} from "@aws-cdk/core";

export class CdkSampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'CdkSampleQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'CdkSampleTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));

    const bucket = new s3.Bucket(this, 'CdkSampleBucket',{
      bucketName : "test-kasai-2020-10-15",
      lifecycleRules : [
        {
          expiration : cdk.Duration.days(1)
        }
      ]
    })
  }
}

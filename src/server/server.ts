import { BlobService } from './file-uploader';
import { Database } from '../database/database';
import "reflect-metadata";
import { UserResolver } from '../resolvers/user.resolver';
import { GraphQLServer, Options } from 'graphql-yoga';
import { buildSchema, useContainer } from 'type-graphql';
import { ShareResolver } from "../resolvers/share.resolver";
import Container, { Inject } from "typedi";
import * as express from 'express';
import * as path from 'path';
import { NodeEnv } from '../types/common-types';

export class Server {
	private _graphQLServer: GraphQLServer | null;

	constructor(
		private readonly database: Database,
		private readonly fileUpload: BlobService
	) {
		this._graphQLServer = null;
	}

	public async start(endpoint: string, port: number): Promise<void> {
		const schema = await buildSchema({
			resolvers: [
				UserResolver,
				ShareResolver
			]
		});

		this._graphQLServer = new GraphQLServer({ schema });

		this._graphQLServer.express.use('/users/:userID/shares/:shareID/files', express.Router()
			.post(
				'*',
				this.fileUpload.getRawBodyParser(50 * 1024 * 1024),
				this.fileUpload.getUploadRoute()
			)
		);

		if (process.env.NODE_ENV === NodeEnv.Development) {
			this._graphQLServer.express.use(express.static(
				path.join(__dirname, '..', 'static', 'debug')
			));
		}

		const serverOptions: Options = {
			port,
			endpoint: endpoint,
			playground: '/playground'
		};

		await this._graphQLServer.start(serverOptions);
	}
}
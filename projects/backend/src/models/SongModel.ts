import { File } from './FileModel';
import { ObjectType, Field } from "type-graphql";
import { Share } from "./ShareModel";
import { Nullable } from '../types/Nullable';
import { ISong } from './interfaces/ISong';
import { ISongByShareDBResult } from '../database/schema/initial-schema';
import { plainToClass } from 'class-transformer';

@ObjectType({ description: 'This represents a song which can be part of a library or share' })
export class Song implements Nullable<ISong>{
	@Field()
	public readonly id!: string;

	@Field()
	public readonly title!: string;

	@Field(type => String, { nullable: true })
	public readonly suffix!: string | null;

	@Field(type => Number, { nullable: true })
	public readonly year!: number | null;

	@Field(type => Number, { nullable: true })
	public readonly bpm!: number | null;

	@Field(type => Number)
	public readonly dateLastEdit!: number;

	@Field(type => String, { nullable: true })
	public readonly releaseDate!: string | null;

	@Field()
	public readonly isRip!: boolean;

	@Field(type => [String])
	public readonly artists!: string[];

	@Field(type => [String])
	public readonly remixer!: string[];

	@Field(type => [String])
	public readonly featurings!: string[];

	@Field(type => String, { nullable: true })
	public readonly type!: string | null;

	@Field(type => [String])
	public readonly genres!: string[];

	@Field(type => String, { nullable: true })
	public readonly label!: string | null;

	@Field(() => Share)
	public readonly share!: Share;

	@Field()
	public readonly requiresUserAction!: boolean;

	@Field(() => File)
	public readonly file!: File;

	@Field()
	public readonly accessUrl!: string;

	public static fromDBResult(row: ISongByShareDBResult): Song {
		return plainToClass(
			Song,
			{
				id: row.id.toString(),
				title: row.title,
				suffix: row.suffix,
				year: row.year,
				bpm: row.bpm,
				dateLastEdit: row.date_last_edit.getTime(),
				releaseDate: row.release_date ? row.release_date.toString() : null,
				isRip: row.is_rip,
				artists: row.artists || [],
				remixer: row.remixer || [],
				featurings: row.featurings || [],
				type: row.type,
				genres: row.genres || [],
				label: row.label,
				requiresUserAction: row.requires_user_action,
				file: JSON.parse(row.file)
			}
		)
	}
}
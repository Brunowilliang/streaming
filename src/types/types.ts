/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Groups = "groups",
	Movies = "movies",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type GroupsRecord = {
	order?: number
	title?: string
	visible?: boolean
}

export type MoviesRecord = {
	group?: RecordIdString
	logo?: string
	title?: string
	url?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type GroupsResponse<Texpand = unknown> = Required<GroupsRecord> & BaseSystemFields<Texpand>
export type MoviesResponse<Texpand = unknown> = Required<MoviesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	groups: GroupsRecord
	movies: MoviesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	groups: GroupsResponse
	movies: MoviesResponse
	users: UsersResponse
}
import { relations } from 'drizzle-orm';
import {
	pgTable,
	pgEnum,
	pgSchema,
	AnyPgColumn,
	uniqueIndex,
	text,
	timestamp,
	index,
	foreignKey,
	integer,
	varchar,
	primaryKey
} from 'drizzle-orm/pg-core';

export const userGender = pgEnum('UserGender', ['M', 'F']);
export const creativeWorkType = pgEnum('CreativeWorkType', [
	'POST',
	'BLOG_POST',
	'DISCUSSION_FORUM',
	'DISCUSSION_FORUM_POST'
]);
export const creativeWorkStatus = pgEnum('CreativeWorkStatus', [
	'PUBLIC',
	'PRIVATE',
	'DELETED'
]);
export const languageTagType = pgEnum('LanguageTagType', [
	'IETF_BCP_47_STANDARD'
]);
export const role = pgEnum('Role', ['USER', 'AUTHOR', 'ADMIN']);

export const tag = pgTable(
	'Tag',
	{
		name: text('name').primaryKey().notNull()
	},
	(table) => {
		return {
			nameKey: uniqueIndex('Tag_name_key').on(table.name)
		};
	}
);

export const verificationToken = pgTable(
	'VerificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { precision: 3, mode: 'date' }).notNull()
	},
	(table) => {
		return {
			identifierTokenKey: uniqueIndex(
				'VerificationToken_identifier_token_key'
			).on(table.identifier, table.token),
			tokenKey: uniqueIndex('VerificationToken_token_key').on(table.token)
		};
	}
);

export const creativeWork = pgTable(
	'CreativeWork',
	{
		id: text('id').primaryKey().notNull(),
		authorId: text('authorId')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		status: creativeWorkStatus('status').default('PUBLIC').notNull(),
		type: creativeWorkType('type').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull()
	},
	(table) => {
		return {
			createdAtIdx: index('CreativeWork_createdAt_idx').on(table.createdAt)
		};
	}
);

export const tagStats = pgTable(
	'TagStats',
	{
		id: text('id').primaryKey().notNull(),
		tagName: text('tagName')
			.notNull()
			.references(() => tag.name, { onDelete: 'cascade', onUpdate: 'cascade' }),
		postsCount: integer('postsCount').notNull(),
		blogPostsCount: integer('blogPostsCount').notNull(),
		discussionForumsCount: integer('discussionForumsCount').notNull(),
		discussionForumPostsCount: integer('discussionForumPostsCount').notNull()
	},
	(table) => {
		return {
			tagNameKey: uniqueIndex('TagStats_tagName_key').on(table.tagName)
		};
	}
);

export const education = pgTable('Education', {
	name: text('name').primaryKey().notNull(),
	count: integer('count').notNull()
});

export const blogPost = pgTable(
	'BlogPost',
	{
		id: text('id').primaryKey().notNull(),
		creativeWorkId: text('creativeWorkId')
			.notNull()
			.references(() => creativeWork.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		discussionForumId: text('discussionForumId')
			.notNull()
			.references(() => discussionForum.creativeWorkId, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		slug: text('slug').notNull(),
		title: text('title').notNull(),
		thumbnailUrl: text('thumbnailUrl').notNull(),
		description: text('description').notNull(),
		content: text('content').notNull(),
		languageTagId: text('languageTagId')
			.notNull()
			.references(() => languageTag.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' })
	},
	(table) => {
		return {
			creativeWorkIdKey: uniqueIndex('BlogPost_creativeWorkId_key').on(
				table.creativeWorkId
			),
			discussionForumIdKey: uniqueIndex('BlogPost_discussionForumId_key').on(
				table.discussionForumId
			),
			slugKey: uniqueIndex('BlogPost_slug_key').on(table.slug)
		};
	}
);

export const user = pgTable(
	'User',
	{
		id: text('id').primaryKey().notNull(),
		email: text('email'),
		emailVerified: timestamp('emailVerified', { precision: 3, mode: 'date' }),
		image: text('image'),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		name: text('name').notNull(),
		role: role('role')
	},
	(table) => {
		return {
			createdAtIdx: index('User_createdAt_idx').on(table.createdAt),
			emailKey: uniqueIndex('User_email_key').on(table.email),
			nameKey: uniqueIndex('User_name_key').on(table.name)
		};
	}
);

export const prismaMigrations = pgTable('_prisma_migrations', {
	id: varchar('id', { length: 36 }).primaryKey().notNull(),
	checksum: varchar('checksum', { length: 64 }).notNull(),
	finishedAt: timestamp('finished_at', { withTimezone: true, mode: 'date' }),
	migrationName: varchar('migration_name', { length: 255 }).notNull(),
	logs: text('logs'),
	rolledBackAt: timestamp('rolled_back_at', {
		withTimezone: true,
		mode: 'date'
	}),
	startedAt: timestamp('started_at', { withTimezone: true, mode: 'date' })
		.defaultNow()
		.notNull(),
	appliedStepsCount: integer('applied_steps_count').notNull()
});

export const discussionForum = pgTable(
	'DiscussionForum',
	{
		id: text('id').primaryKey().notNull(),
		creativeWorkId: text('creativeWorkId')
			.notNull()
			.references(() => creativeWork.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		size: integer('size').notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' })
	},
	(table) => {
		return {
			creativeWorkIdKey: uniqueIndex('DiscussionForum_creativeWorkId_key').on(
				table.creativeWorkId
			)
		};
	}
);

export const creativeWorkToTag = pgTable(
	'_CreativeWorkToTag',
	{
		creativeWorkId: text('A')
			.notNull()
			.references(() => creativeWork.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		tagName: text('B')
			.notNull()
			.references(() => tag.name, { onDelete: 'cascade', onUpdate: 'cascade' })
	},
	(table) => {
		return {
			abUnique: uniqueIndex('_CreativeWorkToTag_AB_unique').on(
				table.creativeWorkId,
				table.tagName
			),
			bIdx: index().on(table.tagName)
		};
	}
);

export const gender = pgTable('Gender', {
	name: userGender('name').primaryKey().notNull(),
	count: integer('count').notNull()
});

export const languageTag = pgTable(
	'LanguageTag',
	{
		id: text('id').primaryKey().notNull(),
		code: text('code').notNull(),
		name: text('name').notNull(),
		countryCode: text('countryCode').notNull(),
		region: text('region').notNull(),
		description: text('description'),
		type: languageTagType('type').default('IETF_BCP_47_STANDARD').notNull()
	},
	(table) => {
		return {
			codeCountryCodeKey: uniqueIndex('LanguageTag_code_countryCode_key').on(
				table.code,
				table.countryCode
			)
		};
	}
);

export const userProfile = pgTable(
	'UserProfile',
	{
		id: text('id').primaryKey().notNull(),
		userId: text('userId')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		firstName: text('firstName').notNull(),
		lastName: text('lastName').notNull(),
		gender: userGender('gender')
			.default('M')
			.notNull()
			.references(() => gender.name, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		bio: text('bio'),
		work: text('work')
			.notNull()
			.references(() => work.name, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		education: text('education')
			.notNull()
			.references(() => education.name, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		profilePicture: text('profilePicture'),
		coverPhoto: text('coverPhoto'),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' })
	},
	(table) => {
		return {
			createdAtIdx: index('UserProfile_createdAt_idx').on(table.createdAt),
			userIdKey: uniqueIndex('UserProfile_userId_key').on(table.userId)
		};
	}
);

export const session = pgTable(
	'Session',
	{
		id: text('id').primaryKey().notNull(),
		sessionToken: text('sessionToken').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull(),
		expires: timestamp('expires', { precision: 3, mode: 'date' }).notNull(),
		userId: text('userId')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' })
	},
	(table) => {
		return {
			createdAtIdx: index('Session_createdAt_idx').on(table.createdAt),
			sessionTokenKey: uniqueIndex('Session_sessionToken_key').on(
				table.sessionToken
			)
		};
	}
);

export const post = pgTable(
	'Post',
	{
		id: text('id').primaryKey().notNull(),
		creativeWorkId: text('creativeWorkId')
			.notNull()
			.references(() => creativeWork.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		discussionForumId: text('discussionForumId')
			.notNull()
			.references(() => discussionForum.creativeWorkId, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		content: text('content').notNull(),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' })
	},
	(table) => {
		return {
			creativeWorkIdKey: uniqueIndex('Post_creativeWorkId_key').on(
				table.creativeWorkId
			),
			discussionForumIdKey: uniqueIndex('Post_discussionForumId_key').on(
				table.discussionForumId
			)
		};
	}
);

export const ratingForCreativeWork = pgTable('RatingForCreativeWork', {
	id: text('id').primaryKey().notNull(),
	totalRating: integer('totalRating').notNull(),
	ratingsCount: integer('ratingsCount').notNull(),
	creativeWorkId: text('creativeWorkId')
		.notNull()
		.references(() => creativeWork.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade'
		}),
	updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' })
});

export const discussionForumPost = pgTable(
	'DiscussionForumPost',
	{
		id: text('id').primaryKey().notNull(),
		content: text('content').notNull(),
		repliesCount: integer('replies_count').notNull(),
		replyToId: text('replyToId'),
		creativeWorkId: text('creativeWorkId')
			.notNull()
			.references(() => creativeWork.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		discussionForumId: text('discussionForumId')
			.notNull()
			.references(() => discussionForum.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' })
	},
	(table) => {
		return {
			creativeWorkIdKey: uniqueIndex(
				'DiscussionForumPost_creativeWorkId_key'
			).on(table.creativeWorkId),
			replyToIdKey: uniqueIndex('DiscussionForumPost_replyToId_key').on(
				table.replyToId
			),
			discussionForumPostReplyToIdFkey: foreignKey({
				columns: [table.replyToId],
				foreignColumns: [table.id]
			})
		};
	}
);

export const work = pgTable('Work', {
	name: text('name').primaryKey().notNull(),
	count: integer('count').notNull()
});

export const _account = pgTable(
	'Account',
	{
		id: text('id').primaryKey().notNull(),
		userId: text('userId')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		type: text('type').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refreshToken: text('refresh_token'),
		accessToken: text('access_token'),
		expiresAt: integer('expires_at'),
		tokenType: text('token_type'),
		scope: text('scope'),
		idToken: text('id_token'),
		sessionState: text('session_state'),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
			.defaultNow()
			.notNull()
	},
	(table) => {
		return {
			createdAtIdx: index('Account_createdAt_idx').on(table.createdAt),
			providerProviderAccountIdKey: uniqueIndex(
				'Account_provider_providerAccountId_key'
			).on(table.provider, table.providerAccountId)
		};
	}
);

export const userStats = pgTable(
	'UserStats',
	{
		id: text('id').primaryKey().notNull(),
		userId: text('userId')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		postsCount: integer('postsCount').notNull(),
		blogPostsCount: integer('blogPostsCount').notNull(),
		discussionForumsCount: integer('discussionForumsCount').notNull(),
		discussionForumPostsCount: integer('discussionForumPostsCount').notNull()
	},
	(table) => {
		return {
			userIdKey: uniqueIndex('UserStats_userId_key').on(table.userId)
		};
	}
);

export const userRatingForCreativeWork = pgTable('UserRatingForCreativeWork', {
	id: text('id').primaryKey().notNull(),
	creativeWorkRatingId: text('creativeWorkRatingId')
		.notNull()
		.references(() => ratingForCreativeWork.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade'
		}),
	userId: text('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' })
});

/* */

export const userRelations = relations(user, ({ many, one }) => ({
	creativeWorks: many(creativeWork),
	account: many(_account),
	session: many(session),
	profile: one(userProfile, {
		fields: [user.id],
		references: [userProfile.userId]
	})
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));
export const accountRelations = relations(_account, ({ one }) => ({
	user: one(user, {
		fields: [_account.userId],
		references: [user.id]
	})
}));
export const userProfileRelations = relations(userProfile, ({ one }) => ({
	user: one(user, {
		fields: [userProfile.userId],
		references: [user.id]
	})
}));

export const creativeWorkRelations = relations(
	creativeWork,
	({ many, one }) => ({
		author: one(user, {
			fields: [creativeWork.authorId],
			references: [user.id]
		}),
		tagsToBlogPosts: many(creativeWorkToTag),
		blogPost: one(blogPost, {
			fields: [creativeWork.id],
			references: [blogPost.creativeWorkId]
		})
	})
);

export const blogPostRelations = relations(blogPost, ({ one }) => ({
	creativeWork: one(creativeWork, {
		fields: [blogPost.creativeWorkId],
		references: [creativeWork.id]
	}),
	languageTag: one(languageTag, {
		fields: [blogPost.languageTagId],
		references: [languageTag.id]
	})
}));

export const languageTagRelations = relations(languageTag, ({ many }) => ({
	creativeWorks: many(creativeWork)
}));

export const tagRelations = relations(tag, ({ many }) => ({
	tagsToBlogPosts: many(creativeWorkToTag)
}));

export const creativeWorkToTagRelations = relations(
	creativeWorkToTag,
	({ one }) => ({
		// creativeWorks: many(creativeWork)
		creativeWork: one(creativeWork, {
			fields: [creativeWorkToTag.creativeWorkId],
			references: [creativeWork.id]
		}),
		tag: one(tag, {
			fields: [creativeWorkToTag.tagName],
			references: [tag.name]
		})
	})
);

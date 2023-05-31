import { relations } from 'drizzle-orm';
import {
	user,
	creativeWork,
	account,
	session,
	userProfile,
	creativeWorkToTag,
	blogPost,
	post,
	discussionForum,
	discussionForumPost,
	languageTag,
	tag
} from './tables';

export const userRelations = relations(user, ({ many, one }) => ({
	creativeWorks: many(creativeWork),
	account: many(account),
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
export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
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
		}),
		post: one(post, {
			fields: [creativeWork.id],
			references: [post.creativeWorkId]
		}),
		discussionForum: one(discussionForum, {
			fields: [creativeWork.id],
			references: [discussionForum.creativeWorkId]
		}),
		discussionForumPost: one(discussionForumPost, {
			fields: [creativeWork.id],
			references: [discussionForumPost.creativeWorkId]
		})
	})
);

export const postRelations = relations(post, ({ one }) => ({
	creativeWork: one(creativeWork, {
		fields: [post.creativeWorkId],
		references: [creativeWork.id]
	})
}));
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
export const discussionForumRelations = relations(
	discussionForum,
	({ one }) => ({
		creativeWork: one(creativeWork, {
			fields: [discussionForum.creativeWorkId],
			references: [creativeWork.id]
		})
	})
);
export const discussionForumPostRelations = relations(
	discussionForumPost,
	({ one }) => ({
		creativeWork: one(creativeWork, {
			fields: [discussionForumPost.creativeWorkId],
			references: [creativeWork.id]
		})
	})
);

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

'use client'

// ADAPTED FROM: https://gist.githubusercontent.com/emilyliu7321/19ac4e111588bdc0cb4e411c88d9c79a/raw/f1b5a39bedf4cbedf81db7aa54159584e0ba528a/bluesky-comments.tsx

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useEffect } from 'react';
import {
  AppBskyFeedDefs,
  AppBskyFeedPost,
  type AppBskyFeedGetPostThread,
} from "@atproto/api";

interface Props {
  url: string;
}

type Reply = {
  post: {
    uri: string;
    likeCount?: number;
    repostCount?: number;
    replyCount?: number,
  };
};

type Thread = AppBskyFeedDefs.ThreadViewPost;


// Function to fetch the thread data
interface FetchThreadDataProps {
  uri: string;
  setThread: React.Dispatch<React.SetStateAction<Thread | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const resolveDid = async (handle: string): Promise<string> => {
  const res = await fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    cache: "no-store",
    body: JSON.stringify({ handle })
  });

  if (!res.ok) {
    throw new Error('Failed to resolve handle to DID');
  }

  const data = await res.json();
  return data.did;
};

const convertToAtUri = (url: string): string => {
  let formattedUri = url;
  if (!url.startsWith('at://')) {
    // If it's a bsky.app URL, convert it
    if (url.includes('bsky.app/profile/')) {
      const match = url.match(/profile\/([\w.]+)\/post\/([\w]+)/);
      if (match) {
        const [, did, postId] = match;
        formattedUri = `at://${did}/app.bsky.feed.post/${postId}`;
      }
    } 
  }
  return formattedUri;
};

export const CommentSection = ({ url }: Props) => {
  const uri = convertToAtUri(url);
  console.log(uri)

  const [, , did, _, rkey] = uri.split("/");
  const postUrl = `https://bsky.app/profile/${did}/post/${rkey}`;

  const [thread, setThread] = useState<Thread | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetchThreadData({uri, setThread, setError});
  }, [uri]);

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  if (!thread) {
    return <p className="text-center">Loading comments...</p>;
  }

  if (!thread.replies || thread.replies.length === 0) {
    return(
      <>
      <hr className="my-2 bg-black h-[2px]"/>
      <h2 className="mt-6 text-xl font-bold">Comments</h2>
      <p className="mt-2 text-sm">
        There are no comments yet. You can leave a reply on Bluesky{" "}
        <Link
          href={postUrl}
          className="underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          here
        </Link>.
      </p>
      </>
    );
  }

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };
  console.log("thread: ", thread.post);

  const sortedReplies = thread.replies.sort(sortByLikes);

  if (!uri) return <div />;

  return (
    <div>
      <hr className="my-2 bg-black h-[2px]"/>
      {/* <Link href={postUrl} target="_blank">
        <p className="flex items-center hover:underline gap-2 text-lg">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="pink" viewBox="0 0 24 24" stroke-width="1.5" stroke="pink" className="size-5" color="pink">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>

            <span className="ml-1">{thread.post.likeCount ?? 0} likes</span>
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>
            <span className="ml-1">{thread.post.repostCount ?? 0} reposts</span>
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#7FBADC" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7FBADC" className="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
      </svg>
            <span className="ml-1">{thread.post.replyCount ?? 0} replies</span>
          </span>



        </p>
      </Link> */}
      <h2 className="mt-6 text-xl font-bold">Comments</h2>
      <p className="mt-2 text-sm">
        You can leave a reply on Bluesky{" "}
        <Link
          href={postUrl}
          className="underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          here
        </Link>.
      </p>
      <hr className="mt-2" />
      <div className="mt-2 space-y-8">
        {sortedReplies.slice(0, visibleCount).map((reply) => {
          if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null;
          return <Comment key={reply.post.uri} comment={reply} />;
        })}
        {visibleCount < sortedReplies.length && (
          <button onClick={showMore} className="mt-2 text-sm text-blue-500 underline font-serif">
            Show more comments
          </button>
        )}
      </div>
    </div>
  );
};


const Comment = ({ comment }: { comment: AppBskyFeedDefs.ThreadViewPost }) => {
  const author = comment.post.author;
  const avatarClassName = "h-4 w-4 shrink-0 rounded-full bg-gray-300";

  if (!AppBskyFeedPost.isRecord(comment.post.record)) return null;

  return (
    <div className="my-4 text-sm">
      <div className="flex max-w-xl flex-col gap-2">
        <Link
          className="flex flex-row items-center gap-2 hover:underline"
          href={`https://bsky.app/profile/${author.did}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {author.avatar ? (
            <img
              src={comment.post.author.avatar}
              alt="avatar"
              className={avatarClassName}
            />
          ) : (
            <div className={avatarClassName} />
          )}
          <p className="line-clamp-1">
            {author.displayName ?? author.handle}{" "}
            <span className="text-gray-500">@{author.handle}</span>
          </p>
        </Link>
        <Link
          href={`https://bsky.app/profile/${author.did}/post/${comment.post.uri.split("/").pop()}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <p className="text-sm">{comment.post.record.text}</p>
          <Actions post={comment.post} />
        </Link>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="border-l-2 border-neutral-600 pl-2">
          {comment.replies.sort(sortByLikes).map((reply) => {
            if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null;
            return <Comment key={reply.post.uri} comment={reply} />;
          })}
        </div>
      )}
    </div>
  );
};
const Actions = ({ post }: { post: AppBskyFeedDefs.PostView }) => (
  <div className="mt-2 flex w-full max-w-[150px] flex-row items-center justify-between opacity-60">
    <div className="flex flex-row items-center gap-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4" width="16" height="16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
      </svg>

      <p className="text-xs">{post.replyCount ?? 0}</p>
    </div>
    <div className="flex flex-row items-center gap-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4" width="16" height="16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>
      <p className="text-xs">{post.repostCount ?? 0}</p>
    </div>
    <div className="flex flex-row items-center gap-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4" width="16" height="16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
      <p className="text-xs">{post.likeCount ?? 0}</p>
    </div>
  </div>
);

const getPostThread = async (uri: string) => {
  const params = new URLSearchParams({ uri });
  const apiUrl = "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?" + params.toString();
  
  console.log('Fetching thread from:', apiUrl);
  
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Response Error:', {
        status: res.status,
        statusText: res.statusText,
        body: errorText
      });
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as AppBskyFeedGetPostThread.OutputSchema;
    console.log('Thread data received:', data);

    if (!AppBskyFeedDefs.isThreadViewPost(data.thread)) {
      console.error('Invalid thread data:', data);
      throw new Error("Could not find thread");
    }

    return data.thread;
  } catch (error) {
    console.error('Error in getPostThread:', error);
    throw error;
  }
};

const fetchThreadData = async ({ uri, setThread, setError }: FetchThreadDataProps) => {
  try {
    console.log('Starting thread fetch for URI:', uri);
    const thread = await getPostThread(uri);
    setThread(thread);
  } catch (err) {
    console.error('Error in fetchThreadData:', err);
    setError(err instanceof Error ? err.message : 'Error loading comments');
  }
};

const sortByLikes = (a: unknown, b: unknown) => {
  if (
    !AppBskyFeedDefs.isThreadViewPost(a) ||
    !AppBskyFeedDefs.isThreadViewPost(b)
  ) {
    return 0;
  }
  return (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0);
};
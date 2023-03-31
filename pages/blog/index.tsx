import Link from "next/link"
import SiteBase from "@/components/SiteBase"

const Blog = () => {
    return (
        <SiteBase title="Blog">
            <p className="">Coming soon</p>
            {/* <Link href="/blog/hello">Test</Link> */}
            {/* {allBlogs
                .sort((a, b) => {
                if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                    return -1;
                }
                return 1;
                })
                .map((post) => (
                <Link
                    key={post.slug}
                    className="flex flex-col space-y-1 mb-4"
                    href={`/blog/${post.slug}`}
                >
                    <div className="w-full flex flex-col">
                    <p>{post.title}</p>
                    </div>
                </Link>
                ))} */}
        </SiteBase>
    )
}

export default Blog
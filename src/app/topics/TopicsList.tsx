import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/paths";

const TopicsList = async () => {
  const topics = await db.topic.findMany();
  const renderedTopics = topics.map((topic) => {
    return (
      <li key={topic.id} className="mt-2">
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color="warning" variant="shadow">
            {topic.slug}
          </Chip>
        </Link>
      </li>
    );
  });
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <ul>{renderedTopics}</ul>
    </div>
  );
};

export default TopicsList;
